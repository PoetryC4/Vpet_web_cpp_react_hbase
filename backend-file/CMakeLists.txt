cmake_minimum_required(VERSION 3.17)
project("main")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(httplib REQUIRED)

# 添加您的 C++ 源文件
set(SOURCES
        main.cpp
)

# 添加可执行文件
add_executable(${PROJECT_NAME} ${SOURCES})
target_link_libraries(${PROJECT_NAME} PRIVATE httplib::httplib)

