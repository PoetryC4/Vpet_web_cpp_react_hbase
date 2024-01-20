//
// Created by clpo on 1/14/24.
//



#include "Present.h"
#include <string>
#include "../include/nlohmann/json.hpp"
#include "../../utils/FloatUtils.h"

const int &Present::getPresentId() const {
    return presentId;
}

void Present::setPresentId(const int &presentId) {
    Present::presentId = presentId;
}

float Present::getPresentPrice() const {
    return presentPrice;
}

void Present::setPresentPrice(float presentPrice) {
    Present::presentPrice = presentPrice;
}

const std::string &Present::getPresentPicPath() const {
    return presentPicPath;
}

void Present::setPresentPicPath(const std::string &presentPicPath) {
    Present::presentPicPath = presentPicPath;
}

const std::string &Present::getPresentName() const {
    return presentName;
}

void Present::setPresentName(const std::string &presentName) {
    Present::presentName = presentName;
}

float Present::getPresentMood() const {
    return presentMood;
}

void Present::setPresentMood(float presentMood) {
    Present::presentMood = presentMood;
}

float Present::getPresentExp() const {
    return presentExp;
}

void Present::setPresentExp(float presentExp) {
    Present::presentExp = presentExp;
}

float Present::getPresentPerformance() const {
    return presentPerformance;
}

void Present::setPresentPerformance(float presentPerformance) {
    Present::presentPerformance = presentPerformance;
}

void Present::setProperty(const std::string &propertyName, const std::string &value) {
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

Present::Present() {
    Present::presentId = -1;
    Present::presentExp = 0;
    Present::presentPerformance = 0;
    Present::presentName = "";
    Present::presentPrice = 0;
    Present::presentPicPath = "";
    Present::presentMood = 0;
    propertyIntegerSetters["presentId"] = &Present::setPresentId;
    propertyFloatSetters["presentPrice"] = &Present::setPresentPrice;
    propertyStringSetters["presentPicPath"] = &Present::setPresentPicPath;
    propertyStringSetters["presentName"] = &Present::setPresentName;
    propertyFloatSetters["presentMood"] = &Present::setPresentMood;
    propertyFloatSetters["presentExp"] = &Present::setPresentExp;
    propertyFloatSetters["presentPerformance"] = &Present::setPresentPerformance;
}

Present &Present::operator=(const Present &other) {
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
