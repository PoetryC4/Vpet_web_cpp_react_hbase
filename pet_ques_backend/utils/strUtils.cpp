//
// Created by clpo-2 on 12/20/23.
//

#include "StrUtils.h"
#include <vector>
#include <sstream>

std::string StrUtils::toCamelCase(const std::string &input) {
    std::vector<std::string> parts;
    std::istringstream iss(input);
    std::string part;

    while (std::getline(iss, part, '_')) {
        parts.push_back(part);
    }

    std::string result;
    for (size_t i = 0; i < parts.size(); ++i) {
        if (i == 0) {
            result += parts[i];
        } else {
            result += static_cast<char>(std::toupper(parts[i][0])) + parts[i].substr(1);
        }
    }

    return result;
}
