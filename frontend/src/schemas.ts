export interface VitaminFacts {
    name: string;
    amount: number;
    unit: string;
}

export interface NutritionFacts {
    calories: number;
    total_fat_grams: number;
    saturated_fat_grams: number;
    trans_fat_grams: number;
    cholesterol_milligrams: number,
    sodium_milligrams: number;
    total_carb_grams: number;
    dietary_fiber_grams: number;
    sugars_grams: number;
    proteins_grams: number;
    vitamins: VitaminFacts[];
}

export interface FoodNutritionFacts {
    name: string;
    nutrition: NutritionFacts;
}
