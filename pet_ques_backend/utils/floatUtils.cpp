//
// Created by clpo-2 on 12/20/23.
//

#include "FloatUtils.h"

double FloatUtils::setPrecision(double input, int prec)  {
    return std::round(input * prec) / prec;
}