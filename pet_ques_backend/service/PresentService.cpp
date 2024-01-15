//
// Created by clpo on 1/14/24.
//


#include "../gen-cpp/THBaseService.h"
#include <vector>
#include <iostream>
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <thrift/protocol/TBinaryProtocol.h>
#include "../model/entity/Present.h"
#include "../model/dto/present/PresentAddRequest.h"
#include "../model/basic/MyPageResult.h"
#include "PresentService.h"
#include "../utils/StrUtils.h"


using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

using std::shared_ptr;

static int THRIFT_PORT = 9090;
static std::string THRIFT_IP = "127.0.0.1";

Present PresentService::getById(const std::string &presentId) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    Present present;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs;
        const std::string table("present");
        const std::string &thisrow = presentId;
        //get data
        get.__set_row(thisrow);

        // 添加列族信息
        TColumn familyColumn;
        familyColumn.__set_family("info");  // 替换为你的实际列族名
        get.__set_columns(std::vector<TColumn>{familyColumn});

        bool exists = client.exists("present", get);
        if (!exists) {
            // 处理行不存在的情况
            std::cerr << "Row with ID " << presentId << " does not exist." << std::endl;
            transport->close();
            return present;  // 或者抛出异常，根据你的需求进行处理
        }
        // printf("exists result value = %d\n", be);
        client.get(tresult, table, get);
        vector<TColumnValue> list = tresult.columnValues;
        std::vector<TColumnValue>::const_iterator iter;
        for (iter = list.begin(); iter != list.end(); iter++) {
            present.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return present;
}

std::vector<Present> PresentService::scan() {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));

    std::vector<Present> presentVector;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        TScan scan;
        // scan.__set_startRow(""); // 设置起始行键
        // scan.__set_stopRow("");  // 设置终止行键
        // scan.__set_caching(100);  // 设置缓存大小

        // TColumn familyColumn;
        // familyColumn.__set_family("info");  // 替换为你的实际列族名
        // scan.__set_columns(std::vector<TColumn>{familyColumn});

        std::vector<TResult> results;
        client.getScannerResults(results, "present", scan, 100); // 10 表示每次获取的最大行数

        std::cout << results.size() << std::endl;
// 处理查询结果
        for (const auto &result: results) {
            Present present;
            vector<TColumnValue> list = result.columnValues;
            std::vector<TColumnValue>::const_iterator iter;
            for (iter = list.begin(); iter != list.end(); iter++) {
                if ((*iter).family != "count") {
                    present.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
                }
            }
            presentVector.emplace_back(present);
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return presentVector;
}

MyPageResult<Present> PresentService::page(const int &page, const int &pageSize) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));

    MyPageResult<Present> presentPage;

    std::vector<Present> presentVector;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("present");
        const std::string countTable("count");

        //先读取
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs0;
        const std::string &thisrowKey = "present_count";
        get.__set_row(thisrowKey);

        TColumn familyColumn0;
        familyColumn0.__set_family("item_count");  // 替换为你的实际列族名
        get.__set_columns(std::vector<TColumn>{familyColumn0});

        client.get(tresult, countTable, get);
        vector<TColumnValue> list = tresult.columnValues;
        std::vector<TColumnValue>::const_iterator iter;
        int64_t count = -1;
        for (iter = list.begin(); iter != list.end(); iter++) {
            count = std::stoi((*iter).value);
        }
        presentPage.setCount(count);
        TScan scan;

        // 容错
        int corPage = std::max(page, 1);
        int corPageSize = std::max(pageSize, 1);
        int startRow = std::min((int) (count - 1), (corPage - 1) * corPageSize + 1);//保证取得到数据
        scan.__set_startRow(std::to_string(startRow));
        scan.__set_caching(corPageSize);

        std::vector<TResult> results;
        client.getScannerResults(results, table, scan, corPageSize);

        std::cout << results.size() << std::endl;

        // Process query results
        for (const auto &result: results) {
            Present present;
            vector<TColumnValue> list = result.columnValues;
            std::vector<TColumnValue>::const_iterator iter;
            for (iter = list.begin(); iter != list.end(); iter++) {
                if ((*iter).family != "count") {
                    present.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
                }
            }
            presentVector.emplace_back(present);
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    presentPage.setRecords(presentVector);
    return presentPage;
}

long PresentService::save(const PresentAddRequest &presentAddRequest) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    long resId = -1;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("present");
        const std::string countTable("count");

        //先读取
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs0;
        const std::string &thisrowKey = "present_count";
        get.__set_row(thisrowKey);

        TColumn familyColumn0;
        familyColumn0.__set_family("item_count");  // 替换为你的实际列族名
        get.__set_columns(std::vector<TColumn>{familyColumn0});

        client.get(tresult, countTable, get);
        vector<TColumnValue> list = tresult.columnValues;
        std::vector<TColumnValue>::const_iterator iter;
        int64_t count = -1;
        for (iter = list.begin(); iter != list.end(); iter++) {
            count = std::stoi((*iter).value);
        }

        //再放入
        std::vector<TPut> puts0;
        // Inserting data for the generated row
        TPut putRow0;
        std::vector<TColumnValue> cvsRow0;

        // 'present_id' column
        TColumnValue tcvId0;
        tcvId0.__set_family("item_count");
        tcvId0.__set_qualifier("count");
        tcvId0.__set_value(std::to_string(count + 1));
        cvsRow0.insert(cvsRow0.end(), tcvId0);

        // Set row key and column values
        putRow0.__set_row("present_count");
        putRow0.__set_columnValues(cvsRow0);
        puts0.insert(puts0.end(), putRow0);

        // Perform the put operation
        client.putMultiple(countTable, puts0);
        puts0.clear();

        //数据存入
        std::vector<TPut> puts;

        std::string rowKey = std::to_string(count + 1);

        // Inserting data for the generated row
        TPut putRow;
        std::vector<TColumnValue> cvsRow;

        // 'present_id' column
        TColumnValue tcvId;
        tcvId.__set_family("info");
        tcvId.__set_qualifier("present_id");
        tcvId.__set_value(rowKey);
        cvsRow.insert(cvsRow.end(), tcvId);

        // 'present_price' column
        TColumnValue tcvPrice;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_price");
        tcvPrice.__set_value(std::to_string(presentAddRequest.getPresentPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPicPath;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_pic_path");
        tcvPrice.__set_value(presentAddRequest.getPresentPicPath());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvName;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_name");
        tcvPrice.__set_value(presentAddRequest.getPresentName());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvMood;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_mood");
        tcvPrice.__set_value(std::to_string(presentAddRequest.getPresentMood()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvExp;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_exp");
        tcvPrice.__set_value(std::to_string(presentAddRequest.getPresentExp()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPerformance;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_performance");
        tcvPrice.__set_value(std::to_string(presentAddRequest.getPresentPerformance()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        // Set row key and column values
        putRow.__set_row(rowKey);
        putRow.__set_columnValues(cvsRow);
        puts.insert(puts.end(), putRow);

        // Perform the put operation
        client.putMultiple(table, puts);
        puts.clear();

        transport->close();
        resId = count + 1;
        std::cout << resId << std::endl;
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return resId;
}

bool PresentService::updateById(const PresentUpdateRequest &presentUpdateRequest) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    long update = false;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("present");

        //数据存入
        std::vector<TPut> puts;

        std::string rowKey = std::to_string(presentUpdateRequest.getPresentId());

        // Inserting data for the generated row
        TPut putRow;
        std::vector<TColumnValue> cvsRow;

        // 'present_id' column
        TColumnValue tcvId;
        tcvId.__set_family("info");
        tcvId.__set_qualifier("present_id");
        tcvId.__set_value(rowKey);
        cvsRow.insert(cvsRow.end(), tcvId);

        // 'present_price' column
        TColumnValue tcvPrice;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_price");
        tcvPrice.__set_value(std::to_string(presentUpdateRequest.getPresentPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPicPath;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_pic_path");
        tcvPrice.__set_value(presentUpdateRequest.getPresentPicPath());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvName;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_name");
        tcvPrice.__set_value(presentUpdateRequest.getPresentName());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvMood;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_mood");
        tcvPrice.__set_value(std::to_string(presentUpdateRequest.getPresentMood()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvExp;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_exp");
        tcvPrice.__set_value(std::to_string(presentUpdateRequest.getPresentExp()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPerformance;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("present_performance");
        tcvPrice.__set_value(std::to_string(presentUpdateRequest.getPresentPerformance()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        // Set row key and column values
        putRow.__set_row(rowKey);
        putRow.__set_columnValues(cvsRow);
        puts.insert(puts.end(), putRow);

        // Perform the put operation
        client.putMultiple(table, puts);
        puts.clear();

        transport->close();
        update = true;

    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return update;
}

PresentService::PresentService() = default;
