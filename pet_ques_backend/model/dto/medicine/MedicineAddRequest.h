//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_MEDICINEADDREQUEST_H
#define MAIN_MEDICINEADDREQUEST_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class MedicineAddRequest {
private:
    float medicinePrice;
    std::string medicinePicPath;
    std::string medicineName;
    float medicineMood;
    float medicineEndu;
    float medicineExp;
    float medicineHealth;

public:

    MedicineAddRequest();

    friend std::ostream& operator<<(std::ostream& os, const MedicineAddRequest& medicine) {
        os << "MedicineAddRequest{" <<
           "medicinePrice=" << medicine.medicinePrice <<
           ", medicinePicPath='" << medicine.medicinePicPath << '\'' <<
           ", medicineName='" << medicine.medicineName << '\'' <<
           ", medicineMood=" << medicine.medicineMood <<
           ", medicineEndu=" << medicine.medicineEndu <<
           ", medicineExp=" << medicine.medicineExp <<
           ", medicineHealth=" << medicine.medicineHealth <<
           '}';
        return os;
    }

    float getMedicinePrice() const;
    void setMedicinePrice(float medicinePrice);

    const std::string &getMedicinePicPath() const;
    void setMedicinePicPath(const std::string &medicinePicPath);

    const std::string &getMedicineName() const;
    void setMedicineName(const std::string &medicineName);

    float getMedicineMood() const;
    void setMedicineMood(float medicineMood);

    float getMedicineEndu() const;
    void setMedicineEndu(float medicineEndu);

    float getMedicineExp() const;
    void setMedicineExp(float medicineExp);

    float getMedicineHealth() const;
    void setMedicineHealth(float medicineHealth);

    // Method to set property based on string name
    void setProperty(const std::string &propertyName, const std::string &value);
    static MedicineAddRequest toObject(const std::string &body) {
        // 在这里实现反序列化逻辑，将请求体解析为PostAddRequest对象
        // 可以使用JSON库（如nlohmann/json）进行解析
        // 这里只是一个简单的示例，实际上你需要根据你的数据格式进行修改
        // 以下是使用nlohmann/json的示例代码
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        MedicineAddRequest medicineAddRequest;
        medicineAddRequest.setMedicinePrice(jsonBody["medicinePrice"].get<float>());
        medicineAddRequest.setMedicinePicPath(jsonBody["medicinePicPath"].get<std::string>());
        medicineAddRequest.setMedicineName(jsonBody["medicineName"].get<std::string>());
        medicineAddRequest.setMedicineMood(jsonBody["medicineMood"].get<float>());
        medicineAddRequest.setMedicineEndu(jsonBody["medicineEndu"].get<float>());
        medicineAddRequest.setMedicineExp(jsonBody["medicineExp"].get<float>());
        medicineAddRequest.setMedicineHealth(jsonBody["medicineHealth"].get<float>());
        return medicineAddRequest;
    }
private:
    using SetterFunctionString = std::function<void(MedicineAddRequest&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionFloat = std::function<void(MedicineAddRequest&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};



#endif //MAIN_MEDICINEADDREQUEST_H
