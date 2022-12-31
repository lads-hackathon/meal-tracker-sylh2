export interface VitaminFacts {
    name: string;
    amount: number;
    unit: string;
}

export interface NutritionFacts {
    calories: number;
    total_fat_grams: number;
    saturated_fat_grams: number;
    cholesterol_milligrams: number,
    sodium_milligrams: number;
    total_carb_grams: number;
    dietary_fiber_grams: number;
    sugars_grams: number;
    proteins_grams: number;
}

export interface FoodGeneralInfo {
    name: string;
    group: string;
    subgroup: string;
    description: string;
    image: string;
}

export interface FoodNutritionFacts {
    name: string;
    info: FoodGeneralInfo;
    nutrition: NutritionFacts;
}
