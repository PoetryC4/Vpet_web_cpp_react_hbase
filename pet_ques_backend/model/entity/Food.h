//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_FOOD_H
#define MAIN_FOOD_H

#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "../include/nlohmann/json.hpp"

class Food {
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

    Food();

    nlohmann::json toJson() const {
        return {
                {"foodId", foodId},
                {"foodPrice", foodPrice},
                {"foodPicPath", foodPicPath},
                {"foodName", foodName},
                {"foodHunger", foodHunger},
                {"foodMood", foodMood},
                {"foodThirsty", foodThirsty},
                {"foodEndu", foodEndu},
                {"foodExp", foodExp},
                {"foodHealth", foodHealth}
        };
    }

    Food& operator=(const Food& other);

    const int &getFoodId() const;
    void setFoodId(const int &foodId);

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
private:
    using SetterFunctionString = std::function<void(Food&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(Food&, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(Food&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};

#endif //MAIN_FOOD_H
