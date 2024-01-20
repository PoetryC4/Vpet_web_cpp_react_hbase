//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_FOODUPDATEREQUEST_H
#define MAIN_FOODUPDATEREQUEST_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class FoodUpdateRequest {
private:
    int foodId;
    float foodPrice;
    std::string foodPicPath;
    std::string foodName;
    float foodHunger;
    float foodMood;
    float foodThirsty;
    float foodEndu;
    float foodExp;
    float foodHealth;

public:

    FoodUpdateRequest();

    friend std::ostream &operator<<(std::ostream &os, const FoodUpdateRequest &food);
    FoodUpdateRequest& operator=(const FoodUpdateRequest& other);

    int getFoodId() const;

    void setFoodId(int foodId);

    float getFoodPrice() const;

    void setFoodPrice(float foodPrice);

    const std::string &getFoodPicPath() const;

    void setFoodPicPath(const std::string &foodPicPath);

    const std::string &getFoodName() const;

    void setFoodName(const std::string &foodName);

    float getFoodHunger() const;

    void setFoodHunger(float foodHunger);

    float getFoodMood() const;

    void setFoodMood(float foodMood);

    float getFoodThirsty() const;

    void setFoodThirsty(float foodThirsty);

    float getFoodEndu() const;

    void setFoodEndu(float foodEndu);

    float getFoodExp() const;

    void setFoodExp(float foodExp);

    float getFoodHealth() const;

    void setFoodHealth(float foodHealth);

    // Method to set property based on string name
    void setProperty(const std::string &propertyName, const std::string &value);

    static FoodUpdateRequest toObject(const std::string &body) {
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        FoodUpdateRequest foodUpdateRequest;
        foodUpdateRequest.setFoodId(jsonBody["foodId"].get<int>());
        foodUpdateRequest.setFoodPrice(jsonBody["foodPrice"].get<float>());
        foodUpdateRequest.setFoodPicPath(jsonBody["foodPicPath"].get<std::string>());
        foodUpdateRequest.setFoodName(jsonBody["foodName"].get<std::string>());
        foodUpdateRequest.setFoodHunger(jsonBody["foodHunger"].get<float>());
        foodUpdateRequest.setFoodMood(jsonBody["foodMood"].get<float>());
        foodUpdateRequest.setFoodThirsty(jsonBody["foodThirsty"].get<float>());
        foodUpdateRequest.setFoodEndu(jsonBody["foodEndu"].get<float>());
        foodUpdateRequest.setFoodExp(jsonBody["foodExp"].get<float>());
        foodUpdateRequest.setFoodHealth(jsonBody["foodHealth"].get<float>());
        return foodUpdateRequest;
    }

private:
    using SetterFunctionString = std::function<void(FoodUpdateRequest &, const std::string &)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(FoodUpdateRequest &, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(FoodUpdateRequest &, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};



#endif //MAIN_FOODUPDATEREQUEST_H
