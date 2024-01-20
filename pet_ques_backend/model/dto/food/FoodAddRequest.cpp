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
    FoodAddRequest::foodEndu = 0;
    FoodAddRequest::foodExp = 0;
    FoodAddRequest::foodHealth = 0;
    FoodAddRequest::foodHunger = 0;
    FoodAddRequest::foodName = "";
    FoodAddRequest::foodPrice = 0;
    FoodAddRequest::foodThirsty = 0;
    FoodAddRequest::foodPicPath = "";
    FoodAddRequest::foodMood = 0;
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

std::ostream& operator<<(std::ostream& os, const FoodAddRequest& food) {
    os << "FoodAddRequest{" <<
       "foodPrice=" << food.foodPrice <<
       ", foodPicPath='" << food.foodPicPath << '\'' <<
       ", foodName='" << food.foodName << '\'' <<
       ", foodHunger=" << food.foodHunger <<
       ", foodMood=" << food.foodMood <<
       ", foodThirsty=" << food.foodThirsty <<
       ", foodEndu=" << food.foodEndu <<
       ", foodExp=" << food.foodExp <<
       ", foodHealth=" << food.foodHealth <<
       '}';
    return os;
}

FoodAddRequest &FoodAddRequest::operator=(const FoodAddRequest &other) {// 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话）

        // 3. 复制参数对象的值
        foodPrice = other.foodPrice;
        foodPicPath = other.foodPicPath;
        foodName = other.foodName;
        foodHunger = other.foodHunger;
        foodMood = other.foodMood;
        foodThirsty = other.foodThirsty;
        foodEndu = other.foodEndu;
        foodExp = other.foodExp;
        foodHealth = other.foodHealth;
    }
    // 4. 返回一个对当前对象的引用，以支持连续赋值
    return *this;
}
