//
// Created by clpo on 1/14/24.
//

#include "../gen-cpp/THBaseService.h"
#include <vector>
#include <iostream>
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <thrift/protocol/TBinaryProtocol.h>
#include "../model/entity/Food.h"
#include "../model/dto/food/FoodAddRequest.h"
#include "../model/basic/MyPageResult.h"
#include "FoodService.h"
#include "../utils/StrUtils.h"


using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

using std::shared_ptr;

static int THRIFT_PORT = 9090;
static std::string THRIFT_IP = "127.0.0.1";

Food FoodService::getById(const std::string &foodId) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    Food food;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs;
        const std::string table("food");
        const std::string &thisrow = foodId;
        //get data
        get.__set_row(thisrow);

        // 添加列族信息
        TColumn familyColumn;
        familyColumn.__set_family("info");  // 替换为你的实际列族名
        get.__set_columns(std::vector<TColumn>{familyColumn});

        bool exists = client.exists("food", get);
        if (!exists) {
            // 处理行不存在的情况
            std::cerr << "Row with ID " << foodId << " does not exist." << std::endl;
            transport->close();
            return food;  // 或者抛出异常，根据你的需求进行处理
        }
        // printf("exists result value = %d\n", be);
        client.get(tresult, table, get);
        vector<TColumnValue> list = tresult.columnValues;
        std::vector<TColumnValue>::const_iterator iter;
        for (iter = list.begin(); iter != list.end(); iter++) {
            food.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return food;
}

std::vector<Food> FoodService::scan() {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));

    std::vector<Food> foodVector;
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
        client.getScannerResults(results, "food", scan, 100); // 10 表示每次获取的最大行数

        std::cout << results.size() << std::endl;
// 处理查询结果
        for (const auto &result: results) {
            Food food;
            vector<TColumnValue> list = result.columnValues;
            std::vector<TColumnValue>::const_iterator iter;
            for (iter = list.begin(); iter != list.end(); iter++) {
                if ((*iter).family != "count") {
                    food.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
                }
            }
            foodVector.emplace_back(food);
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return foodVector;
}

MyPageResult<Food> FoodService::page(const int &page, const int &pageSize) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));

    MyPageResult<Food> foodPage;

    std::vector<Food> foodVector;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("food");
        const std::string countTable("count");

        //先读取
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs0;
        const std::string &thisrowKey = "food_count";
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
        foodPage.setCount(count);
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
            Food food;
            vector<TColumnValue> list = result.columnValues;
            std::vector<TColumnValue>::const_iterator iter;
            for (iter = list.begin(); iter != list.end(); iter++) {
                if ((*iter).family != "count") {
                    food.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
                }
            }
            foodVector.emplace_back(food);
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    foodPage.setRecords(foodVector);
    return foodPage;
}

long FoodService::save(const FoodAddRequest &foodAddRequest) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    long resId = -1;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("food");
        const std::string countTable("count");

        //先读取
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs0;
        const std::string &thisrowKey = "food_count";
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

        // 'food_id' column
        TColumnValue tcvId0;
        tcvId0.__set_family("item_count");
        tcvId0.__set_qualifier("count");
        tcvId0.__set_value(std::to_string(count + 1));
        cvsRow0.insert(cvsRow0.end(), tcvId0);

        // Set row key and column values
        putRow0.__set_row("food_count");
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

        // 'food_id' column
        TColumnValue tcvId;
        tcvId.__set_family("info");
        tcvId.__set_qualifier("food_id");
        tcvId.__set_value(rowKey);
        cvsRow.insert(cvsRow.end(), tcvId);

        // 'food_price' column
        TColumnValue tcvPrice;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_price");
        tcvPrice.__set_value(std::to_string(foodAddRequest.getFoodPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPicPath;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_pic_path");
        tcvPrice.__set_value(foodAddRequest.getFoodPicPath());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvName;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_name");
        tcvPrice.__set_value(foodAddRequest.getFoodName());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHunger;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_hunger");
        tcvPrice.__set_value(std::to_string(foodAddRequest.getFoodHunger()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvMood;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_mood");
        tcvPrice.__set_value(std::to_string(foodAddRequest.getFoodPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvThirsty;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_thirsty");
        tcvPrice.__set_value(std::to_string(foodAddRequest.getFoodThirsty()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvEndu;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_endu");
        tcvPrice.__set_value(std::to_string(foodAddRequest.getFoodEndu()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvExp;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_exp");
        tcvPrice.__set_value(std::to_string(foodAddRequest.getFoodExp()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHealth;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_health");
        tcvPrice.__set_value(std::to_string(foodAddRequest.getFoodHealth()));
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

bool FoodService::updateById(const FoodUpdateRequest &foodUpdateRequest) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    long update = false;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("food");

        //数据存入
        std::vector<TPut> puts;

        std::string rowKey = std::to_string(foodUpdateRequest.getFoodId());

        // Inserting data for the generated row
        TPut putRow;
        std::vector<TColumnValue> cvsRow;

        // 'food_id' column
        TColumnValue tcvId;
        tcvId.__set_family("info");
        tcvId.__set_qualifier("food_id");
        tcvId.__set_value(rowKey);
        cvsRow.insert(cvsRow.end(), tcvId);

        // 'food_price' column
        TColumnValue tcvPrice;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_price");
        tcvPrice.__set_value(std::to_string(foodUpdateRequest.getFoodPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPicPath;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_pic_path");
        tcvPrice.__set_value(foodUpdateRequest.getFoodPicPath());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvName;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_name");
        tcvPrice.__set_value(foodUpdateRequest.getFoodName());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHunger;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_hunger");
        tcvPrice.__set_value(std::to_string(foodUpdateRequest.getFoodHunger()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvMood;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_mood");
        tcvPrice.__set_value(std::to_string(foodUpdateRequest.getFoodMood()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvThirsty;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_thirsty");
        tcvPrice.__set_value(std::to_string(foodUpdateRequest.getFoodThirsty()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvEndu;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_endu");
        tcvPrice.__set_value(std::to_string(foodUpdateRequest.getFoodEndu()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvExp;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_exp");
        tcvPrice.__set_value(std::to_string(foodUpdateRequest.getFoodExp()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHealth;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("food_health");
        tcvPrice.__set_value(std::to_string(foodUpdateRequest.getFoodHealth()));
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

FoodService::FoodService() = default;