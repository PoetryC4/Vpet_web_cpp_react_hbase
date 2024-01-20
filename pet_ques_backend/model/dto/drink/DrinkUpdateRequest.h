//
// Created by clpo on 1/12/24.
//

#ifndef MAIN_DRINKUPDATEREQUEST_H
#define MAIN_DRINKUPDATEREQUEST_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class DrinkUpdateRequest {
private:
    int drinkId;
    float drinkPrice;
    std::string drinkPicPath;
    std::string drinkName;
    float drinkHunger;
    float drinkMood;
    float drinkThirsty;
    float drinkEndu;
    float drinkExp;
    float drinkHealth;

public:

    DrinkUpdateRequest();

    friend std::ostream &operator<<(std::ostream &os, const DrinkUpdateRequest &drink);
    DrinkUpdateRequest& operator=(const DrinkUpdateRequest& other);

    int getDrinkId() const;

    void setDrinkId(int drinkId);

    float getDrinkPrice() const;

    void setDrinkPrice(float drinkPrice);

    const std::string &getDrinkPicPath() const;

    void setDrinkPicPath(const std::string &drinkPicPath);

    const std::string &getDrinkName() const;

    void setDrinkName(const std::string &drinkName);

    float getDrinkHunger() const;

    void setDrinkHunger(float drinkHunger);

    float getDrinkMood() const;

    void setDrinkMood(float drinkMood);

    float getDrinkThirsty() const;

    void setDrinkThirsty(float drinkThirsty);

    float getDrinkEndu() const;

    void setDrinkEndu(float drinkEndu);

    float getDrinkExp() const;

    void setDrinkExp(float drinkExp);

    float getDrinkHealth() const;

    void setDrinkHealth(float drinkHealth);

    // Method to set property based on string name
    void setProperty(const std::string &propertyName, const std::string &value);

    static DrinkUpdateRequest toObject(const std::string &body) {
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        DrinkUpdateRequest drinkUpdateRequest;
        drinkUpdateRequest.setDrinkId(jsonBody["drinkId"].get<int>());
        drinkUpdateRequest.setDrinkPrice(jsonBody["drinkPrice"].get<float>());
        drinkUpdateRequest.setDrinkPicPath(jsonBody["drinkPicPath"].get<std::string>());
        drinkUpdateRequest.setDrinkName(jsonBody["drinkName"].get<std::string>());
        drinkUpdateRequest.setDrinkHunger(jsonBody["drinkHunger"].get<float>());
        drinkUpdateRequest.setDrinkMood(jsonBody["drinkMood"].get<float>());
        drinkUpdateRequest.setDrinkThirsty(jsonBody["drinkThirsty"].get<float>());
        drinkUpdateRequest.setDrinkEndu(jsonBody["drinkEndu"].get<float>());
        drinkUpdateRequest.setDrinkExp(jsonBody["drinkExp"].get<float>());
        drinkUpdateRequest.setDrinkHealth(jsonBody["drinkHealth"].get<float>());
        return drinkUpdateRequest;
    }

private:
    using SetterFunctionString = std::function<void(DrinkUpdateRequest &, const std::string &)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(DrinkUpdateRequest &, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(DrinkUpdateRequest &, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};


#endif //MAIN_DRINKUPDATEREQUEST_H
