//
// Created by clpo on 1/14/24.
//

#include "MedicineUpdateRequest.h"
#include <string>
#include <iostream>
#include "../../../utils/FloatUtils.h"

int MedicineUpdateRequest::getMedicineId() const {
    return medicineId;
}

void MedicineUpdateRequest::setMedicineId(int medicineId) {
    MedicineUpdateRequest::medicineId = medicineId;
}

float MedicineUpdateRequest::getMedicinePrice() const {
    return medicinePrice;
}

void MedicineUpdateRequest::setMedicinePrice(float medicinePrice) {
    MedicineUpdateRequest::medicinePrice = medicinePrice;
}

const std::string &MedicineUpdateRequest::getMedicinePicPath() const {
    return medicinePicPath;
}

void MedicineUpdateRequest::setMedicinePicPath(const std::string &medicinePicPath) {
    MedicineUpdateRequest::medicinePicPath = medicinePicPath;
}

const std::string &MedicineUpdateRequest::getMedicineName() const {
    return medicineName;
}

void MedicineUpdateRequest::setMedicineName(const std::string &medicineName) {
    MedicineUpdateRequest::medicineName = medicineName;
}

float MedicineUpdateRequest::getMedicineMood() const {
    return medicineMood;
}

void MedicineUpdateRequest::setMedicineMood(float medicineMood) {
    MedicineUpdateRequest::medicineMood = medicineMood;
}

float MedicineUpdateRequest::getMedicineEndu() const {
    return medicineEndu;
}

void MedicineUpdateRequest::setMedicineEndu(float medicineEndu) {
    MedicineUpdateRequest::medicineEndu = medicineEndu;
}

float MedicineUpdateRequest::getMedicineExp() const {
    return medicineExp;
}

void MedicineUpdateRequest::setMedicineExp(float medicineExp) {
    MedicineUpdateRequest::medicineExp = medicineExp;
}

float MedicineUpdateRequest::getMedicineHealth() const {
    return medicineHealth;
}

void MedicineUpdateRequest::setMedicineHealth(float medicineHealth) {
    MedicineUpdateRequest::medicineHealth = medicineHealth;
}

void MedicineUpdateRequest::setProperty(const std::string &propertyName, const std::string &value) {
    // Check the type of the property and call the appropriate setter function
    if (propertyFloatSetters.find(propertyName) != propertyFloatSetters.end()) {
        propertyFloatSetters[propertyName](*this, FloatUtils::setPrecision(std::stof(value), 2));
    } else if (propertyStringSetters.find(propertyName) != propertyStringSetters.end()) {
        propertyStringSetters[propertyName](*this, value);
    } else if (propertyIntegerSetters.find(propertyName) != propertyIntegerSetters.end()) {
        propertyIntegerSetters[propertyName](*this, std::stoi(value));
    } else {
        std::cerr << "Property not found: " << propertyName << std::endl;
    }
}

MedicineUpdateRequest::MedicineUpdateRequest() {
    MedicineUpdateRequest::medicineId = -1;
    MedicineUpdateRequest::medicineEndu = 0;
    MedicineUpdateRequest::medicineExp = 0;
    MedicineUpdateRequest::medicineHealth = 0;
    MedicineUpdateRequest::medicineName = "";
    MedicineUpdateRequest::medicinePrice = 0;
    MedicineUpdateRequest::medicinePicPath = "";
    MedicineUpdateRequest::medicineMood = 0;
    propertyIntegerSetters["medicineId"] = &MedicineUpdateRequest::setMedicineId;
    propertyFloatSetters["medicinePrice"] = &MedicineUpdateRequest::setMedicinePrice;
    propertyStringSetters["medicinePicPath"] = &MedicineUpdateRequest::setMedicinePicPath;
    propertyStringSetters["medicineName"] = &MedicineUpdateRequest::setMedicineName;
    propertyFloatSetters["medicineMood"] = &MedicineUpdateRequest::setMedicineMood;
    propertyFloatSetters["medicineEndu"] = &MedicineUpdateRequest::setMedicineEndu;
    propertyFloatSetters["medicineExp"] = &MedicineUpdateRequest::setMedicineExp;
    propertyFloatSetters["medicineHealth"] = &MedicineUpdateRequest::setMedicineHealth;
}

std::ostream &operator<<(std::ostream &os, const MedicineUpdateRequest &medicine) {
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

MedicineUpdateRequest &MedicineUpdateRequest::operator=(const MedicineUpdateRequest &other) {
    // 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话）

        // 3. 复制参数对象的值
        medicineId = other.medicineId;
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
