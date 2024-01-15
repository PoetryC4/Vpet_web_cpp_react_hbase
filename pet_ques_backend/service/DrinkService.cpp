#include "../gen-cpp/THBaseService.h"
#include <vector>
#include <iostream>
#include <thrift/transport/TSocket.h>
#include <thrift/transport/TBufferTransports.h>
#include <thrift/protocol/TBinaryProtocol.h>
#include "../model/entity/Drink.h"
#include "../model/dto/drink/DrinkAddRequest.h"
#include "../model/basic/MyPageResult.h"
#include "DrinkService.h"
#include "../utils/StrUtils.h"


using namespace std;
using namespace apache::thrift;
using namespace apache::thrift::protocol;
using namespace apache::thrift::transport;
using namespace apache::hadoop::hbase::thrift2;

using std::shared_ptr;

static int THRIFT_PORT = 9090;
static std::string THRIFT_IP = "127.0.0.1";

Drink DrinkService::getById(const std::string &drinkId) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    Drink drink;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs;
        const std::string table("drink");
        const std::string &thisrow = drinkId;
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
            drink.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return drink;
}

std::vector<Drink> DrinkService::scan() {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));

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
                if ((*iter).family != "count") {
                    drink.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
                }
            }
            drinkVector.emplace_back(drink);
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return drinkVector;
}

MyPageResult<Drink> DrinkService::page(const int &page, const int &pageSize) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));

    MyPageResult<Drink> drinkPage;

    std::vector<Drink> drinkVector;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("drink");
        const std::string countTable("count");

        //先读取
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs0;
        const std::string &thisrowKey = "drink_count";
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
        drinkPage.setCount(count);
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
            Drink drink;
            vector<TColumnValue> list = result.columnValues;
            std::vector<TColumnValue>::const_iterator iter;
            for (iter = list.begin(); iter != list.end(); iter++) {
                if ((*iter).family != "count") {
                    drink.setProperty(StrUtils::toCamelCase((*iter).qualifier), (*iter).value.c_str());
                }
            }
            drinkVector.emplace_back(drink);
        }
        transport->close();
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    drinkPage.setRecords(drinkVector);
    return drinkPage;
}

long DrinkService::save(const DrinkAddRequest &drinkAddRequest) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    long resId = -1;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("drink");
        const std::string countTable("count");

        //先读取
        TResult tresult;
        TGet get;
        std::vector<TColumnValue> cvs0;
        const std::string &thisrowKey = "drink_count";
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

        // 'drink_id' column
        TColumnValue tcvId0;
        tcvId0.__set_family("item_count");
        tcvId0.__set_qualifier("count");
        tcvId0.__set_value(std::to_string(count + 1));
        cvsRow0.insert(cvsRow0.end(), tcvId0);

        // Set row key and column values
        putRow0.__set_row("drink_count");
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
        resId = count + 1;
        std::cout << resId << std::endl;
    } catch (const TException &tx) {
        std::cerr << "ERROR(exception): " << tx.what() << std::endl;
    }
    return resId;
}

bool DrinkService::updateById(const DrinkUpdateRequest &drinkUpdateRequest) {
    std::shared_ptr<TSocket> socket(new TSocket(THRIFT_IP, THRIFT_PORT));
    std::shared_ptr<TTransport> transport(new TBufferedTransport(socket));
    std::shared_ptr<TProtocol> protocol(new TBinaryProtocol(transport));
    long update = false;
    try {
        transport->open();
        THBaseServiceClient client(protocol);
        const std::string table("drink");

        //数据存入
        std::vector<TPut> puts;

        std::string rowKey = std::to_string(drinkUpdateRequest.getDrinkId());

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
        tcvPrice.__set_value(std::to_string(drinkUpdateRequest.getDrinkPrice()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvPicPath;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_pic_path");
        tcvPrice.__set_value(drinkUpdateRequest.getDrinkPicPath());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvName;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_name");
        tcvPrice.__set_value(drinkUpdateRequest.getDrinkName());
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHunger;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_hunger");
        tcvPrice.__set_value(std::to_string(drinkUpdateRequest.getDrinkHunger()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvMood;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_mood");
        tcvPrice.__set_value(std::to_string(drinkUpdateRequest.getDrinkMood()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvThirsty;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_thirsty");
        tcvPrice.__set_value(std::to_string(drinkUpdateRequest.getDrinkThirsty()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvEndu;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_endu");
        tcvPrice.__set_value(std::to_string(drinkUpdateRequest.getDrinkEndu()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvExp;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_exp");
        tcvPrice.__set_value(std::to_string(drinkUpdateRequest.getDrinkExp()));
        cvsRow.insert(cvsRow.end(), tcvPrice);

        TColumnValue tcvHealth;
        tcvPrice.__set_family("info");
        tcvPrice.__set_qualifier("drink_health");
        tcvPrice.__set_value(std::to_string(drinkUpdateRequest.getDrinkHealth()));
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

DrinkService::DrinkService() = default;
