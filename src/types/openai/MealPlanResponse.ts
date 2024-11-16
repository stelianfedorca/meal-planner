type Macronutrients = {
  carbohydrates: number;
  proteins: number;
  fats: number;
};

type NutritionalInformations = {
  calories: number;
  macronutrients: Macronutrients;
};

type Food = {
  food_name: string;
  quantity: string;
};

type Meal = {
  meal_name: string;
  nutritional_informations: NutritionalInformations;
  foods: Food[];
};

export type MealPlanResponse = {
  total_calories: number;
  total_macronutrients: Macronutrients;
  meals: Meal[];
};
