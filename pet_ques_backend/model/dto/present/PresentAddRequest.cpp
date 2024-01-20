//
// Created by clpo on 1/14/24.
//

#include <string>
#include "PresentAddRequest.h"
#include "../../../utils/FloatUtils.h"


float PresentAddRequest::getPresentPrice() const {
    return presentPrice;
}

void PresentAddRequest::setPresentPrice(float presentPrice) {
    PresentAddRequest::presentPrice = presentPrice;
}

const std::string &PresentAddRequest::getPresentPicPath() const {
    return presentPicPath;
}

void PresentAddRequest::setPresentPicPath(const std::string &presentPicPath) {
    PresentAddRequest::presentPicPath = presentPicPath;
}

const std::string &PresentAddRequest::getPresentName() const {
    return presentName;
}

void PresentAddRequest::setPresentName(const std::string &presentName) {
    PresentAddRequest::presentName = presentName;
}

float PresentAddRequest::getPresentMood() const {
    return presentMood;
}

void PresentAddRequest::setPresentMood(float presentMood) {
    PresentAddRequest::presentMood = presentMood;
}

float PresentAddRequest::getPresentExp() const {
    return presentExp;
}

void PresentAddRequest::setPresentExp(float presentExp) {
    PresentAddRequest::presentExp = presentExp;
}

float PresentAddRequest::getPresentPerformance() const {
    return presentPerformance;
}

void PresentAddRequest::setPresentPerformance(float presentPerformance) {
    PresentAddRequest::presentPerformance = presentPerformance;
}

void PresentAddRequest::setProperty(const std::string &propertyName, const std::string &value) {
    // Check the type of the property and call the appropriate setter function
    if (propertyFloatSetters.find(propertyName) != propertyFloatSetters.end()) {
        propertyFloatSetters[propertyName](*this, FloatUtils::setPrecision(std::stof(value), 2));
    } else if (propertyStringSetters.find(propertyName) != propertyStringSetters.end()) {
        propertyStringSetters[propertyName](*this, value);
    } else {
        std::cerr << "Property not found: " << propertyName << std::endl;
    }
}

PresentAddRequest::PresentAddRequest() {
    PresentAddRequest::presentExp = 0;
    PresentAddRequest::presentPerformance = 0;
    PresentAddRequest::presentName = "";
    PresentAddRequest::presentPrice = 0;
    PresentAddRequest::presentPicPath = "";
    PresentAddRequest::presentMood = 0;
    propertyFloatSetters["presentPrice"] = &PresentAddRequest::setPresentPrice;
    propertyStringSetters["presentPicPath"] = &PresentAddRequest::setPresentPicPath;
    propertyStringSetters["presentName"] = &PresentAddRequest::setPresentName;
    propertyFloatSetters["presentMood"] = &PresentAddRequest::setPresentMood;
    propertyFloatSetters["presentExp"] = &PresentAddRequest::setPresentExp;
    propertyFloatSetters["presentPerformance"] = &PresentAddRequest::setPresentPerformance;
}

std::ostream& operator<<(std::ostream& os, const PresentAddRequest& present) {
    os << "PresentAddRequest{" <<
       "presentPrice=" << present.presentPrice <<
       ", presentPicPath='" << present.presentPicPath << '\'' <<
       ", presentName='" << present.presentName << '\'' <<
       ", presentMood=" << present.presentMood <<
       ", presentExp=" << present.presentExp <<
       ", presentPerformance=" << present.presentPerformance <<
       '}';
    return os;
}

PresentAddRequest &PresentAddRequest::operator=(const PresentAddRequest &other) {
    // 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话）

        // 3. 复制参数对象的值
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
