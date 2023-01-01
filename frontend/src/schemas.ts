export interface Recipe {
    recipe_name: string;
    image_link: string;
    ingredients: string[];
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
    serving_size_grams: number;
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

export interface Meal {
    name: string;
    foods: FoodNutritionFacts[];
}

export interface BodyInfo {
    weight: number;
    weightUnit: number;
    feet: number;
    inches: number;
    centimeters: number;
    age: number;
    gender: string;
}
