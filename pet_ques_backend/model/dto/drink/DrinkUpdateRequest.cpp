//
// Created by clpo on 1/12/24.
//

#include "DrinkUpdateRequest.h"
#include <string>
#include <iostream>
#include "../../../utils/FloatUtils.h"

int DrinkUpdateRequest::getDrinkId() const {
    return drinkId;
}

void DrinkUpdateRequest::setDrinkId(int drinkId) {
    DrinkUpdateRequest::drinkId = drinkId;
}

float DrinkUpdateRequest::getDrinkPrice() const {
    return drinkPrice;
}

void DrinkUpdateRequest::setDrinkPrice(float drinkPrice) {
    DrinkUpdateRequest::drinkPrice = drinkPrice;
}

const std::string &DrinkUpdateRequest::getDrinkPicPath() const {
    return drinkPicPath;
}

void DrinkUpdateRequest::setDrinkPicPath(const std::string &drinkPicPath) {
    DrinkUpdateRequest::drinkPicPath = drinkPicPath;
}

const std::string &DrinkUpdateRequest::getDrinkName() const {
    return drinkName;
}

void DrinkUpdateRequest::setDrinkName(const std::string &drinkName) {
    DrinkUpdateRequest::drinkName = drinkName;
}

float DrinkUpdateRequest::getDrinkHunger() const {
    return drinkHunger;
}

void DrinkUpdateRequest::setDrinkHunger(float drinkHunger) {
    DrinkUpdateRequest::drinkHunger = drinkHunger;
}

float DrinkUpdateRequest::getDrinkMood() const {
    return drinkMood;
}

void DrinkUpdateRequest::setDrinkMood(float drinkMood) {
    DrinkUpdateRequest::drinkMood = drinkMood;
}

float DrinkUpdateRequest::getDrinkThirsty() const {
    return drinkThirsty;
}

void DrinkUpdateRequest::setDrinkThirsty(float drinkThirsty) {
    DrinkUpdateRequest::drinkThirsty = drinkThirsty;
}

float DrinkUpdateRequest::getDrinkEndu() const {
    return drinkEndu;
}

void DrinkUpdateRequest::setDrinkEndu(float drinkEndu) {
    DrinkUpdateRequest::drinkEndu = drinkEndu;
}

float DrinkUpdateRequest::getDrinkExp() const {
    return drinkExp;
}

void DrinkUpdateRequest::setDrinkExp(float drinkExp) {
    DrinkUpdateRequest::drinkExp = drinkExp;
}

float DrinkUpdateRequest::getDrinkHealth() const {
    return drinkHealth;
}

void DrinkUpdateRequest::setDrinkHealth(float drinkHealth) {
    DrinkUpdateRequest::drinkHealth = drinkHealth;
}

void DrinkUpdateRequest::setProperty(const std::string &propertyName, const std::string &value) {
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

DrinkUpdateRequest::DrinkUpdateRequest() {
    DrinkUpdateRequest::drinkId = -1;
    DrinkUpdateRequest::drinkEndu = 0;
    DrinkUpdateRequest::drinkExp = 0;
    DrinkUpdateRequest::drinkHealth = 0;
    DrinkUpdateRequest::drinkHunger = 0;
    DrinkUpdateRequest::drinkName = "";
    DrinkUpdateRequest::drinkPrice = 0;
    DrinkUpdateRequest::drinkThirsty = 0;
    DrinkUpdateRequest::drinkPicPath = "";
    DrinkUpdateRequest::drinkMood = 0;
    propertyIntegerSetters["drinkId"] = &DrinkUpdateRequest::setDrinkId;
    propertyFloatSetters["drinkPrice"] = &DrinkUpdateRequest::setDrinkPrice;
    propertyStringSetters["drinkPicPath"] = &DrinkUpdateRequest::setDrinkPicPath;
    propertyStringSetters["drinkName"] = &DrinkUpdateRequest::setDrinkName;
    propertyFloatSetters["drinkHunger"] = &DrinkUpdateRequest::setDrinkHunger;
    propertyFloatSetters["drinkMood"] = &DrinkUpdateRequest::setDrinkMood;
    propertyFloatSetters["drinkThirsty"] = &DrinkUpdateRequest::setDrinkThirsty;
    propertyFloatSetters["drinkEndu"] = &DrinkUpdateRequest::setDrinkEndu;
    propertyFloatSetters["drinkExp"] = &DrinkUpdateRequest::setDrinkExp;
    propertyFloatSetters["drinkHealth"] = &DrinkUpdateRequest::setDrinkHealth;
}

std::ostream &operator<<(std::ostream &os, const DrinkUpdateRequest &drink) {
    os << "DrinkUpdateRequest{" <<
       "drinkPrice=" << drink.drinkPrice <<
       ", drinkPicPath='" << drink.drinkPicPath << '\'' <<
       ", drinkName='" << drink.drinkName << '\'' <<
       ", drinkHunger=" << drink.drinkHunger <<
       ", drinkMood=" << drink.drinkMood <<
       ", drinkThirsty=" << drink.drinkThirsty <<
       ", drinkEndu=" << drink.drinkEndu <<
       ", drinkExp=" << drink.drinkExp <<
       ", drinkHealth=" << drink.drinkHealth <<
       ", drinkId=" << drink.drinkId <<
       '}';
    return os;
}

DrinkUpdateRequest &DrinkUpdateRequest::operator=(const DrinkUpdateRequest &other) {
    // 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话）

        // 3. 复制参数对象的值
        drinkId = other.drinkId;
        drinkPrice = other.drinkPrice;
        drinkPicPath = other.drinkPicPath;
        drinkName = other.drinkName;
        drinkHunger = other.drinkHunger;
        drinkMood = other.drinkMood;
        drinkThirsty = other.drinkThirsty;
        drinkEndu = other.drinkEndu;
        drinkExp = other.drinkExp;
        drinkHealth = other.drinkHealth;
    }
    // 4. 返回一个对当前对象的引用，以支持连续赋值
    return *this;
}