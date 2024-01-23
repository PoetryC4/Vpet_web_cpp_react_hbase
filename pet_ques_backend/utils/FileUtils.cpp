//
// Created by clpo on 1/14/24.
//

#include "FileUtils.h"

const std::string absolutePathPrefix = "/home/clpo/Documents/pet_ques_new/static_file";

std::vector<std::string> FileUtils::getFilesInDirectory(const std::string &directoryPath) {
    std::vector<std::string> fileNames;

    try {
        for (const auto &entry: fs::recursive_directory_iterator(absolutePathPrefix + directoryPath)) {
            if (entry.is_regular_file()) {
                fileNames.push_back(entry.path().string().substr(absolutePathPrefix.length()));
            }
        }
    } catch (const fs::filesystem_error &ex) {
        std::cerr << "Error accessing directory: " << ex.what() << std::endl;
    }

    return fileNames;
}
