//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_MEDICINESERVICE_H
#define MAIN_MEDICINESERVICE_H


#include "../gen-cpp/THBaseService.h"
#include <vector>
#include <thrift/config.h>
#include <iostream>
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <thrift/protocol/TBinaryProtocol.h>
#include <chrono>
#include <unordered_map>
#include "../model/entity/Medicine.h"
#include "../model/dto/medicine/MedicineAddRequest.h"
#include "../model/basic/MyPageResult.h"
#include "../model/dto/medicine/MedicineUpdateRequest.h"

using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

class MedicineService {
public:
    MedicineService();

    static std::vector<Medicine> scan();

    static MyPageResult<Medicine> page(const int& page, const int& pageSize);

    static Medicine getById(const std::string& medicineId);

    static long save(const MedicineAddRequest& medicineAddRequest);

    static bool updateById(const MedicineUpdateRequest& medicineUpdateRequest);

};


#endif //MAIN_MEDICINESERVICE_H
