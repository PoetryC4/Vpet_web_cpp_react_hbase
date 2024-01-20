//
// Created by clpo-2 on 12/20/23.
//

#ifndef MAIN_STRUTILS_H
#define MAIN_STRUTILS_H

#include <string>

class StrUtils {
public:
    static std::string toCamelCase(const std::string& input);
    static void replaceAll(std::string& str, const std::string& from, const std::string& to);
};


#endif //MAIN_STRUTILS_H
