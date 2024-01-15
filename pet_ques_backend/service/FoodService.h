//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_FOODSERVICE_H
#define MAIN_FOODSERVICE_H


#include "../gen-cpp/THBaseService.h"
#include <vector>
#include <thrift/config.h>
#include <iostream>
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <thrift/protocol/TBinaryProtocol.h>
#include <chrono>
#include <unordered_map>
#include "../model/entity/Food.h"
#include "../model/dto/food/FoodAddRequest.h"
#include "../model/basic/MyPageResult.h"
#include "../model/dto/food/FoodUpdateRequest.h"

using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

class FoodService {
public:
    FoodService();

    static std::vector<Food> scan();

    static MyPageResult<Food> page(const int& page, const int& pageSize);

    static Food getById(const std::string& foodId);

    static long save(const FoodAddRequest& foodAddRequest);

    static bool updateById(const FoodUpdateRequest& foodUpdateRequest);

};


#endif //MAIN_FOODSERVICE_H
