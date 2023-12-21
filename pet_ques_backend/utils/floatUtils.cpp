//
// Created by clpo-2 on 12/20/23.
//

#include "floatUtils.h"

double floatUtils::setPrecision(double input, int prec)  {
    double div = 1;
    for (int i = 0; i < prec; ++i) {
        input*=10;
    }
    return std::round(input * div) / div;
}