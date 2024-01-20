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
    PresentUpdateRequest::presentId = -1;
    PresentUpdateRequest::presentExp = 0;
    PresentUpdateRequest::presentPerformance = 0;
    PresentUpdateRequest::presentName = "";
    PresentUpdateRequest::presentPrice = 0;
    PresentUpdateRequest::presentPicPath = "";
    PresentUpdateRequest::presentMood = 0;
    propertyIntegerSetters["presentId"] = &PresentUpdateRequest::setPresentId;
    propertyFloatSetters["presentPrice"] = &PresentUpdateRequest::setPresentPrice;
    propertyStringSetters["presentPicPath"] = &PresentUpdateRequest::setPresentPicPath;
    propertyStringSetters["presentName"] = &PresentUpdateRequest::setPresentName;
    propertyFloatSetters["presentMood"] = &PresentUpdateRequest::setPresentMood;
    propertyFloatSetters["presentExp"] = &PresentUpdateRequest::setPresentExp;
    propertyFloatSetters["presentPerformance"] = &PresentUpdateRequest::setPresentPerformance;
}

std::ostream &operator<<(std::ostream &os, const PresentUpdateRequest &present) {
    os << "PresentUpdateRequest{" <<
       "presentPrice=" << present.presentPrice <<
       ", presentPicPath='" << present.presentPicPath << '\'' <<
       ", presentName='" << present.presentName << '\'' <<
       ", presentMood=" << present.presentMood <<
       ", presentExp=" << present.presentExp <<
       ", presentPerformance=" << present.presentPerformance <<
       ", presentId=" << present.presentId <<
       '}';
    return os;
}

PresentUpdateRequest &PresentUpdateRequest::operator=(const PresentUpdateRequest &other) {
    // 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话）

        // 3. 复制参数对象的值
        presentId = other.presentId;
        presentPrice = other.presentPrice;
        presentPicPath = other.presentPicPath;
        presentName = other.presentName;
        presentMood = other.presentMood;
        presentExp = other.presentExp;
        presentPerformance = other.presentPerformance;
    }
    // 4. 返回一个对当前对象的引用，以支持连续赋值
    return *this;
}
