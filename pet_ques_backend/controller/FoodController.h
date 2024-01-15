//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_FOODCONTROLLER_H
#define MAIN_FOODCONTROLLER_H

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
#include "../model/entity/Food.h"
#include "../service/FoodService.h"

class FoodController {
private:
    using FoodControllerFunctions = std::function<void(FoodController&, const Pistache::Http::Request &req,
                                                        Pistache::Http::ResponseWriter &response)>;

public:
    FoodController();

    std::unordered_map<std::string, FoodControllerFunctions> foodRequestHandlers;

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


#endif //MAIN_FOODCONTROLLER_H
