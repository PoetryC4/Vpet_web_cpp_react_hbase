//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_PRESENTSERVICE_H
#define MAIN_PRESENTSERVICE_H


#include "../gen-cpp/THBaseService.h"
#include <vector>
#include <thrift/config.h>
#include <iostream>
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <thrift/protocol/TBinaryProtocol.h>
#include <chrono>
#include <unordered_map>
#include "../model/entity/Present.h"
#include "../model/dto/present/PresentAddRequest.h"
#include "../model/basic/MyPageResult.h"
#include "../model/dto/present/PresentUpdateRequest.h"

using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

class PresentService {
public:
    PresentService();

    static std::vector<Present> scan();

    static MyPageResult<Present> page(const int& page, const int& pageSize);

    static Present getById(const std::string& presentId);

    static long save(const PresentAddRequest& presentAddRequest);

    static bool updateById(const PresentUpdateRequest& presentUpdateRequest);

};



#endif //MAIN_PRESENTSERVICE_H
