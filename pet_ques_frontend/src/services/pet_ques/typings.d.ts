declare namespace API {

    type MyPageRequest = {
        page?: number;
        page_size?: number;
    };

    type Drink = {
        drink_id?: number;
        drink_pic_path?: string;
        drink_name?: string;
        drink_price?: number;
        drink_hunger?: number;
        drink_mood?: number;
        drink_thirsty?: number;
        drink_endu?: number;
        drink_exp?: number;
        drink_health?: number;
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
        drink_name?: string;
        drink_pic_path?: string;
        drink_price?: number;
        drink_hunger?: number;
        drink_mood?: number;
        drink_thirsty?: number;
        drink_endu?: number;
        drink_exp?: number;
        drink_health?: number;
    };
    type DrinkUpdateRequest = {
        drink_id?: number;
        drink_name?: string;
        drink_pic_path?: string;
        drink_price?: number;
        drink_hunger?: number;
        drink_mood?: number;
        drink_thirsty?: number;
        drink_endu?: number;
        drink_exp?: number;
        drink_health?: number;
    };
    type GetDrinkByIdUsingGetParams = {
        drink_id?: string;
    };

    type Present = {
        present_id?: number;
        present_pic_path?: string;
        present_name?: string;
        present_price?: number;
        present_mood?: number;
        present_exp?: number;
        present_performance?: number;
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
        present_name?: string;
        present_pic_path?: string;
        present_price?: number;
        present_mood?: number;
        present_exp?: number;
        present_performance?: number;
    };
    type PresentUpdateRequest = {
        present_id?: number;
        present_name?: string;
        present_pic_path?: string;
        present_price?: number;
        present_mood?: number;
        present_exp?: number;
        present_performance?: number;
    };
    type GetPresentByIdUsingGetParams = {
        present_id?: string;
    };

    type Food = {
        food_id?: number;
        food_pic_path?: string;
        food_name?: string;
        food_price?: number;
        food_hunger?: number;
        food_mood?: number;
        food_thirsty?: number;
        food_endu?: number;
        food_exp?: number;
        food_health?: number;
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
        food_name?: string;
        food_pic_path?: string;
        food_price?: number;
        food_hunger?: number; R
        food_mood?: number;
        food_thirsty?: number;
        food_endu?: number;
        food_exp?: number;
        food_health?: number;
    };
    type FoodUpdateRequest = {
        food_id?: number;
        food_name?: string;
        food_pic_path?: string;
        food_price?: number;
        food_hunger?: number;
        food_mood?: number;
        food_thirsty?: number;
        food_endu?: number;
        food_exp?: number;
        food_health?: number;
    };
    type GetFoodByIdUsingGetParams = {
        food_id?: string;
    };

    type Medicine = {
        medicine_id?: number;
        medicine_pic_path?: string;
        medicine_name?: string;
        medicine_price?: number;
        medicine_mood?: number;
        medicine_endu?: number;
        medicine_exp?: number;
        medicine_health?: number;
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
        medicine_name?: string;
        medicine_pic_path?: string;
        medicine_price?: number;
        medicine_mood?: number;
        medicine_endu?: number;
        medicine_exp?: number;
        medicine_health?: number;
    };
    type MedicineUpdateRequest = {
        medicine_id?: number;
        medicine_name?: string;
        medicine_pic_path?: string;
        medicine_price?: number;
        medicine_mood?: number;
        medicine_endu?: number;
        medicine_exp?: number;
        medicine_health?: number;
    };
    type GetMedicineByIdUsingGetParams = {
        medicine_id?: string;
    };

    type ChatHistory = {
        role: 'assistant' | 'user';
        content: string
    }

    type getFileNamesUsingGetParams = {
        target_folder?: string
    }

    type llmChatRequest = {
        query: string;
        user_id: number;
        conversation_id: number;
    };

    type BaseResponseString_ = {
        code: number;
        msg: string;
        data: string;
    }

    type BaseResponseStringArray_ = {
        code: number;
        msg: string;
        data: string[];
    }

    type BaseResponseDrinkPage_ = {
        code: number;
        msg: string;
        data: DrinkPage;
    }

    type BaseResponseDrink_ = {
        code: number;
        msg: string;
        data: Drink;
    }

    type BaseResponseDrinkArray_ = {
        code: number;
        msg: string;
        data: Drink[];
    }

    type BaseResponseFoodPage_ = {
        code: number;
        msg: string;
        data: FoodPage;
    }

    type BaseResponseFood_ = {
        code: number;
        msg: string;
        data: Food;
    }

    type BaseResponseFoodArray_ = {
        code: number;
        msg: string;
        data: Food[];
    }

    type BaseResponseMedicinePage_ = {
        code: number;
        msg: string;
        data: MedicinePage;
    }

    type BaseResponseMedicine_ = {
        code: number;
        msg: string;
        data: Medicine;
    }

    type BaseResponseMedicineArray_ = {
        code: number;
        msg: string;
        data: Medicine[];
    }

    type BaseResponsePresentPage_ = {
        code: number;
        msg: string;
        data: PresentPage;
    }

    type BaseResponsePresent_ = {
        code: number;
        msg: string;
        data: Present;
    }

    type BaseResponsePresentArray_ = {
        code: number;
        msg: string;
        data: Present[];
    }
}
