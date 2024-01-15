//
// Created by clpo on 1/14/24.
//

#include "Food.h"
#include <string>
#include "../include/nlohmann/json.hpp"
#include "../../utils/FloatUtils.h"

const int &Food::getFoodId() const {
    return foodId;
}

void Food::setFoodId(const int &foodId) {
    Food::foodId = foodId;
}

float Food::getFoodPrice() const {
    return foodPrice;
}

void Food::setFoodPrice(float foodPrice) {
    Food::foodPrice = foodPrice;
}

const std::string &Food::getFoodPicPath() const {
    return foodPicPath;
}

void Food::setFoodPicPath(const std::string &foodPicPath) {
    Food::foodPicPath = foodPicPath;
}

const std::string &Food::getFoodName() const {
    return foodName;
}

void Food::setFoodName(const std::string &foodName) {
    Food::foodName = foodName;
}

float Food::getFoodHunger() const {
    return foodHunger;
}

void Food::setFoodHunger(float foodHunger) {
    Food::foodHunger = foodHunger;
}

float Food::getFoodMood() const {
    return foodMood;
}

void Food::setFoodMood(float foodMood) {
    Food::foodMood = foodMood;
}

float Food::getFoodThirsty() const {
    return foodThirsty;
}

void Food::setFoodThirsty(float foodThirsty) {
    Food::foodThirsty = foodThirsty;
}

float Food::getFoodEndu() const {
    return foodEndu;
}

void Food::setFoodEndu(float foodEndu) {
    Food::foodEndu = foodEndu;
}

float Food::getFoodExp() const {
    return foodExp;
}

void Food::setFoodExp(float foodExp) {
    Food::foodExp = foodExp;
}

float Food::getFoodHealth() const {
    return foodHealth;
}

void Food::setFoodHealth(float foodHealth) {
    Food::foodHealth = foodHealth;
}

void Food::setProperty(const std::string &propertyName, const std::string &value) {
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

Food::Food() {
    propertyIntegerSetters["foodId"] = &Food::setFoodId;
    propertyFloatSetters["foodPrice"] = &Food::setFoodPrice;
    propertyStringSetters["foodPicPath"] = &Food::setFoodPicPath;
    propertyStringSetters["foodName"] = &Food::setFoodName;
    propertyFloatSetters["foodHunger"] = &Food::setFoodHunger;
    propertyFloatSetters["foodMood"] = &Food::setFoodMood;
    propertyFloatSetters["foodThirsty"] = &Food::setFoodThirsty;
    propertyFloatSetters["foodEndu"] = &Food::setFoodEndu;
    propertyFloatSetters["foodExp"] = &Food::setFoodExp;
    propertyFloatSetters["foodHealth"] = &Food::setFoodHealth;
}

