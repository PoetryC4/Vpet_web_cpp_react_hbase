//
// Created by clpo on 1/19/24.
//

#include "OtherInteractionController.h"
#include "../utils/FileUtils.h"
#include "../utils/StrUtils.h"
#include "nlohmann/json.hpp"

static std::string PORT_PREFIX = "/api";

const std::string pathPrefix = "/home/clpo/Documents/pet_ques_new/static_file";

OtherInteractionController::OtherInteractionController() {
    otherInteractionRequestHandlers[PORT_PREFIX + "/files/getAll"] = &OtherInteractionController::getFileNames;
    otherInteractionRequestHandlers[PORT_PREFIX + "/chat/chat"] = &OtherInteractionController::chatWithLlm;

}

void
OtherInteractionController::getFileNames(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        using namespace Pistache::Http;

        const auto &query = req.query();
        if (query.has("targetFolder")) {
            std::string targetFolder = query.get("targetFolder").value_or("");
            StrUtils::replaceAll(targetFolder, "ATslash%3B", "/");
            std::cout << targetFolder << std::endl;
            std::vector<std::string> fileNames = FileUtils::getFilesInDirectory(targetFolder);

            nlohmann::json jsonArray = fileNames;

            response.headers()
                    .add<Header::Server>("pistache/0.1")
                    .add<Header::ContentType>(MIME(Text, Plain));

            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, jsonArray.dump(4));
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, "缺少targetFolder");
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

void
OtherInteractionController::chatWithLlm(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        // TODO 对接LLM
        const auto &body = req.body();
        std::cout << body << std::endl;

        response.headers()
                .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
        response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
        response.send(Pistache::Http::Code::Ok, "测试结果");
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
