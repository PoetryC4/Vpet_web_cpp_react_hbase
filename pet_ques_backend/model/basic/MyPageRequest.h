//
// Created by clpo-2 on 12/19/23.
//

#ifndef MAIN_MYPAGEREQUEST_H
#define MAIN_MYPAGEREQUEST_H

#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include "nlohmann/json.hpp"

class MyPageRequest {
private:
    int page;
    int pageSize;

public:

    MyPageRequest();

    friend std::ostream& operator<<(std::ostream& os, const MyPageRequest& drink) {
        os << "MyPageRequest{" <<
           "page=" << drink.page <<
           ", pageSize='" << drink.pageSize << '\'' <<
           '}';
        return os;
    }

    int getPage() const;
    void setPage(int page);

    int getPageSize() const;
    void setPageSize(int pageSize);

    void setProperty(const std::string &propertyName, const std::string &value);
    static MyPageRequest toObject(const std::string &body) {
        nlohmann::json jsonBody = nlohmann::json::parse(body);
        MyPageRequest drinkPageRequest;
        drinkPageRequest.setPage(jsonBody["page"].get<int>());
        drinkPageRequest.setPageSize(jsonBody["pageSize"].get<int>());
        return drinkPageRequest;
    }
private:
    using SetterFunctionInt = std::function<void(MyPageRequest&, const int)>;
    std::unordered_map<std::string, SetterFunctionInt> propertyIntSetters;

};

#endif //MAIN_MYPAGEREQUEST_H
