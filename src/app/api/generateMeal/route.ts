import { openai } from '@/config';
import { MealPlan } from '@/types/MealPlan';
import { NextResponse } from 'next/server';

async function generateMeal(): Promise<MealPlan> {
  const prompt = `
  I want you to act as my personal nutritionist.
  I will tell you about my dietary preferences, allergies, my BMI, gender and target and my daily caloric intake, and you will suggest a meal plan for me in order to reach my target and satisfy my calories. You should only reply with the meal plan you recommend, including the quantities and the nutritional facts of each meal, and nothing else.
  The meal plan will consists of breakfast, lunch, dinner and a snack
  Here are some constraints and penalties for this task:
- If the total calories for any day are too high or too low according to the criteria based on the person's input goal then deduct 10 points from your final score.
- If any row has empty values then deduct 5 points from your final score.
- If any column name is modified then deduct 5 points from your final score.
- 

Your final score should be as high as possible. My first request is: 'BMI: ${23.8}; Preferences: ${''}; Allergies: ${''}; Gender: ${`male`}; Goal: ${`gain`} weight; Calories: ${2700}' 
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'meal_plan',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            total_calories: {
              type: 'number',
              description: 'Total calorie count for the meal plan for the day.',
            },
            total_macronutrients: {
              type: 'object',
              properties: {
                carbohydrates: {
                  type: 'number',
                  description: 'Total carbohydrates in grams.',
                },
                proteins: {
                  type: 'number',
                  description: 'Total proteins in grams.',
                },
                fats: {
                  type: 'number',
                  description: 'Total fats in grams.',
                },
              },
              required: ['carbohydrates', 'proteins', 'fats'],
              additionalProperties: false,
            },
            meals: {
              type: 'array',
              description: 'List of meals in the meal plan.',
              items: {
                type: 'object',
                properties: {
                  meal_name: {
                    type: 'string',
                    description:
                      'The name of the meal (e.g., breakfast, lunch, dinner).',
                  },
                  nutritional_informations: {
                    type: 'object',
                    properties: {
                      calories: {
                        type: 'number',
                        description: 'Calorie count for this meal.',
                      },
                      macronutrients: {
                        type: 'object',
                        properties: {
                          carbohydrates: {
                            type: 'number',
                            description:
                              'Carbohydrates in grams for this meal.',
                          },
                          proteins: {
                            type: 'number',
                            description: 'Proteins in grams for this meal.',
                          },
                          fats: {
                            type: 'number',
                            description: 'Fats in grams for this meal.',
                          },
                        },
                        required: ['carbohydrates', 'proteins', 'fats'],
                        additionalProperties: false,
                      },
                    },
                    required: ['calories', 'macronutrients'],
                    additionalProperties: false,
                  },
                  foods: {
                    type: 'array',
                    description: 'List of foods included in the meal.',
                    items: {
                      type: 'object',
                      properties: {
                        food_name: {
                          type: 'string',
                          description: 'The name of the food item.',
                        },
                        quantity: {
                          type: 'string',
                          description:
                            "The quantity of the food item in European format (e.g., '200 g', '1.5 L').",
                        },
                      },
                      required: ['food_name', 'quantity'],
                      additionalProperties: false,
                    },
                  },
                },
                required: ['meal_name', 'nutritional_informations', 'foods'],
                additionalProperties: false,
              },
            },
          },
          required: ['total_calories', 'total_macronutrients', 'meals'],
          additionalProperties: false,
        },
      },
    },
  });

  return JSON.parse(response.choices[0].message.content ?? '') as MealPlan;
}

export async function POST() {
  try {
    const mealPlan: MealPlan = await generateMeal();
    return NextResponse.json(mealPlan);
  } catch (error) {
    let errorMessage = 'unknown error occured';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: 'Error generating meal plan: ', error: errorMessage },
      { status: 500 }
    );
  }
}
