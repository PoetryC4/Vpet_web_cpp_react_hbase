//
// Created by clpo on 1/14/24.
//


#include "FoodController.h"
#include "../model/basic/MyPageRequest.h"

static std::string PORT_PREFIX = "/api";

void FoodController::getById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        using namespace Pistache::Http;

        const auto &query = req.query();
        if (query.has("foodId")) {
            std::string foodId = query.get("foodId").value_or("");
            Food food = FoodService::getById(foodId);

            response.headers()
                    .add<Header::Server>("pistache/0.1")
                    .add<Header::ContentType>(MIME(Text, Plain));

            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, food.toJson().dump());
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, "缺少FoodId");
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

void FoodController::getAll(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        std::vector<Food> foods = FoodService::scan();
        nlohmann::json jsonArray;
        for (const auto &food: foods) {
            jsonArray.push_back({
                                        {"foodId",      food.getFoodId()},
                                        {"foodPrice",   food.getFoodPrice()},
                                        {"foodPicPath", food.getFoodPicPath()},
                                        {"foodName",    food.getFoodName()},
                                        {"foodHunger",  food.getFoodHunger()},
                                        {"foodMood",    food.getFoodMood()},
                                        {"foodThirsty", food.getFoodThirsty()},
                                        {"foodEndu",    food.getFoodEndu()},
                                        {"foodExp",     food.getFoodExp()},
                                        {"foodHealth",  food.getFoodHealth()}
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

void FoodController::add(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        FoodAddRequest foodAddRequest = FoodAddRequest::toObject(body);

        long resId = FoodService::save(foodAddRequest);

        if (resId != -1) {
            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, std::to_string(resId));
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, foodAddRequest.getFoodName());
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

void FoodController::updateById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        FoodUpdateRequest foodUpdateRequest = FoodUpdateRequest::toObject(body);

        // std::cout << foodUpdateRequest << std::endl;
        bool update = FoodService::updateById(foodUpdateRequest);

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
                          std::to_string(foodUpdateRequest.getFoodId()));
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

void FoodController::page(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        MyPageRequest foodPageRequest = MyPageRequest::toObject(body);

        MyPageResult<Food> foods = FoodService::page(foodPageRequest.getPage(),
                                                        foodPageRequest.getPageSize());
        nlohmann::json jsonObject;
        nlohmann::json jsonArray;
        for (const auto &food: foods.getRecords()) {
            jsonArray.push_back({
                                        {"foodId",      food.getFoodId()},
                                        {"foodPrice",   food.getFoodPrice()},
                                        {"foodPicPath", food.getFoodPicPath()},
                                        {"foodName",    food.getFoodName()},
                                        {"foodHunger",  food.getFoodHunger()},
                                        {"foodMood",    food.getFoodMood()},
                                        {"foodThirsty", food.getFoodThirsty()},
                                        {"foodEndu",    food.getFoodEndu()},
                                        {"foodExp",     food.getFoodExp()},
                                        {"foodHealth",  food.getFoodHealth()}
                                });
        }
        jsonObject["count"] = foods.getCount();
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

FoodController::FoodController() {
    foodRequestHandlers[PORT_PREFIX + "/food/getById"] = &FoodController::getById;
    foodRequestHandlers[PORT_PREFIX + "/food/add"] = &FoodController::add;
    foodRequestHandlers[PORT_PREFIX + "/food/updateById"] = &FoodController::updateById;
    foodRequestHandlers[PORT_PREFIX + "/food/getAll"] = &FoodController::getAll;
    foodRequestHandlers[PORT_PREFIX + "/food/page"] = &FoodController::page;
}
