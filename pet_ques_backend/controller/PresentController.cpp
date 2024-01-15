//
// Created by clpo on 1/14/24.
//


#include "PresentController.h"
#include "../model/basic/MyPageRequest.h"

static std::string PORT_PREFIX = "/api";

void PresentController::getById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        using namespace Pistache::Http;

        const auto &query = req.query();
        if (query.has("presentId")) {
            std::string presentId = query.get("presentId").value_or("");
            Present present = PresentService::getById(presentId);

            response.headers()
                    .add<Header::Server>("pistache/0.1")
                    .add<Header::ContentType>(MIME(Text, Plain));

            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, present.toJson().dump());
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, "缺少PresentId");
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

void PresentController::getAll(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        std::vector<Present> presents = PresentService::scan();
        nlohmann::json jsonArray;
        for (const auto &present: presents) {
            jsonArray.push_back({
                                        {"presentId",      present.getPresentId()},
                                        {"presentPrice",   present.getPresentPrice()},
                                        {"presentPicPath", present.getPresentPicPath()},
                                        {"presentName",    present.getPresentName()},
                                        {"presentMood",    present.getPresentMood()},
                                        {"presentExp",     present.getPresentExp()},
                                        {"presentPerformance", present.getPresentPerformance()}
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

void PresentController::add(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        PresentAddRequest presentAddRequest = PresentAddRequest::toObject(body);

        long resId = PresentService::save(presentAddRequest);

        if (resId != -1) {
            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, std::to_string(resId));
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, presentAddRequest.getPresentName());
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

void PresentController::updateById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        PresentUpdateRequest presentUpdateRequest = PresentUpdateRequest::toObject(body);

        // std::cout << presentUpdateRequest << std::endl;
        bool update = PresentService::updateById(presentUpdateRequest);

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
                          std::to_string(presentUpdateRequest.getPresentId()));
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

void PresentController::page(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        MyPageRequest presentPageRequest = MyPageRequest::toObject(body);

        MyPageResult<Present> presents = PresentService::page(presentPageRequest.getPage(),
                                                                 presentPageRequest.getPageSize());
        nlohmann::json jsonObject;
        nlohmann::json jsonArray;
        for (const auto &present: presents.getRecords()) {
            jsonArray.push_back({
                                        {"presentId",      present.getPresentId()},
                                        {"presentPrice",   present.getPresentPrice()},
                                        {"presentPicPath", present.getPresentPicPath()},
                                        {"presentName",    present.getPresentName()},
                                        {"presentMood",    present.getPresentMood()},
                                        {"presentExp",     present.getPresentExp()},
                                        {"presentPerformance", present.getPresentPerformance()}
                                });
        }
        jsonObject["count"] = presents.getCount();
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

PresentController::PresentController() {
    presentRequestHandlers[PORT_PREFIX + "/present/getById"] = &PresentController::getById;
    presentRequestHandlers[PORT_PREFIX + "/present/add"] = &PresentController::add;
    presentRequestHandlers[PORT_PREFIX + "/present/updateById"] = &PresentController::updateById;
    presentRequestHandlers[PORT_PREFIX + "/present/getAll"] = &PresentController::getAll;
    presentRequestHandlers[PORT_PREFIX + "/present/page"] = &PresentController::page;
}