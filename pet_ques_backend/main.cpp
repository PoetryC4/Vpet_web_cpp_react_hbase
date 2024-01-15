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
#include "model/basic/MyPageRequest.h"
#include "model/basic/MyPageResult.h"
#include "controller/DrinkController.h"
#include "controller/FoodController.h"
#include "controller/MedicineController.h"
#include "controller/PresentController.h"

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
        DrinkController drinkController;
        FoodController foodController;
        MedicineController medicineController;
        PresentController presentController;

        std::cout << "拦截到请求:" << req.resource() << std::endl;

        if (drinkController.drinkRequestHandlers.find(req.resource())!=drinkController.drinkRequestHandlers.end()) {
            drinkController.drinkRequestHandlers[req.resource()](drinkController, req, response);
        } else if(foodController.foodRequestHandlers.find(req.resource())!=foodController.foodRequestHandlers.end()) {
            foodController.foodRequestHandlers[req.resource()](foodController, req, response);
        } else if(medicineController.medicineRequestHandlers.find(req.resource())!=medicineController.medicineRequestHandlers.end()) {
            medicineController.medicineRequestHandlers[req.resource()](medicineController, req, response);
        } else if(presentController.presentRequestHandlers.find(req.resource())!=presentController.presentRequestHandlers.end()) {
            presentController.presentRequestHandlers[req.resource()](presentController, req, response);
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