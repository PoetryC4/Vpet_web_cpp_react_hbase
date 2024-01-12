//
// Created by clpo-2 on 12/19/23.
//

#ifndef MAIN_DRINKADDREQUEST_H
#define MAIN_DRINKADDREQUEST_H

#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>

class DrinkAddRequest {
private:
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

    DrinkAddRequest();

    friend std::ostream& operator<<(std::ostream& os, const DrinkAddRequest& drink) {
        os << "DrinkAddRequest{" <<
           "drinkPrice=" << drink.drinkPrice <<
           ", drinkPicPath='" << drink.drinkPicPath << '\'' <<
           ", drinkName='" << drink.drinkName << '\'' <<
           ", drinkHunger=" << drink.drinkHunger <<
           ", drinkMood=" << drink.drinkMood <<
           ", drinkThirsty=" << drink.drinkThirsty <<
           ", drinkEndu=" << drink.drinkEndu <<
           ", drinkExp=" << drink.drinkExp <<
           ", drinkHealth=" << drink.drinkHealth <<
           '}';
        return os;
    }

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
    using SetterFunctionString = std::function<void(DrinkAddRequest&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionFloat = std::function<void(DrinkAddRequest&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};

#endif //MAIN_DRINKADDREQUEST_H
