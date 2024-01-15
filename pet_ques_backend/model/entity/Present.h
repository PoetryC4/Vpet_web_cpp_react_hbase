//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_PRESENT_H
#define MAIN_PRESENT_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "../include/nlohmann/json.hpp"

class Present {
private:
    int presentId;
    float presentPrice;
    std::string presentPicPath;
    std::string presentName;
    float presentMood;
    float presentExp;
    float presentPerformance;

public:

    Present();

    nlohmann::json toJson() const {
        return {
                {"presentId", presentId},
                {"presentPrice", presentPrice},
                {"presentPicPath", presentPicPath},
                {"presentName", presentName},
                {"presentMood", presentMood},
                {"presentExp", presentExp},
                {"presentPerformance", presentPerformance}
        };
    }

    const int &getPresentId() const;
    void setPresentId(const int &presentId);

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
private:
    using SetterFunctionString = std::function<void(Present&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(Present&, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(Present&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};




#endif //MAIN_PRESENT_H
