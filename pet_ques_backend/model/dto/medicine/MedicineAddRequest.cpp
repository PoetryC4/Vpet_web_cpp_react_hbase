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
    propertyFloatSetters["medicinePrice"] = &MedicineAddRequest::setMedicinePrice;
    propertyStringSetters["medicinePicPath"] = &MedicineAddRequest::setMedicinePicPath;
    propertyStringSetters["medicineName"] = &MedicineAddRequest::setMedicineName;
    propertyFloatSetters["medicineMood"] = &MedicineAddRequest::setMedicineMood;
    propertyFloatSetters["medicineEndu"] = &MedicineAddRequest::setMedicineEndu;
    propertyFloatSetters["medicineExp"] = &MedicineAddRequest::setMedicineExp;
    propertyFloatSetters["medicineHealth"] = &MedicineAddRequest::setMedicineHealth;
}