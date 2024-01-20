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

MyPageRequest::MyPageRequest() : page(1), pageSize(2) {
    propertyIntSetters["page"] = &MyPageRequest::setPage;
    propertyIntSetters["pageSize"] = &MyPageRequest::setPageSize;
}

std::ostream &operator<<(std::ostream &os, const MyPageRequest &drink)  {
    os << "MyPageRequest{" <<
       "page=" << drink.page <<
       ", pageSize='" << drink.pageSize << '\'' <<
       '}';
    return os;
}

MyPageRequest& MyPageRequest::operator=(const MyPageRequest& other) {
    // 1. 处理自我赋值
    if (this != &other) {
        // 2. 释放当前对象的资源（如果有的话），在这个类的情况下并没有资源需要释放

        // 3. 复制参数对象的值
        page = other.page;
        pageSize = other.pageSize;
    }
    // 4. 返回一个对当前对象的引用，以支持连续赋值
    return *this;
}
