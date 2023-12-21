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
#include "DrinkController.h"
#include "../utils/strUtils.h"


using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

using boost::shared_ptr;

static int THRIFT_PORT = 9090;
static std::string THRIFT_IP = "127.0.0.1";

Drink DrinkController::getById(std::string drinkId) {
    boost::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    boost::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    boost::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    Drink drink;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs;
        const std::string table("drink");
        const std::string& thisrow = drinkId;
        //get data
        get.__set_row(thisrow);

        // 添加列族信息
        TColumn familyColumn;
        familyColumn.__set_family("info");  // 替换为你的实际列族名
        get.__set_columns(std::vector<TColumn>{familyColumn});

        bool exists = client.exists("drink", get);
        if (!exists) {
            // 处理行不存在的情况
            std::cerr << "Row with ID " << drinkId << " does not exist." << std::endl;
            transport->close();
            return drink;  // 或者抛出异常，根据你的需求进行处理
        }
        // printf("exists result value = %d\n", be);
        client.get(tresult, table, get);
        vector<TColumnValue> list = tresult.columnValues;
        std::vector<TColumnValue>::const_iterator iter;
        for (iter = list.begin(); iter != list.end(); iter++) {
            drink.setProperty(strUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return drink;
}

std::vector<Drink> DrinkController::scan() {
    boost::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    boost::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    boost::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));

    std::vector<Drink> drinkVector;
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
        client.getScannerResults(results, "drink", scan, 100); // 10 表示每次获取的最大行数

        std::cout << results.size() << std::endl;
// 处理查询结果
        for (const auto &result: results) {
            Drink drink;
            vector<TColumnValue> list = result.columnValues;
            std::vector<TColumnValue>::const_iterator iter;
            for (iter = list.begin(); iter != list.end(); iter++) {
                drink.setProperty(strUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
            }
            drinkVector.emplace_back(drink);
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return drinkVector;
}

bool DrinkController::save(const DrinkAddRequest& drinkAddRequest) {
    boost::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    boost::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    boost::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    long resId = -1;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        std::vector<TPut> puts;
        const std::string table("drink");

        // Generate a unique row key based on timestamp
        // auto timestamp = std::chrono::system_clock::now().time_since_epoch().count();
        auto currentTime = std::chrono::system_clock::now();
        // 将时间点转换为毫秒数（或其他时间单位）
        auto duration = currentTime.time_since_epoch();
        auto milliseconds = std::chrono::duration_cast<std::chrono::milliseconds>(duration);

        // 将毫秒数转换为 long 类型
        long timestamp = milliseconds.count();

        std::string rowKey = std::to_string(timestamp);

        // Inserting data for the generated row
        TPut putRow;
        std::vector<TColumnValue> cvsRow;

        // 'drink_id' column
        TColumnValue tcvId;
        tcvId.__set_family("info");
        tcvId.__set_qualifier("drink_id");
        tcvId.__set_value(rowKey);
        cvsRow.insert(cvsRow.end(), tcvId);

        // 'drink_price' column
        TColumnValue tcvPrice;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_price");
        tcvPrice.__set_value(std::to_string(drinkAddRequest.getDrinkPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPicPath;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_pic_path");
        tcvPrice.__set_value(drinkAddRequest.getDrinkPicPath());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvName;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_name");
        tcvPrice.__set_value(drinkAddRequest.getDrinkName());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHunger;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_hunger");
        tcvPrice.__set_value(std::to_string(drinkAddRequest.getDrinkHunger()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvMood;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_mood");
        tcvPrice.__set_value(std::to_string(drinkAddRequest.getDrinkPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvThirsty;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_thirsty");
        tcvPrice.__set_value(std::to_string(drinkAddRequest.getDrinkThirsty()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvEndu;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_endu");
        tcvPrice.__set_value(std::to_string(drinkAddRequest.getDrinkEndu()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvExp;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_exp");
        tcvPrice.__set_value(std::to_string(drinkAddRequest.getDrinkExp()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHealth;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_health");
        tcvPrice.__set_value(std::to_string(drinkAddRequest.getDrinkHealth()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        // Set row key and column values
        putRow.__set_row(rowKey);
        putRow.__set_columnValues(cvsRow);
        puts.insert(puts.end(), putRow);

        // Perform the put operation
        client.putMultiple(table, puts);
        puts.clear();

        transport->close();
        resId = timestamp;
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return resId;
}

DrinkController::DrinkController() = default;
