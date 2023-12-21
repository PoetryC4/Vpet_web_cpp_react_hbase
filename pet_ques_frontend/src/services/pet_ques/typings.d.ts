declare namespace API {

  type Drink = {
    drinkId?: string;
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
  type GetDrinkByIdUsingGetParams = {
    drinkId?: string;
  };
}
