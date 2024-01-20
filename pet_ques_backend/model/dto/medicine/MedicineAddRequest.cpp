//
// Created by clpo on 1/14/24.
//


#include <string>
#include "MedicineAddRequest.h"
#include "../../../utils/FloatUtils.h"


float MedicineAddRequest::getMedicinePrice() const {
    return medicinePrice;
}

void MedicineAddRequest::setMedicinePrice(float medicinePrice) {
    MedicineAddRequest::medicinePrice = medicinePrice;
}

const std::string &MedicineAddRequest::getMedicinePicPath() const {
    return medicinePicPath;
}

void MedicineAddRequest::setMedicinePicPath(const std::string &medicinePicPath) {
    MedicineAddRequest::medicinePicPath = medicinePicPath;
}

const std::string &MedicineAddRequest::getMedicineName() const {
    return medicineName;
}

void MedicineAddRequest::setMedicineName(const std::string &medicineName) {
    MedicineAddRequest::medicineName = medicineName;
}

float MedicineAddRequest::getMedicineMood() const {
    return medicineMood;
}

void MedicineAddRequest::setMedicineMood(float medicineMood) {
    MedicineAddRequest::medicineMood = medicineMood;
}

float MedicineAddRequest::getMedicineEndu() const {
    return medicineEndu;
}

void MedicineAddRequest::setMedicineEndu(float medicineEndu) {
    MedicineAddRequest::medicineEndu = medicineEndu;
}

float MedicineAddRequest::getMedicineExp() const {
    return medicineExp;
}

void MedicineAddRequest::setMedicineExp(float medicineExp) {
    MedicineAddRequest::medicineExp = medicineExp;
}

float MedicineAddRequest::getMedicineHealth() const {
    return medicineHealth;
}

void MedicineAddRequest::setMedicineHealth(float medicineHealth) {
    MedicineAddRequest::medicineHealth = medicineHealth;
}

void MedicineAddRequest::setProperty(const std::string &propertyName, const std::string &value) {
    // Check the type of the property and call the appropriate setter function
    if (propertyFloatSetters.find(propertyName) != propertyFloatSetters.end()) {
        propertyFloatSetters[propertyName](*this, FloatUtils::setPrecision(std::stof(value), 2));
    } else if (propertyStringSetters.find(propertyName) != propertyStringSetters.end()) {
        propertyStringSetters[propertyName](*this, value);
    } else {
        std::cerr << "Property not found: " << propertyName << std::endl;
    }
}

MedicineAddRequest::MedicineAddRequest() {
    MedicineAddRequest::medicineEndu = 0;
    MedicineAddRequest::medicineExp = 0;
    MedicineAddRequest::medicineHealth = 0;
    MedicineAddRequest::medicineName = "";
    MedicineAddRequest::medicinePrice = 0;
    MedicineAddRequest::medicinePicPath = "";
    MedicineAddRequest::medicineMood = 0;
    propertyFloatSetters["medicinePrice"] = &MedicineAddRequest::setMedicinePrice;
    propertyStringSetters["medicinePicPath"] = &MedicineAddRequest::setMedicinePicPath;
    propertyStringSetters["medicineName"] = &MedicineAddRequest::setMedicineName;
    propertyFloatSetters["medicineMood"] = &MedicineAddRequest::setMedicineMood;
    propertyFloatSetters["medicineEndu"] = &MedicineAddRequest::setMedicineEndu;
    propertyFloatSetters["medicineExp"] = &MedicineAddRequest::setMedicineExp;
    propertyFloatSetters["medicineHealth"] = &MedicineAddRequest::setMedicineHealth;
}

std::ostream& operator<<(std::ostream& os, const MedicineAddRequest& medicine) {
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

MedicineAddRequest &MedicineAddRequest::operator=(const MedicineAddRequest &other) {
    // 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话）

        // 3. 复制参数对象的值
        medicinePrice = other.medicinePrice;
        medicinePicPath = other.medicinePicPath;
        medicineName = other.medicineName;
        medicineMood = other.medicineMood;
        medicineEndu = other.medicineEndu;
        medicineExp = other.medicineExp;
        medicineHealth = other.medicineHealth;
    }
    // 4. 返回一个对当前对象的引用，以支持连续赋值
    return *this;
}
