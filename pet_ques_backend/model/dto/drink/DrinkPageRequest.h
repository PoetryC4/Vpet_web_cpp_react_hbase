//
// Created by clpo-2 on 12/19/23.
//

#ifndef MAIN_DRINKPAGEREQUEST_H
#define MAIN_DRINKPAGEREQUEST_H

#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>

class DrinkPageRequest {
private:
    int page;
    int pageSize;

public:

    DrinkPageRequest();

    friend std::ostream& operator<<(std::ostream& os, const DrinkPageRequest& drink) {
        os << "DrinkPageRequest{" <<
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

private:
    using SetterFunctionInt = std::function<void(DrinkPageRequest&, const int)>;
    std::unordered_map<std::string, SetterFunctionInt> propertyIntSetters;

};

#endif //MAIN_DRINKPAGEREQUEST_H