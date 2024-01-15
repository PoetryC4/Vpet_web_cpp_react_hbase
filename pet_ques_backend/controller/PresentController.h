//
// Created by clpo on 1/14/24.
//

#ifndef MAIN_PRESENTCONTROLLER_H
#define MAIN_PRESENTCONTROLLER_H


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
#include "../model/entity/Present.h"
#include "../service/PresentService.h"

class PresentController {
private:
    using PresentControllerFunctions = std::function<void(PresentController&, const Pistache::Http::Request &req,
                                                           Pistache::Http::ResponseWriter &response)>;

public:
    PresentController();

    std::unordered_map<std::string, PresentControllerFunctions> presentRequestHandlers;

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


#endif //MAIN_PRESENTCONTROLLER_H
