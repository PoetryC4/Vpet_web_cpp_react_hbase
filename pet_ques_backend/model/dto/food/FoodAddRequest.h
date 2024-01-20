//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_FOODADDREQUEST_H
#define MAIN_FOODADDREQUEST_H

#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class FoodAddRequest {
private:
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

    FoodAddRequest();

    friend std::ostream& operator<<(std::ostream& os, const FoodAddRequest& food);
    FoodAddRequest& operator=(const FoodAddRequest& other);

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
    static FoodAddRequest toObject(const std::string &body) {
        // 在这里实现反序列化逻辑，将请求体解析为PostAddRequest对象
        // 可以使用JSON库（如nlohmann/json）进行解析
        // 这里只是一个简单的示例，实际上你需要根据你的数据格式进行修改
        // 以下是使用nlohmann/json的示例代码
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        FoodAddRequest foodAddRequest;
        foodAddRequest.setFoodPrice(jsonBody["foodPrice"].get<float>());
        foodAddRequest.setFoodPicPath(jsonBody["foodPicPath"].get<std::string>());
        foodAddRequest.setFoodName(jsonBody["foodName"].get<std::string>());
        foodAddRequest.setFoodHunger(jsonBody["foodHunger"].get<float>());
        foodAddRequest.setFoodMood(jsonBody["foodMood"].get<float>());
        foodAddRequest.setFoodThirsty(jsonBody["foodThirsty"].get<float>());
        foodAddRequest.setFoodEndu(jsonBody["foodEndu"].get<float>());
        foodAddRequest.setFoodExp(jsonBody["foodExp"].get<float>());
        foodAddRequest.setFoodHealth(jsonBody["foodHealth"].get<float>());
        return foodAddRequest;
    }
private:
    using SetterFunctionString = std::function<void(FoodAddRequest&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionFloat = std::function<void(FoodAddRequest&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};



#endif //MAIN_FOODADDREQUEST_H
