//
// Created by clpo-2 on 12/19/23.
//

#include "Drink.h"
#include <string>
#include "../include/nlohmann/json.hpp"
#include "../../utils/FloatUtils.h"

const int &Drink::getDrinkId() const {
    return drinkId;
}

void Drink::setDrinkId(const int &drinkId) {
    Drink::drinkId = drinkId;
}

float Drink::getDrinkPrice() const {
    return drinkPrice;
}

void Drink::setDrinkPrice(float drinkPrice) {
    Drink::drinkPrice = drinkPrice;
}

const std::string &Drink::getDrinkPicPath() const {
    return drinkPicPath;
}

void Drink::setDrinkPicPath(const std::string &drinkPicPath) {
    Drink::drinkPicPath = drinkPicPath;
}

const std::string &Drink::getDrinkName() const {
    return drinkName;
}

void Drink::setDrinkName(const std::string &drinkName) {
    Drink::drinkName = drinkName;
}

float Drink::getDrinkHunger() const {
    return drinkHunger;
}

void Drink::setDrinkHunger(float drinkHunger) {
    Drink::drinkHunger = drinkHunger;
}

float Drink::getDrinkMood() const {
    return drinkMood;
}

void Drink::setDrinkMood(float drinkMood) {
    Drink::drinkMood = drinkMood;
}

float Drink::getDrinkThirsty() const {
    return drinkThirsty;
}

void Drink::setDrinkThirsty(float drinkThirsty) {
    Drink::drinkThirsty = drinkThirsty;
}

float Drink::getDrinkEndu() const {
    return drinkEndu;
}

void Drink::setDrinkEndu(float drinkEndu) {
    Drink::drinkEndu = drinkEndu;
}

float Drink::getDrinkExp() const {
    return drinkExp;
}

void Drink::setDrinkExp(float drinkExp) {
    Drink::drinkExp = drinkExp;
}

float Drink::getDrinkHealth() const {
    return drinkHealth;
}

void Drink::setDrinkHealth(float drinkHealth) {
    Drink::drinkHealth = drinkHealth;
}

void Drink::setProperty(const std::string &propertyName, const std::string &value) {
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

Drink::Drink() {
    Drink::drinkId = -1;
    Drink::drinkEndu = 0;
    Drink::drinkExp = 0;
    Drink::drinkHealth = 0;
    Drink::drinkHunger = 0;
    Drink::drinkName = "";
    Drink::drinkPrice = 0;
    Drink::drinkThirsty = 0;
    Drink::drinkPicPath = "";
    Drink::drinkMood = 0;
    propertyIntegerSetters["drinkId"] = &Drink::setDrinkId;
    propertyFloatSetters["drinkPrice"] = &Drink::setDrinkPrice;
    propertyStringSetters["drinkPicPath"] = &Drink::setDrinkPicPath;
    propertyStringSetters["drinkName"] = &Drink::setDrinkName;
    propertyFloatSetters["drinkHunger"] = &Drink::setDrinkHunger;
    propertyFloatSetters["drinkMood"] = &Drink::setDrinkMood;
    propertyFloatSetters["drinkThirsty"] = &Drink::setDrinkThirsty;
    propertyFloatSetters["drinkEndu"] = &Drink::setDrinkEndu;
    propertyFloatSetters["drinkExp"] = &Drink::setDrinkExp;
    propertyFloatSetters["drinkHealth"] = &Drink::setDrinkHealth;
}

Drink &Drink::operator=(const Drink &other) {
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

