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
    static std::vector<std::string> getFilesInDirectory(const std::string& directoryPath) {
        std::vector<std::string> fileNames;

        try {
            for (const auto& entry : fs::directory_iterator(directoryPath)) {
                if (entry.is_regular_file()) {
                    fileNames.push_back(entry.path().filename().string());
                }
            }
        } catch (const fs::filesystem_error& ex) {
            std::cerr << "Error accessing directory: " << ex.what() << std::endl;
        }

        return fileNames;
    }

};


#endif //MAIN_FILEUTILS_H
