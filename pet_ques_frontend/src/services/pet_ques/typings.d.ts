declare namespace API {

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
  type DrinkPageRequest = {
    page?: number;
    pageSize?: number;
  };
  type GetDrinkByIdUsingGetParams = {
    drinkId?: string;
  };
}
