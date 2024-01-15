//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_MEDICINE_H
#define MAIN_MEDICINE_H


#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "../include/nlohmann/json.hpp"

class Medicine {
private:
    int medicineId;
    float medicinePrice;
    std::string medicinePicPath;
    std::string medicineName;
    float medicineMood;
    float medicineEndu;
    float medicineExp;
    float medicineHealth;

public:

    Medicine();

    nlohmann::json toJson() const {
        return {
                {"medicineId", medicineId},
                {"medicinePrice", medicinePrice},
                {"medicinePicPath", medicinePicPath},
                {"medicineName", medicineName},
                {"medicineMood", medicineMood},
                {"medicineEndu", medicineEndu},
                {"medicineExp", medicineExp},
                {"medicineHealth", medicineHealth}
        };
    }

    const int &getMedicineId() const;
    void setMedicineId(const int &medicineId);

    float getMedicinePrice() const;
    void setMedicinePrice(float medicinePrice);

    const std::string &getMedicinePicPath() const;
    void setMedicinePicPath(const std::string &medicinePicPath);

    const std::string &getMedicineName() const;
    void setMedicineName(const std::string &medicineName);

    float getMedicineMood() const;
    void setMedicineMood(float medicineMood);

    float getMedicineEndu() const;
    void setMedicineEndu(float medicineEndu);

    float getMedicineExp() const;
    void setMedicineExp(float medicineExp);

    float getMedicineHealth() const;
    void setMedicineHealth(float medicineHealth);

    // Method to set property based on string name
    void setProperty(const std::string &propertyName, const std::string &value);
private:
    using SetterFunctionString = std::function<void(Medicine&, const std::string&)>;
    std::unordered_map<std::string, SetterFunctionString> propertyStringSetters;
    using SetterFunctionInteger = std::function<void(Medicine&, const int)>;
    std::unordered_map<std::string, SetterFunctionInteger> propertyIntegerSetters;
    using SetterFunctionFloat = std::function<void(Medicine&, const float)>;
    std::unordered_map<std::string, SetterFunctionFloat> propertyFloatSetters;

};



#endif //MAIN_MEDICINE_H
