declare namespace API {

  type MyPageRequest = {
    page?: number;
    pageSize?: number;
  };

  type Drink = {
    drinkId?: number;
    drinkPicPath?: string;
    drinkName?: string;
    drinkPrice?: number;
    drinkHunger?: number;
    drinkMood?: number;
    drinkThirsty?: number;
    drinkEndu?: number;
    drinkExp?: number;
    drinkHealth?: number;
  }

  type DrinkPage = {
    records?: Drink[];
    count?: number;
  }

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseDrink_ = {
    code?: number;
    data?: Drink;
    message?: string;
  };

  type BaseResponseDrinkArray_ = {
    code?: number;
    data?: Drink[];
    message?: string;
  };

  type DrinkAddRequest = {
    drinkName?: string;
    drinkPicPath?: string;
    drinkPrice?: number;
    drinkHunger?: number;
    drinkMood?: number;
    drinkThirsty?: number;
    drinkEndu?: number;
    drinkExp?: number;
    drinkHealth?: number;
  };
  type DrinkUpdateRequest = {
    drinkId?: number;
    drinkName?: string;
    drinkPicPath?: string;
    drinkPrice?: number;
    drinkHunger?: number;
    drinkMood?: number;
    drinkThirsty?: number;
    drinkEndu?: number;
    drinkExp?: number;
    drinkHealth?: number;
  };
  type GetDrinkByIdUsingGetParams = {
    drinkId?: string;
  };

  type Present = {
    presentId?: number;
    presentPicPath?: string;
    presentName?: string;
    presentPrice?: number;
    presentMood?: number;
    presentExp?: number;
    presentPerformance?: number;
  }

  type PresentPage = {
    records?: Present[];
    count?: number;
  }

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponsePresent_ = {
    code?: number;
    data?: Present;
    message?: string;
  };

  type BaseResponsePresentArray_ = {
    code?: number;
    data?: Present[];
    message?: string;
  };

  type PresentAddRequest = {
    presentName?: string;
    presentPicPath?: string;
    presentPrice?: number;
    presentMood?: number;
    presentExp?: number;
    presentPerformance?: number;
  };
  type PresentUpdateRequest = {
    presentId?: number;
    presentName?: string;
    presentPicPath?: string;
    presentPrice?: number;
    presentMood?: number;
    presentExp?: number;
    presentPerformance?: number;
  };
  type GetPresentByIdUsingGetParams = {
    presentId?: string;
  };

  type Food = {
    foodId?: number;
    foodPicPath?: string;
    foodName?: string;
    foodPrice?: number;
    foodHunger?: number;
    foodMood?: number;
    foodThirsty?: number;
    foodEndu?: number;
    foodExp?: number;
    foodHealth?: number;
  }

  type FoodPage = {
    records?: Food[];
    count?: number;
  }

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseFood_ = {
    code?: number;
    data?: Food;
    message?: string;
  };

  type BaseResponseFoodArray_ = {
    code?: number;
    data?: Food[];
    message?: string;
  };

  type FoodAddRequest = {
    foodName?: string;
    foodPicPath?: string;
    foodPrice?: number;
    foodHunger?: number;R
    foodMood?: number;
    foodThirsty?: number;
    foodEndu?: number;
    foodExp?: number;
    foodHealth?: number;
  };
  type FoodUpdateRequest = {
    foodId?: number;
    foodName?: string;
    foodPicPath?: string;
    foodPrice?: number;
    foodHunger?: number;
    foodMood?: number;
    foodThirsty?: number;
    foodEndu?: number;
    foodExp?: number;
    foodHealth?: number;
  };
  type GetFoodByIdUsingGetParams = {
    foodId?: string;
  };

  type Medicine = {
    medicineId?: number;
    medicinePicPath?: string;
    medicineName?: string;
    medicinePrice?: number;
    medicineMood?: number;
    medicineEndu?: number;
    medicineExp?: number;
    medicineHealth?: number;
  }

  type MedicinePage = {
    records?: Medicine[];
    count?: number;
  }

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseMedicine_ = {
    code?: number;
    data?: Medicine;
    message?: string;
  };

  type BaseResponseMedicineArray_ = {
    code?: number;
    data?: Medicine[];
    message?: string;
  };

  type MedicineAddRequest = {
    medicineName?: string;
    medicinePicPath?: string;
    medicinePrice?: number;
    medicineMood?: number;
    medicineEndu?: number;
    medicineExp?: number;
    medicineHealth?: number;
  };
  type MedicineUpdateRequest = {
    medicineId?: number;
    medicineName?: string;
    medicinePicPath?: string;
    medicinePrice?: number;
    medicineMood?: number;
    medicineEndu?: number;
    medicineExp?: number;
    medicineHealth?: number;
  };
  type GetMedicineByIdUsingGetParams = {
    medicineId?: string;
  };

  type ChatHistory = {
    role: 'assistant' | 'user';
    content: string
  }

  type getFileNamesUsingGetParams = {
    targetFolder?: string
  }

  type llmChatRequest = {
    query: string;
    history: ChatHistory[]
  };
}
