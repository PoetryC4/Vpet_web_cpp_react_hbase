//
// Created by clpo-2 on 12/19/23.
//

#ifndef MAIN_DRINKADDREQUEST_H
#define MAIN_DRINKADDREQUEST_H

#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

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
    static DrinkAddRequest toObject(const std::string &body) {
        // 在这里实现反序列化逻辑，将请求体解析为PostAddRequest对象
        // 可以使用JSON库（如nlohmann/json）进行解析
        // 这里只是一个简单的示例，实际上你需要根据你的数据格式进行修改
        // 以下是使用nlohmann/json的示例代码
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        DrinkAddRequest drinkAddRequest;
        drinkAddRequest.setDrinkPrice(jsonBody["drinkPrice"].get<float>());
        drinkAddRequest.setDrinkPicPath(jsonBody["drinkPicPath"].get<std::string>());
        drinkAddRequest.setDrinkName(jsonBody["drinkName"].get<std::string>());
        drinkAddRequest.setDrinkHunger(jsonBody["drinkHunger"].get<float>());
        drinkAddRequest.setDrinkMood(jsonBody["drinkMood"].get<float>());
        drinkAddRequest.setDrinkThirsty(jsonBody["drinkThirsty"].get<float>());
        drinkAddRequest.setDrinkEndu(jsonBody["drinkEndu"].get<float>());
        drinkAddRequest.setDrinkExp(jsonBody["drinkExp"].get<float>());
        drinkAddRequest.setDrinkHealth(jsonBody["drinkHealth"].get<float>());
        return drinkAddRequest;
    }
private:
    using SetterFunctionString = std::function<void(DrinkAddRequest&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionFloat = std::function<void(DrinkAddRequest&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};

#endif //MAIN_DRINKADDREQUEST_H
