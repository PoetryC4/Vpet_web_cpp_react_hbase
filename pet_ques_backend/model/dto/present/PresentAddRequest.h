//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_PRESENTADDREQUEST_H
#define MAIN_PRESENTADDREQUEST_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class PresentAddRequest {
private:
    float presentPrice;
    std::string presentPicPath;
    std::string presentName;
    float presentMood;
    float presentExp;
    float presentPerformance;

public:

    PresentAddRequest();

    friend std::ostream& operator<<(std::ostream& os, const PresentAddRequest& present);
    PresentAddRequest& operator=(const PresentAddRequest& other);

    float getPresentPrice() const;
    void setPresentPrice(float presentPrice);

    const std::string &getPresentPicPath() const;
    void setPresentPicPath(const std::string &presentPicPath);

    const std::string &getPresentName() const;
    void setPresentName(const std::string &presentName);

    float getPresentMood() const;
    void setPresentMood(float presentMood);

    float getPresentExp() const;
    void setPresentExp(float presentExp);

    float getPresentPerformance() const;
    void setPresentPerformance(float presentPerformance);

    // Method to set property based on string name
    void setProperty(const std::string &propertyName, const std::string &value);
    static PresentAddRequest toObject(const std::string &body) {
        // 在这里实现反序列化逻辑，将请求体解析为PostAddRequest对象
        // 可以使用JSON库（如nlohmann/json）进行解析
        // 这里只是一个简单的示例，实际上你需要根据你的数据格式进行修改
        // 以下是使用nlohmann/json的示例代码
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        PresentAddRequest presentAddRequest;
        presentAddRequest.setPresentPrice(jsonBody["presentPrice"].get<float>());
        presentAddRequest.setPresentPicPath(jsonBody["presentPicPath"].get<std::string>());
        presentAddRequest.setPresentName(jsonBody["presentName"].get<std::string>());
        presentAddRequest.setPresentMood(jsonBody["presentMood"].get<float>());
        presentAddRequest.setPresentExp(jsonBody["presentExp"].get<float>());
        presentAddRequest.setPresentPerformance(jsonBody["presentPerformance"].get<float>());
        return presentAddRequest;
    }
private:
    using SetterFunctionString = std::function<void(PresentAddRequest&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionFloat = std::function<void(PresentAddRequest&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};


#endif //MAIN_PRESENTADDREQUEST_H
