/*
 * SPDX-FileCopyrightText: 2016 Mathieu Stefani
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* http_server.cc
   Mathieu Stefani, 07 février 2016

   Example of an http server
*/

#include <pistache/common.h>
#include <pistache/cookie.h>
#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/http_headers.h>
#include <pistache/net.h>
#include <pistache/peer.h>
#include "include/nlohmann/json.hpp"
#include "model/dto/drink/DrinkAddRequest.h"
#include "model/dto/drink/DrinkPageRequest.h"
#include "model/basic/MyPageResult.h"
#include "controller/DrinkController.h"

using namespace Pistache;

static std::string PORT_PREFIX = "/api";

struct LoadMonitor {
    LoadMonitor(const std::shared_ptr<Http::Endpoint> &endpoint)
            : endpoint_(endpoint), interval(std::chrono::seconds(1)) {}

    void setInterval(std::chrono::seconds secs) {
        interval = secs;
    }

    void start() {
        shutdown_ = false;
        thread = std::make_unique<std::thread>([this] { run(); });
    }

    void shutdown() {
        shutdown_ = true;
    }

    ~LoadMonitor() {
        shutdown_ = true;
        if (thread)
            thread->join();
    }

private:
    std::shared_ptr<Http::Endpoint> endpoint_;
    std::unique_ptr<std::thread> thread;
    std::chrono::seconds interval;

    std::atomic<bool> shutdown_;

    void run() {
        Tcp::Listener::Load old;
        while (!shutdown_) {
            if (!endpoint_->isBound())
                continue;

            endpoint_->requestLoad(old).then([&](const Tcp::Listener::Load &load) {
                                                 old = load;

                                                 double global = load.global;
                                                 if (global > 100)
                                                     global = 100;

                                                 if (global > 1)
                                                     std::cout << "Global load is " << global << "%" << std::endl;
                                                 else
                                                     std::cout << "Global load is 0%" << std::endl;
                                             },
                                             Async::NoExcept);

            std::this_thread::sleep_for(std::chrono::seconds(interval));
        }
    }
};

class MyHandler : public Http::Handler {

HTTP_PROTOTYPE(MyHandler)

    void onRequest(
            const Http::Request &req,
            Http::ResponseWriter response) override {

        std::cout << "拦截到请求:" << req.resource() << std::endl;

        if (req.resource() == (PORT_PREFIX + "/drink/getById")) {
            if (req.method() == Http::Method::Get) {

                using namespace Http;

                const auto &query = req.query();
                if (query.has("drinkId")) {
                    std::string drinkId = query.get("drinkId").value_or("");
                    Drink drink = DrinkController::getById(drinkId);

                    response.headers()
                            .add<Header::Server>("pistache/0.1")
                            .add<Header::ContentType>(MIME(Text, Plain));

                    /* response.cookies()
                             .add(Cookie("lang", "en-US"));*/

                    /*auto stream = response.stream(Http::Code::Ok);
                    stream << "PO";
                    stream << "NG";
                    stream << ends;*/
                    response.headers()
                            .add<Http::Header::AccessControlAllowOrigin>("*")
                            .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                            .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                    response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                    response.send(Http::Code::Ok, drink.toJson().dump());
                } else {
                    response.send(Http::Code::Ok, "PONG");
                }
            } else if (req.method() == Http::Method::Options) {
                response.headers()
                        .add<Http::Header::AccessControlAllowOrigin>("*")
                        .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                        .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                response.send(Http::Code::Ok);
            } else {
                response.send(Http::Code::Method_Not_Allowed);
            }
        } else if (req.resource() == (PORT_PREFIX + "/drink/add")) {
            if (req.method() == Http::Method::Post) {
                const auto &body = req.body();

                DrinkAddRequest drinkAddRequest = DrinkAddRequest::toObject(body);

                long resId = DrinkController::save(drinkAddRequest);

                if (resId != -1) {
                    response.headers()
                            .add<Http::Header::AccessControlAllowOrigin>("*")
                            .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                            .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                    response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                    response.send(Pistache::Http::Code::Ok, std::to_string(resId));
                } else {
                    response.send(Pistache::Http::Code::Internal_Server_Error, drinkAddRequest.getDrinkName());
                }
            } else if (req.method() == Http::Method::Options) {
                response.headers()
                        .add<Http::Header::AccessControlAllowOrigin>("*")
                        .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                        .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                response.send(Http::Code::Ok);
            } else {
                response.send(Http::Code::Method_Not_Allowed);
            }
        } else if (req.resource() == (PORT_PREFIX + "/drink/updateById")) {
            if (req.method() == Http::Method::Post) {
                const auto &body = req.body();

                std::cout << req.resource() << std::endl;
                std::cout << body << std::endl;
                DrinkUpdateRequest drinkUpdateRequest = DrinkUpdateRequest::toObject(body);

                // std::cout << drinkUpdateRequest << std::endl;
                bool update = DrinkController::updateById(drinkUpdateRequest);

                if (update) {
                    response.headers()
                            .add<Http::Header::AccessControlAllowOrigin>("*")
                            .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                            .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                    response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                    response.send(Pistache::Http::Code::Ok, "修改成功");
                } else {
                    response.headers()
                            .add<Http::Header::AccessControlAllowOrigin>("*")
                            .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                            .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                    response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                    response.send(Pistache::Http::Code::Internal_Server_Error,
                                  std::to_string(drinkUpdateRequest.getDrinkId()));
                }
            } else if (req.method() == Http::Method::Options) {
                response.headers()
                        .add<Http::Header::AccessControlAllowOrigin>("*")
                        .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                        .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                response.send(Http::Code::Ok);
            } else {
                response.send(Http::Code::Method_Not_Allowed);
            }
        } else if (req.resource() == (PORT_PREFIX + "/drink/getAll")) {
            if (req.method() == Http::Method::Get) {

                std::vector<Drink> drinks = DrinkController::scan();
                nlohmann::json jsonArray;
                for (const auto &drink: drinks) {
                    jsonArray.push_back({
                                                {"drinkId",      drink.getDrinkId()},
                                                {"drinkPrice",   drink.getDrinkPrice()},
                                                {"drinkPicPath", drink.getDrinkPicPath()},
                                                {"drinkName",    drink.getDrinkName()},
                                                {"drinkHunger",  drink.getDrinkHunger()},
                                                {"drinkMood",    drink.getDrinkMood()},
                                                {"drinkThirsty", drink.getDrinkThirsty()},
                                                {"drinkEndu",    drink.getDrinkEndu()},
                                                {"drinkExp",     drink.getDrinkExp()},
                                                {"drinkHealth",  drink.getDrinkHealth()}
                                        });
                }

                response.headers()
                        .add<Http::Header::AccessControlAllowOrigin>("*")
                        .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                        .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                response.send(Pistache::Http::Code::Ok, jsonArray.dump());
            } else if (req.method() == Http::Method::Options) {
                response.headers()
                        .add<Http::Header::AccessControlAllowOrigin>("*")
                        .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                        .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                response.send(Http::Code::Ok);
            } else {
                response.send(Http::Code::Method_Not_Allowed);
            }
        } else if (req.resource() == (PORT_PREFIX + "/drink/page")) {
            if (req.method() == Http::Method::Post) {
                const auto &body = req.body();

                DrinkPageRequest drinkPageRequest = DrinkPageRequest::toObject(body);

                MyPageResult<Drink> drinks = DrinkController::page(drinkPageRequest.getPage(),
                                                                   drinkPageRequest.getPageSize());
                nlohmann::json jsonObject;
                nlohmann::json jsonArray;
                for (const auto &drink: drinks.getRecords()) {
                    jsonArray.push_back({
                                                {"drinkId",      drink.getDrinkId()},
                                                {"drinkPrice",   drink.getDrinkPrice()},
                                                {"drinkPicPath", drink.getDrinkPicPath()},
                                                {"drinkName",    drink.getDrinkName()},
                                                {"drinkHunger",  drink.getDrinkHunger()},
                                                {"drinkMood",    drink.getDrinkMood()},
                                                {"drinkThirsty", drink.getDrinkThirsty()},
                                                {"drinkEndu",    drink.getDrinkEndu()},
                                                {"drinkExp",     drink.getDrinkExp()},
                                                {"drinkHealth",  drink.getDrinkHealth()}
                                        });
                }
                jsonObject["count"] = drinks.getCount();
                jsonObject["records"] = jsonArray;
                response.headers()
                        .add<Http::Header::AccessControlAllowOrigin>("*")
                        .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                        .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                response.send(Pistache::Http::Code::Ok, jsonObject.dump());
            } else if (req.method() == Http::Method::Options) {
                response.headers()
                        .add<Http::Header::AccessControlAllowOrigin>("*")
                        .add<Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                        .add<Http::Header::AccessControlAllowHeaders>("Content-Type");
                response.headers().add<Http::Header::ContentType>(MIME(Text, Plain));
                response.send(Http::Code::Ok);
            } else {
                response.send(Http::Code::Method_Not_Allowed);
            }
        } else if (req.resource() == "/exception") {
            throw std::runtime_error("Exception thrown in the handler");
        } else if (req.resource() == "/timeout") {
            response.timeoutAfter(std::chrono::seconds(2));
        } else {
            response.send(Http::Code::Not_Found);
        }
    }

    void onTimeout(
            const Http::Request & /*req*/,
            Http::ResponseWriter response) override {
        response
                .send(Http::Code::Request_Timeout, "Timeout")
                .then([=](ssize_t) {}, PrintException());
    }
};

int main(int argc, char *argv[]) {
    Port port(8878);

    int thr = 2;
/*
    if (argc >= 2) {
        port = static_cast<uint16_t>(std::stol(argv[1]));

        if (argc == 3)
            thr = std::stoi(argv[2]);
    }*/

    Address addr(Ipv4::any(), port);

    std::cout << "Cores = " << hardware_concurrency() << std::endl;
    std::cout << "Using " << thr << " threads" << std::endl;

    auto server = std::make_shared<Http::Endpoint>(addr);

    auto opts = Http::Endpoint::options()
            .threads(thr);
    server->init(opts);
    server->setHandler(Http::make_handler<MyHandler>());
    server->serve();

    // server->shutdown();
}