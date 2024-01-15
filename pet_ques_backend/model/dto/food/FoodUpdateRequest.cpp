//
// Created by clpo on 1/14/24.
//

#include "FoodUpdateRequest.h"
#include <string>
#include <iostream>
#include "../../../utils/FloatUtils.h"

int FoodUpdateRequest::getFoodId() const {
    return foodId;
}

void FoodUpdateRequest::setFoodId(int foodId) {
    FoodUpdateRequest::foodId = foodId;
}

float FoodUpdateRequest::getFoodPrice() const {
    return foodPrice;
}

void FoodUpdateRequest::setFoodPrice(float foodPrice) {
    FoodUpdateRequest::foodPrice = foodPrice;
}

const std::string &FoodUpdateRequest::getFoodPicPath() const {
    return foodPicPath;
}

void FoodUpdateRequest::setFoodPicPath(const std::string &foodPicPath) {
    FoodUpdateRequest::foodPicPath = foodPicPath;
}

const std::string &FoodUpdateRequest::getFoodName() const {
    return foodName;
}

void FoodUpdateRequest::setFoodName(const std::string &foodName) {
    FoodUpdateRequest::foodName = foodName;
}

float FoodUpdateRequest::getFoodHunger() const {
    return foodHunger;
}

void FoodUpdateRequest::setFoodHunger(float foodHunger) {
    FoodUpdateRequest::foodHunger = foodHunger;
}

float FoodUpdateRequest::getFoodMood() const {
    return foodMood;
}

void FoodUpdateRequest::setFoodMood(float foodMood) {
    FoodUpdateRequest::foodMood = foodMood;
}

float FoodUpdateRequest::getFoodThirsty() const {
    return foodThirsty;
}

void FoodUpdateRequest::setFoodThirsty(float foodThirsty) {
    FoodUpdateRequest::foodThirsty = foodThirsty;
}

float FoodUpdateRequest::getFoodEndu() const {
    return foodEndu;
}

void FoodUpdateRequest::setFoodEndu(float foodEndu) {
    FoodUpdateRequest::foodEndu = foodEndu;
}

float FoodUpdateRequest::getFoodExp() const {
    return foodExp;
}

void FoodUpdateRequest::setFoodExp(float foodExp) {
    FoodUpdateRequest::foodExp = foodExp;
}

float FoodUpdateRequest::getFoodHealth() const {
    return foodHealth;
}

void FoodUpdateRequest::setFoodHealth(float foodHealth) {
    FoodUpdateRequest::foodHealth = foodHealth;
}

void FoodUpdateRequest::setProperty(const std::string &propertyName, const std::string &value) {
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

FoodUpdateRequest::FoodUpdateRequest() {
    propertyIntegerSetters["foodId"] = &FoodUpdateRequest::setFoodId;
    propertyFloatSetters["foodPrice"] = &FoodUpdateRequest::setFoodPrice;
    propertyStringSetters["foodPicPath"] = &FoodUpdateRequest::setFoodPicPath;
    propertyStringSetters["foodName"] = &FoodUpdateRequest::setFoodName;
    propertyFloatSetters["foodHunger"] = &FoodUpdateRequest::setFoodHunger;
    propertyFloatSetters["foodMood"] = &FoodUpdateRequest::setFoodMood;
    propertyFloatSetters["foodThirsty"] = &FoodUpdateRequest::setFoodThirsty;
    propertyFloatSetters["foodEndu"] = &FoodUpdateRequest::setFoodEndu;
    propertyFloatSetters["foodExp"] = &FoodUpdateRequest::setFoodExp;
    propertyFloatSetters["foodHealth"] = &FoodUpdateRequest::setFoodHealth;/*

    propertyFloatSetters["foodPrice"] = &FoodUpdateRequest::setFoodPrice;
    propertyStringSetters["foodPicPath"] = &FoodUpdateRequest::setFoodPicPath;
    propertyStringSetters["foodName"] = &FoodUpdateRequest::setFoodName;
    propertyFloatSetters["foodHunger"] = &FoodUpdateRequest::setFoodHunger;
    propertyFloatSetters["foodMood"] = &FoodUpdateRequest::setFoodMood;
    propertyFloatSetters["foodThirsty"] = &FoodUpdateRequest::setFoodThirsty;
    propertyFloatSetters["foodEndu"] = &FoodUpdateRequest::setFoodEndu;
    propertyFloatSetters["foodExp"] = &FoodUpdateRequest::setFoodExp;
    propertyFloatSetters["foodHealth"] = &FoodUpdateRequest::setFoodHealth;*/
}