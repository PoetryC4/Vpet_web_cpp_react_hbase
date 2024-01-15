//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_DRINKCONTROLLER_H
#define MAIN_DRINKCONTROLLER_H

#include <string>
#include <unordered_map>
#include <functional>
#include <iostream>
#include <pistache/common.h>
#include <pistache/cookie.h>
#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/http_headers.h>
#include <pistache/net.h>
#include <pistache/peer.h>
#include "../model/entity/Drink.h"
#include "../service/DrinkService.h"

class DrinkController {
private:
    using DrinkControllerFunctions = std::function<void(DrinkController&, const Pistache::Http::Request &req,
                                                        Pistache::Http::ResponseWriter &response)>;

public:
    DrinkController();

    std::unordered_map<std::string, DrinkControllerFunctions> drinkRequestHandlers;

    void getById(const Pistache::Http::Request &req,
                 Pistache::Http::ResponseWriter &response);

    void getAll(const Pistache::Http::Request &req,
                Pistache::Http::ResponseWriter &response);

    void add(const Pistache::Http::Request &req,
              Pistache::Http::ResponseWriter &response);

    void updateById(const Pistache::Http::Request &req,
              Pistache::Http::ResponseWriter &response);

    void page(const Pistache::Http::Request &req,
                Pistache::Http::ResponseWriter &response);
};


#endif //MAIN_DRINKCONTROLLER_H
