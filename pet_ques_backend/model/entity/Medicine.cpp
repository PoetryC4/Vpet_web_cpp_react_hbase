//
// Created by clpo on 1/14/24.
//


#include "Medicine.h"
#include <string>
#include "../include/nlohmann/json.hpp"
#include "../../utils/FloatUtils.h"

const int &Medicine::getMedicineId() const {
    return medicineId;
}

void Medicine::setMedicineId(const int &medicineId) {
    Medicine::medicineId = medicineId;
}

float Medicine::getMedicinePrice() const {
    return medicinePrice;
}

void Medicine::setMedicinePrice(float medicinePrice) {
    Medicine::medicinePrice = medicinePrice;
}

const std::string &Medicine::getMedicinePicPath() const {
    return medicinePicPath;
}

void Medicine::setMedicinePicPath(const std::string &medicinePicPath) {
    Medicine::medicinePicPath = medicinePicPath;
}

const std::string &Medicine::getMedicineName() const {
    return medicineName;
}

void Medicine::setMedicineName(const std::string &medicineName) {
    Medicine::medicineName = medicineName;
}

float Medicine::getMedicineMood() const {
    return medicineMood;
}

void Medicine::setMedicineMood(float medicineMood) {
    Medicine::medicineMood = medicineMood;
}

float Medicine::getMedicineEndu() const {
    return medicineEndu;
}

void Medicine::setMedicineEndu(float medicineEndu) {
    Medicine::medicineEndu = medicineEndu;
}

float Medicine::getMedicineExp() const {
    return medicineExp;
}

void Medicine::setMedicineExp(float medicineExp) {
    Medicine::medicineExp = medicineExp;
}

float Medicine::getMedicineHealth() const {
    return medicineHealth;
}

void Medicine::setMedicineHealth(float medicineHealth) {
    Medicine::medicineHealth = medicineHealth;
}

void Medicine::setProperty(const std::string &propertyName, const std::string &value) {
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

Medicine::Medicine() {
    Medicine::medicineId = -1;
    Medicine::medicineEndu = 0;
    Medicine::medicineExp = 0;
    Medicine::medicineHealth = 0;
    Medicine::medicineName = "";
    Medicine::medicinePrice = 0;
    Medicine::medicinePicPath = "";
    Medicine::medicineMood = 0;
    propertyIntegerSetters["medicineId"] = &Medicine::setMedicineId;
    propertyFloatSetters["medicinePrice"] = &Medicine::setMedicinePrice;
    propertyStringSetters["medicinePicPath"] = &Medicine::setMedicinePicPath;
    propertyStringSetters["medicineName"] = &Medicine::setMedicineName;
    propertyFloatSetters["medicineMood"] = &Medicine::setMedicineMood;
    propertyFloatSetters["medicineEndu"] = &Medicine::setMedicineEndu;
    propertyFloatSetters["medicineExp"] = &Medicine::setMedicineExp;
    propertyFloatSetters["medicineHealth"] = &Medicine::setMedicineHealth;
}

Medicine &Medicine::operator=(const Medicine &other) {
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

