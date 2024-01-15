//
// Created by clpo on 1/14/24.
//

#include "PresentUpdateRequest.h"
#include <string>
#include <iostream>
#include "../../../utils/FloatUtils.h"

int PresentUpdateRequest::getPresentId() const {
    return presentId;
}

void PresentUpdateRequest::setPresentId(int presentId) {
    PresentUpdateRequest::presentId = presentId;
}

float PresentUpdateRequest::getPresentPrice() const {
    return presentPrice;
}

void PresentUpdateRequest::setPresentPrice(float presentPrice) {
    PresentUpdateRequest::presentPrice = presentPrice;
}

const std::string &PresentUpdateRequest::getPresentPicPath() const {
    return presentPicPath;
}

void PresentUpdateRequest::setPresentPicPath(const std::string &presentPicPath) {
    PresentUpdateRequest::presentPicPath = presentPicPath;
}

const std::string &PresentUpdateRequest::getPresentName() const {
    return presentName;
}

void PresentUpdateRequest::setPresentName(const std::string &presentName) {
    PresentUpdateRequest::presentName = presentName;
}

float PresentUpdateRequest::getPresentMood() const {
    return presentMood;
}

void PresentUpdateRequest::setPresentMood(float presentMood) {
    PresentUpdateRequest::presentMood = presentMood;
}

float PresentUpdateRequest::getPresentExp() const {
    return presentExp;
}

void PresentUpdateRequest::setPresentExp(float presentExp) {
    PresentUpdateRequest::presentExp = presentExp;
}

float PresentUpdateRequest::getPresentPerformance() const {
    return presentPerformance;
}

void PresentUpdateRequest::setPresentPerformance(float presentPerformance) {
    PresentUpdateRequest::presentPerformance = presentPerformance;
}

void PresentUpdateRequest::setProperty(const std::string &propertyName, const std::string &value) {
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

PresentUpdateRequest::PresentUpdateRequest() {
    propertyIntegerSetters["presentId"] = &PresentUpdateRequest::setPresentId;
    propertyFloatSetters["presentPrice"] = &PresentUpdateRequest::setPresentPrice;
    propertyStringSetters["presentPicPath"] = &PresentUpdateRequest::setPresentPicPath;
    propertyStringSetters["presentName"] = &PresentUpdateRequest::setPresentName;
    propertyFloatSetters["presentMood"] = &PresentUpdateRequest::setPresentMood;
    propertyFloatSetters["presentExp"] = &PresentUpdateRequest::setPresentExp;
    propertyFloatSetters["presentPerformance"] = &PresentUpdateRequest::setPresentPerformance;

}
