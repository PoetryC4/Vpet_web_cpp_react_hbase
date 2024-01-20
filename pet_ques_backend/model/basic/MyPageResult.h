//
// Created by clpo on 1/11/24.
//

#ifndef MAIN_MYPAGERESULT_H
#define MAIN_MYPAGERESULT_H


#include <vector>
#include "../../include/nlohmann/json.hpp"

template <typename T>
struct MyPageResult {
private:
    int count;
    std::vector<T> records;
public:
    MyPageResult() {
        count = -1;
        records = {};
    };
    // 构造函数，用于初始化属性
    MyPageResult(int intValue, const std::vector<T>& vectorValue)
            : count(intValue), records(vectorValue) {
    }
    // Getter for count
    int getCount() const {
        return count;
    };

    // Setter for count
    void setCount(int newValue) {
        count = newValue;
    };

    // Getter for records
    const std::vector<T>& getRecords() const {
        return records;
    };

    // Setter for records
    void setRecords(const std::vector<T>& newRecords){
        records = newRecords;
    };
};

#endif //MAIN_MYPAGERESULT_H
