//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_MEDICINEUPDATEREQUEST_H
#define MAIN_MEDICINEUPDATEREQUEST_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class MedicineUpdateRequest {
private:
    int medicineId;
    float medicinePrice;
    std::string medicinePicPath;
    std::string medicineName;
    float medicineMood;
    float medicineEndu;
    float medicineExp;
    float medicineHealth;

public:

    MedicineUpdateRequest();

    friend std::ostream &operator<<(std::ostream &os, const MedicineUpdateRequest &medicine) {
        os << "MedicineUpdateRequest{" <<
           "medicinePrice=" << medicine.medicinePrice <<
           ", medicinePicPath='" << medicine.medicinePicPath << '\'' <<
           ", medicineName='" << medicine.medicineName << '\'' <<
           ", medicineMood=" << medicine.medicineMood <<
           ", medicineEndu=" << medicine.medicineEndu <<
           ", medicineExp=" << medicine.medicineExp <<
           ", medicineHealth=" << medicine.medicineHealth <<
           ", medicineId=" << medicine.medicineId <<
           '}';
        return os;
    }

    int getMedicineId() const;

    void setMedicineId(int medicineId);

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

    static MedicineUpdateRequest toObject(const std::string &body) {
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        MedicineUpdateRequest medicineUpdateRequest;
        medicineUpdateRequest.setMedicineId(jsonBody["medicineId"].get<int>());
        medicineUpdateRequest.setMedicinePrice(jsonBody["medicinePrice"].get<float>());
        medicineUpdateRequest.setMedicinePicPath(jsonBody["medicinePicPath"].get<std::string>());
        medicineUpdateRequest.setMedicineName(jsonBody["medicineName"].get<std::string>());
        medicineUpdateRequest.setMedicineMood(jsonBody["medicineMood"].get<float>());
        medicineUpdateRequest.setMedicineEndu(jsonBody["medicineEndu"].get<float>());
        medicineUpdateRequest.setMedicineExp(jsonBody["medicineExp"].get<float>());
        medicineUpdateRequest.setMedicineHealth(jsonBody["medicineHealth"].get<float>());
        return medicineUpdateRequest;
    }

private:
    using SetterFunctionString = std::function<void(MedicineUpdateRequest &, const std::string &)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(MedicineUpdateRequest &, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(MedicineUpdateRequest &, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};




#endif //MAIN_MEDICINEUPDATEREQUEST_H
