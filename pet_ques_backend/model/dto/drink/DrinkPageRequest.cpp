//
// Created by clpo-2 on 12/19/23.
//

#include <string>
#include "DrinkPageRequest.h"

int DrinkPageRequest::getPage() const {
    return page;
}
void DrinkPageRequest::setPage(int page) {
    DrinkPageRequest::page = page;
}

int DrinkPageRequest::getPageSize() const {
    return pageSize;
}
void DrinkPageRequest::setPageSize(int pageSize) {
    DrinkPageRequest::pageSize = pageSize;
}

void DrinkPageRequest::setProperty(const std::string &propertyName, const std::string &value) {
    // Check the type of the property and call the appropriate setter function
    if (propertyIntSetters.find(propertyName) != propertyIntSetters.end()) {
        propertyIntSetters[propertyName](*this, std::stoi(value));
    } else {
        std::cerr << "Property not found: " << propertyName << std::endl;
    }
}

DrinkPageRequest::DrinkPageRequest() {
    propertyIntSetters["page"] = &DrinkPageRequest::setPage;
    propertyIntSetters["pageSize"] = &DrinkPageRequest::setPageSize;
}