cmake_minimum_required(VERSION 3.17)
project("main")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加生成的 Thrift2 代码目录
set(GEN_CPP_DIR ./include/hbase)

find_package(PkgConfig)
pkg_check_modules(Pistache REQUIRED IMPORTED_TARGET libpistache)

# 添加您的 C++ 源文件
set(SOURCES
        main.cpp
        ./gen-cpp/hbase_types.cpp
#         ./gen-cpp/hbase_constants.cpp
        ./gen-cpp/THBaseService.cpp
        model/dto/drink/DrinkAddRequest.cpp
        model/dto/drink/DrinkAddRequest.h
        model/dto/drink/DrinkPageRequest.cpp
        model/dto/drink/DrinkPageRequest.h
        model/entity/Drink.cpp
        model/entity/Drink.h
        controller/DrinkController.h
        controller/DrinkController.cpp
        utils/strUtils.cpp
        utils/strUtils.h
        utils/floatUtils.cpp
        utils/floatUtils.h
        model/basic/MyPageResult.cpp
        model/basic/MyPageResult.h
)

# 添加可执行文件
add_executable(${PROJECT_NAME} ${SOURCES})
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/include)
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/controller)
target_link_libraries(${PROJECT_NAME} thrift)
target_link_libraries(${PROJECT_NAME} PkgConfig::Pistache)
# 添加 Thrift2 头文件目录
target_include_directories(${PROJECT_NAME} PRIVATE ${GEN_CPP_DIR})

