//
// Created by clpo-2 on 12/20/23.
//

#ifndef MAIN_DRINKCONTROLLER_H
#define MAIN_DRINKCONTROLLER_H

#include "../gen-cpp/THBaseService.h"
#include <vector>
#include <thrift/config.h>
#include <iostream>
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <thrift/protocol/TBinaryProtocol.h>
#include <chrono>
#include <unordered_map>
#include "../model/entity/Drink.h"
#include "../model/dto/drink/DrinkAddRequest.h"
#include "../model/basic/MyPageResult.h"
#include "../model/dto/drink/DrinkUpdateRequest.h"

using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

class DrinkController {
public:
    DrinkController();

    static std::vector<Drink> scan();

    static MyPageResult<Drink> page(const int& page, const int& pageSize);

    static Drink getById(const std::string& drinkId);

    static long save(const DrinkAddRequest& drinkAddRequest);

    static bool updateById(const DrinkUpdateRequest& drinkUpdateRequest);

};


#endif //MAIN_DRINKCONTROLLER_H
