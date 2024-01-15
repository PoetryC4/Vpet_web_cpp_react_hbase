//
// Created by clpo on 1/14/24.
//


#include <string>
#include "FoodAddRequest.h"
#include "../../../utils/FloatUtils.h"


float FoodAddRequest::getFoodPrice() const {
    return foodPrice;
}

void FoodAddRequest::setFoodPrice(float foodPrice) {
    FoodAddRequest::foodPrice = foodPrice;
}

const std::string &FoodAddRequest::getFoodPicPath() const {
    return foodPicPath;
}

void FoodAddRequest::setFoodPicPath(const std::string &foodPicPath) {
    FoodAddRequest::foodPicPath = foodPicPath;
}

const std::string &FoodAddRequest::getFoodName() const {
    return foodName;
}

void FoodAddRequest::setFoodName(const std::string &foodName) {
    FoodAddRequest::foodName = foodName;
}

float FoodAddRequest::getFoodHunger() const {
    return foodHunger;
}

void FoodAddRequest::setFoodHunger(float foodHunger) {
    FoodAddRequest::foodHunger = foodHunger;
}

float FoodAddRequest::getFoodMood() const {
    return foodMood;
}

void FoodAddRequest::setFoodMood(float foodMood) {
    FoodAddRequest::foodMood = foodMood;
}

float FoodAddRequest::getFoodThirsty() const {
    return foodThirsty;
}

void FoodAddRequest::setFoodThirsty(float foodThirsty) {
    FoodAddRequest::foodThirsty = foodThirsty;
}

float FoodAddRequest::getFoodEndu() const {
    return foodEndu;
}

void FoodAddRequest::setFoodEndu(float foodEndu) {
    FoodAddRequest::foodEndu = foodEndu;
}

float FoodAddRequest::getFoodExp() const {
    return foodExp;
}

void FoodAddRequest::setFoodExp(float foodExp) {
    FoodAddRequest::foodExp = foodExp;
}

float FoodAddRequest::getFoodHealth() const {
    return foodHealth;
}

void FoodAddRequest::setFoodHealth(float foodHealth) {
    FoodAddRequest::foodHealth = foodHealth;
}

void FoodAddRequest::setProperty(const std::string &propertyName, const std::string &value) {
    // Check the type of the property and call the appropriate setter function
    if (propertyFloatSetters.find(propertyName) != propertyFloatSetters.end()) {
        propertyFloatSetters[propertyName](*this, FloatUtils::setPrecision(std::stof(value), 2));
    } else if (propertyStringSetters.find(propertyName) != propertyStringSetters.end()) {
        propertyStringSetters[propertyName](*this, value);
    } else {
        std::cerr << "Property not found: " << propertyName << std::endl;
    }
}

FoodAddRequest::FoodAddRequest() {
    propertyFloatSetters["foodPrice"] = &FoodAddRequest::setFoodPrice;
    propertyStringSetters["foodPicPath"] = &FoodAddRequest::setFoodPicPath;
    propertyStringSetters["foodName"] = &FoodAddRequest::setFoodName;
    propertyFloatSetters["foodHunger"] = &FoodAddRequest::setFoodHunger;
    propertyFloatSetters["foodMood"] = &FoodAddRequest::setFoodMood;
    propertyFloatSetters["foodThirsty"] = &FoodAddRequest::setFoodThirsty;
    propertyFloatSetters["foodEndu"] = &FoodAddRequest::setFoodEndu;
    propertyFloatSetters["foodExp"] = &FoodAddRequest::setFoodExp;
    propertyFloatSetters["foodHealth"] = &FoodAddRequest::setFoodHealth;
}
