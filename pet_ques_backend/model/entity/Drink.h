//
// Created by clpo-2 on 12/19/23.
//

#ifndef MAIN_DRINK_H
#define MAIN_DRINK_H



#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "../include/nlohmann/json.hpp"

class Drink {
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

    Drink();

    nlohmann::json toJson() const {
        return {
                {"drinkId", drinkId},
                {"drinkPrice", drinkPrice},
                {"drinkPicPath", drinkPicPath},
                {"drinkName", drinkName},
                {"drinkHunger", drinkHunger},
                {"drinkMood", drinkMood},
                {"drinkThirsty", drinkThirsty},
                {"drinkEndu", drinkEndu},
                {"drinkExp", drinkExp},
                {"drinkHealth", drinkHealth}
        };
    }

    const int &getDrinkId() const;
    void setDrinkId(const int &drinkId);

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
private:
    using SetterFunctionString = std::function<void(Drink&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(Drink&, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(Drink&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};


#endif //MAIN_DRINK_H
