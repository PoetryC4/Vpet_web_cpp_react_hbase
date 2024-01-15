//
// Created by clpo on 1/14/24.
//

#include "MedicineController.h"
#include "../model/basic/MyPageRequest.h"

static std::string PORT_PREFIX = "/api";

void MedicineController::getById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        using namespace Pistache::Http;

        const auto &query = req.query();
        if (query.has("medicineId")) {
            std::string medicineId = query.get("medicineId").value_or("");
            Medicine medicine = MedicineService::getById(medicineId);

            response.headers()
                    .add<Header::Server>("pistache/0.1")
                    .add<Header::ContentType>(MIME(Text, Plain));

            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, medicine.toJson().dump());
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, "缺少MedicineId");
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

void MedicineController::getAll(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Get) {

        std::vector<Medicine> medicines = MedicineService::scan();
        nlohmann::json jsonArray;
        for (const auto &medicine: medicines) {
            jsonArray.push_back({
                                        {"medicineId",      medicine.getMedicineId()},
                                        {"medicinePrice",   medicine.getMedicinePrice()},
                                        {"medicinePicPath", medicine.getMedicinePicPath()},
                                        {"medicineName",    medicine.getMedicineName()},
                                        {"medicineMood",    medicine.getMedicineMood()},
                                        {"medicineEndu",    medicine.getMedicineEndu()},
                                        {"medicineExp",     medicine.getMedicineExp()},
                                        {"medicineHealth",  medicine.getMedicineHealth()}
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

void MedicineController::add(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        MedicineAddRequest medicineAddRequest = MedicineAddRequest::toObject(body);

        long resId = MedicineService::save(medicineAddRequest);

        if (resId != -1) {
            response.headers()
                    .add<Pistache::Http::Header::AccessControlAllowOrigin>("*")
                    .add<Pistache::Http::Header::AccessControlAllowMethods>("GET, POST, OPTIONS, DELETE, PUT")
                    .add<Pistache::Http::Header::AccessControlAllowHeaders>("Content-Type");
            response.headers().add<Pistache::Http::Header::ContentType>(MIME(Text, Plain));
            response.send(Pistache::Http::Code::Ok, std::to_string(resId));
        } else {
            response.send(Pistache::Http::Code::Internal_Server_Error, medicineAddRequest.getMedicineName());
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

void MedicineController::updateById(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        MedicineUpdateRequest medicineUpdateRequest = MedicineUpdateRequest::toObject(body);

        // std::cout << medicineUpdateRequest << std::endl;
        bool update = MedicineService::updateById(medicineUpdateRequest);

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
                          std::to_string(medicineUpdateRequest.getMedicineId()));
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

void MedicineController::page(const Pistache::Http::Request &req, Pistache::Http::ResponseWriter &response) {
    if (req.method() == Pistache::Http::Method::Post) {
        const auto &body = req.body();

        MyPageRequest medicinePageRequest = MyPageRequest::toObject(body);

        MyPageResult<Medicine> medicines = MedicineService::page(medicinePageRequest.getPage(),
                                                     medicinePageRequest.getPageSize());
        nlohmann::json jsonObject;
        nlohmann::json jsonArray;
        for (const auto &medicine: medicines.getRecords()) {
            jsonArray.push_back({
                                        {"medicineId",      medicine.getMedicineId()},
                                        {"medicinePrice",   medicine.getMedicinePrice()},
                                        {"medicinePicPath", medicine.getMedicinePicPath()},
                                        {"medicineName",    medicine.getMedicineName()},
                                        {"medicineMood",    medicine.getMedicineMood()},
                                        {"medicineEndu",    medicine.getMedicineEndu()},
                                        {"medicineExp",     medicine.getMedicineExp()},
                                        {"medicineHealth",  medicine.getMedicineHealth()}
                                });
        }
        jsonObject["count"] = medicines.getCount();
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

MedicineController::MedicineController() {
    medicineRequestHandlers[PORT_PREFIX + "/medicine/getById"] = &MedicineController::getById;
    medicineRequestHandlers[PORT_PREFIX + "/medicine/add"] = &MedicineController::add;
    medicineRequestHandlers[PORT_PREFIX + "/medicine/updateById"] = &MedicineController::updateById;
    medicineRequestHandlers[PORT_PREFIX + "/medicine/getAll"] = &MedicineController::getAll;
    medicineRequestHandlers[PORT_PREFIX + "/medicine/page"] = &MedicineController::page;
}