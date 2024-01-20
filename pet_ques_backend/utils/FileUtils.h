//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_FILEUTILS_H
#define MAIN_FILEUTILS_H

#include <iostream>
#include <filesystem>
#include <vector>
#include <string>

namespace fs = std::filesystem;

class FileUtils {
public:
    static std::vector<std::string> getFilesInDirectory(const std::string& directoryPath);

};


#endif //MAIN_FILEUTILS_H
