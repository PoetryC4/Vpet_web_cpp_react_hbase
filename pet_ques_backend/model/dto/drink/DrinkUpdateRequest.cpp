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
    propertyIntegerSetters["drinkId"] = &DrinkUpdateRequest::setDrinkId;
    propertyFloatSetters["drinkPrice"] = &DrinkUpdateRequest::setDrinkPrice;
    propertyStringSetters["drinkPicPath"] = &DrinkUpdateRequest::setDrinkPicPath;
    propertyStringSetters["drinkName"] = &DrinkUpdateRequest::setDrinkName;
    propertyFloatSetters["drinkHunger"] = &DrinkUpdateRequest::setDrinkHunger;
    propertyFloatSetters["drinkMood"] = &DrinkUpdateRequest::setDrinkMood;
    propertyFloatSetters["drinkThirsty"] = &DrinkUpdateRequest::setDrinkThirsty;
    propertyFloatSetters["drinkEndu"] = &DrinkUpdateRequest::setDrinkEndu;
    propertyFloatSetters["drinkExp"] = &DrinkUpdateRequest::setDrinkExp;
    propertyFloatSetters["drinkHealth"] = &DrinkUpdateRequest::setDrinkHealth;/*

    propertyFloatSetters["drinkPrice"] = &DrinkUpdateRequest::setDrinkPrice;
    propertyStringSetters["drinkPicPath"] = &DrinkUpdateRequest::setDrinkPicPath;
    propertyStringSetters["drinkName"] = &DrinkUpdateRequest::setDrinkName;
    propertyFloatSetters["drinkHunger"] = &DrinkUpdateRequest::setDrinkHunger;
    propertyFloatSetters["drinkMood"] = &DrinkUpdateRequest::setDrinkMood;
    propertyFloatSetters["drinkThirsty"] = &DrinkUpdateRequest::setDrinkThirsty;
    propertyFloatSetters["drinkEndu"] = &DrinkUpdateRequest::setDrinkEndu;
    propertyFloatSetters["drinkExp"] = &DrinkUpdateRequest::setDrinkExp;
    propertyFloatSetters["drinkHealth"] = &DrinkUpdateRequest::setDrinkHealth;*/
}