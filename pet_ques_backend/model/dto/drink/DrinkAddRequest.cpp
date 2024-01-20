//
// Created by clpo-2 on 12/19/23.
//

#include <string>
#include "DrinkAddRequest.h"
#include "../../../utils/FloatUtils.h"


float DrinkAddRequest::getDrinkPrice() const {
    return drinkPrice;
}

void DrinkAddRequest::setDrinkPrice(float drinkPrice) {
    DrinkAddRequest::drinkPrice = drinkPrice;
}

const std::string &DrinkAddRequest::getDrinkPicPath() const {
    return drinkPicPath;
}

void DrinkAddRequest::setDrinkPicPath(const std::string &drinkPicPath) {
    DrinkAddRequest::drinkPicPath = drinkPicPath;
}

const std::string &DrinkAddRequest::getDrinkName() const {
    return drinkName;
}

void DrinkAddRequest::setDrinkName(const std::string &drinkName) {
    DrinkAddRequest::drinkName = drinkName;
}

float DrinkAddRequest::getDrinkHunger() const {
    return drinkHunger;
}

void DrinkAddRequest::setDrinkHunger(float drinkHunger) {
    DrinkAddRequest::drinkHunger = drinkHunger;
}

float DrinkAddRequest::getDrinkMood() const {
    return drinkMood;
}

void DrinkAddRequest::setDrinkMood(float drinkMood) {
    DrinkAddRequest::drinkMood = drinkMood;
}

float DrinkAddRequest::getDrinkThirsty() const {
    return drinkThirsty;
}

void DrinkAddRequest::setDrinkThirsty(float drinkThirsty) {
    DrinkAddRequest::drinkThirsty = drinkThirsty;
}

float DrinkAddRequest::getDrinkEndu() const {
    return drinkEndu;
}

void DrinkAddRequest::setDrinkEndu(float drinkEndu) {
    DrinkAddRequest::drinkEndu = drinkEndu;
}

float DrinkAddRequest::getDrinkExp() const {
    return drinkExp;
}

void DrinkAddRequest::setDrinkExp(float drinkExp) {
    DrinkAddRequest::drinkExp = drinkExp;
}

float DrinkAddRequest::getDrinkHealth() const {
    return drinkHealth;
}

void DrinkAddRequest::setDrinkHealth(float drinkHealth) {
    DrinkAddRequest::drinkHealth = drinkHealth;
}

void DrinkAddRequest::setProperty(const std::string &propertyName, const std::string &value) {
    // Check the type of the property and call the appropriate setter function
    if (propertyFloatSetters.find(propertyName) != propertyFloatSetters.end()) {
        propertyFloatSetters[propertyName](*this, FloatUtils::setPrecision(std::stof(value), 2));
    } else if (propertyStringSetters.find(propertyName) != propertyStringSetters.end()) {
        propertyStringSetters[propertyName](*this, value);
    } else {
        std::cerr << "Property not found: " << propertyName << std::endl;
    }
}

DrinkAddRequest::DrinkAddRequest() {
    DrinkAddRequest::drinkEndu = 0;
    DrinkAddRequest::drinkExp = 0;
    DrinkAddRequest::drinkHealth = 0;
    DrinkAddRequest::drinkHunger = 0;
    DrinkAddRequest::drinkName = "";
    DrinkAddRequest::drinkPrice = 0;
    DrinkAddRequest::drinkThirsty = 0;
    DrinkAddRequest::drinkPicPath = "";
    DrinkAddRequest::drinkMood = 0;
    propertyFloatSetters["drinkPrice"] = &DrinkAddRequest::setDrinkPrice;
    propertyStringSetters["drinkPicPath"] = &DrinkAddRequest::setDrinkPicPath;
    propertyStringSetters["drinkName"] = &DrinkAddRequest::setDrinkName;
    propertyFloatSetters["drinkHunger"] = &DrinkAddRequest::setDrinkHunger;
    propertyFloatSetters["drinkMood"] = &DrinkAddRequest::setDrinkMood;
    propertyFloatSetters["drinkThirsty"] = &DrinkAddRequest::setDrinkThirsty;
    propertyFloatSetters["drinkEndu"] = &DrinkAddRequest::setDrinkEndu;
    propertyFloatSetters["drinkExp"] = &DrinkAddRequest::setDrinkExp;
    propertyFloatSetters["drinkHealth"] = &DrinkAddRequest::setDrinkHealth;
}

std::ostream &operator<<(std::ostream &os, const DrinkAddRequest &drink)  {
    os << "DrinkAddRequest{" <<
       "drinkPrice=" << drink.drinkPrice <<
       ", drinkPicPath='" << drink.drinkPicPath << '\'' <<
       ", drinkName='" << drink.drinkName << '\'' <<
       ", drinkHunger=" << drink.drinkHunger <<
       ", drinkMood=" << drink.drinkMood <<
       ", drinkThirsty=" << drink.drinkThirsty <<
       ", drinkEndu=" << drink.drinkEndu <<
       ", drinkExp=" << drink.drinkExp <<
       ", drinkHealth=" << drink.drinkHealth <<
       '}';
    return os;
}

DrinkAddRequest &DrinkAddRequest::operator=(const DrinkAddRequest &other) {// 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话）

        // 3. 复制参数对象的值
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
