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
        model/basic/MyPageRequest.cpp
        model/basic/MyPageRequest.h
        model/entity/Drink.cpp
        model/entity/Drink.h
        service/DrinkService.h
        service/DrinkService.cpp
        utils/StrUtils.cpp
        utils/StrUtils.h
        utils/FloatUtils.cpp
        utils/FloatUtils.h
        model/basic/MyPageResult.cpp
        model/basic/MyPageResult.h
        model/dto/drink/DrinkUpdateRequest.cpp
        model/dto/drink/DrinkUpdateRequest.h
        utils/FileUtils.cpp
        utils/FileUtils.h
        model/entity/Food.cpp
        model/entity/Food.h
        model/dto/food/FoodAddRequest.cpp
        model/dto/food/FoodAddRequest.h
        model/dto/food/FoodUpdateRequest.cpp
        model/dto/food/FoodUpdateRequest.h
        controller/DrinkController.cpp
        controller/DrinkController.h
        controller/FoodController.cpp
        controller/FoodController.h
        model/entity/Medicine.cpp
        model/entity/Medicine.h
        model/dto/medicine/MedicineAddRequest.cpp
        model/dto/medicine/MedicineAddRequest.h
        model/dto/medicine/MedicineUpdateRequest.cpp
        model/dto/medicine/MedicineUpdateRequest.h
        controller/MedicineController.cpp
        controller/MedicineController.h
        service/MedicineService.cpp
        service/MedicineService.h
        service/FoodService.cpp
        model/entity/Present.cpp
        model/entity/Present.h
        model/dto/present/PresentAddRequest.cpp
        model/dto/present/PresentAddRequest.h
        model/dto/present/PresentUpdateRequest.cpp
        model/dto/present/PresentUpdateRequest.h
        service/PresentService.cpp
        service/PresentService.h
        controller/PresentController.cpp
        controller/PresentController.h
)

# 添加可执行文件
add_executable(${PROJECT_NAME} ${SOURCES})
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/include)
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/controller)
target_link_libraries(${PROJECT_NAME} thrift)
target_link_libraries(${PROJECT_NAME} PkgConfig::Pistache)
# 添加 Thrift2 头文件目录
target_include_directories(${PROJECT_NAME} PRIVATE ${GEN_CPP_DIR})

