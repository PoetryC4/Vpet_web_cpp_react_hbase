//
// Created by clpo on 1/14/24.
//

#include "DrinkController.h"
#include "../model/basic/MyPageRequest.h"

static std::string PORT_PREFIX = "/api";

void DrinkController::getById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        using namespace Pistache::Http;

        const auto &query = req.query();
        if (query.has("drinkId")) {
            std::string drinkId = query.get("drinkId").value_or("");
            Drink drink = DrinkService::getById(drinkId);

            response.headers()
                    .add<Header::Server>("pistache/0.1")
                    .add<Header::ContentType>(MIME(Text, Plain));

            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, drink.toJson().dump());
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, "缺少DrinkId");
        }
    } else if (req.method() == Pistache::Http::Method::Options) {
        response.headers()
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok);
    } else {
        response.send(Pistache::Http::Code::Method_Not_Allowed);
    }
}

void DrinkController::getAll(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        std::vector<Drink> drinks = DrinkService::scan();
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
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok, jsonArray.dump());
    } else if (req.method() == Pistache::Http::Method::Options) {
        response.headers()
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok);
    } else {
        response.send(Pistache::Http::Code::Method_Not_Allowed);
    }
}

void DrinkController::add(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        DrinkAddRequest drinkAddRequest = DrinkAddRequest::toObject(body);

        long resId = DrinkService::save(drinkAddRequest);

        if (resId != -1) {
            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, std::to_string(resId));
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, drinkAddRequest.getDrinkName());
        }
    } else if (req.method() == Pistache::Http::Method::Options) {
        response.headers()
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok);
    } else {
        response.send(Pistache::Http::Code::Method_Not_Allowed);
    }
}

void DrinkController::updateById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        DrinkUpdateRequest drinkUpdateRequest = DrinkUpdateRequest::toObject(body);

        // std::cout << drinkUpdateRequest << std::endl;
        bool update = DrinkService::updateById(drinkUpdateRequest);

        if (update) {
            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, "修改成功");
        } else {
            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Internal_Server_Error,
                          std::to_string(drinkUpdateRequest.getDrinkId()));
        }
    } else if (req.method() == Pistache::Http::Method::Options) {
        response.headers()
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok);
    } else {
        response.send(Pistache::Http::Code::Method_Not_Allowed);
    }
}

void DrinkController::page(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        MyPageRequest drinkPageRequest = MyPageRequest::toObject(body);

        MyPageResult<Drink> drinks = DrinkService::page(drinkPageRequest.getPage(),
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
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok, jsonObject.dump());
    } else if (req.method() == Pistache::Http::Method::Options) {
        response.headers()
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok);
    } else {
        response.send(Pistache::Http::Code::Method_Not_Allowed);
    }
}

DrinkController::DrinkController() {
    drinkRequestHandlers[PORT_PREFIX + "/drink/getById"] = &DrinkController::getById;
    drinkRequestHandlers[PORT_PREFIX + "/drink/add"] = &DrinkController::add;
    drinkRequestHandlers[PORT_PREFIX + "/drink/updateById"] = &DrinkController::updateById;
    drinkRequestHandlers[PORT_PREFIX + "/drink/getAll"] = &DrinkController::getAll;
    drinkRequestHandlers[PORT_PREFIX + "/drink/page"] = &DrinkController::page;
}
