//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_PRESENTUPDATEREQUEST_H
#define MAIN_PRESENTUPDATEREQUEST_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class PresentUpdateRequest {
private:
    int presentId;
    float presentPrice;
    std::string presentPicPath;
    std::string presentName;
    float presentMood;
    float presentExp;
    float presentPerformance;

public:

    PresentUpdateRequest();

    friend std::ostream &operator<<(std::ostream &os, const PresentUpdateRequest &present);
    PresentUpdateRequest& operator=(const PresentUpdateRequest& other);

    int getPresentId() const;

    void setPresentId(int presentId);

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

    static PresentUpdateRequest toObject(const std::string &body) {
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        PresentUpdateRequest presentUpdateRequest;
        presentUpdateRequest.setPresentId(jsonBody["presentId"].get<int>());
        presentUpdateRequest.setPresentPrice(jsonBody["presentPrice"].get<float>());
        presentUpdateRequest.setPresentPicPath(jsonBody["presentPicPath"].get<std::string>());
        presentUpdateRequest.setPresentName(jsonBody["presentName"].get<std::string>());
        presentUpdateRequest.setPresentMood(jsonBody["presentMood"].get<float>());
        presentUpdateRequest.setPresentExp(jsonBody["presentExp"].get<float>());
        presentUpdateRequest.setPresentPerformance(jsonBody["presentPerformance"].get<float>());
        return presentUpdateRequest;
    }

private:
    using SetterFunctionString = std::function<void(PresentUpdateRequest &, const std::string &)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(PresentUpdateRequest &, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(PresentUpdateRequest &, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};


#endif //MAIN_PRESENTUPDATEREQUEST_H
