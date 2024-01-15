//
// Created by clpo-2 on 12/19/23.
//

#include <string>
#include "MyPageRequest.h"

int MyPageRequest::getPage() const {
    return page;
}
void MyPageRequest::setPage(int page) {
    MyPageRequest::page = page;
}

int MyPageRequest::getPageSize() const {
    return pageSize;
}
void MyPageRequest::setPageSize(int pageSize) {
    MyPageRequest::pageSize = pageSize;
}

void MyPageRequest::setProperty(const std::string &propertyName, const std::string &value) {
    // Check the type of the property and call the appropriate setter function
    if (propertyIntSetters.find(propertyName) != propertyIntSetters.end()) {
        propertyIntSetters[propertyName](*this, std::stoi(value));
    } else {
        std::cerr << "Property not found: " << propertyName << std::endl;
    }
}

MyPageRequest::MyPageRequest() {
    propertyIntSetters["page"] = &MyPageRequest::setPage;
    propertyIntSetters["pageSize"] = &MyPageRequest::setPageSize;
}