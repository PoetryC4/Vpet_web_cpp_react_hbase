//
// Created by clpo on 1/19/24.
//

#ifndef MAIN_OTHERINTERACTIONCONTROLLER_H
#define MAIN_OTHERINTERACTIONCONTROLLER_H

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

class OtherInteractionController {
private:
    using OtherInteractionControllerFunctions = std::function<void(OtherInteractionController&, const Pistache::Http::Request &req,
                                                           Pistache::Http::ResponseWriter &response)>;

public:
    OtherInteractionController();

    std::unordered_map<std::string, OtherInteractionControllerFunctions> otherInteractionRequestHandlers;

    void getFileNames(const Pistache::Http::Request &req,
                 Pistache::Http::ResponseWriter &response);

    void chatWithLlm(const Pistache::Http::Request &req,
                Pistache::Http::ResponseWriter &response);
};


#endif //MAIN_OTHERINTERACTIONCONTROLLER_H
