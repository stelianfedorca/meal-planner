'use client';

import styles from './page.module.css';
import { useState } from 'react';
import { MealPlanResponse } from '@/types/openai';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerateMeal() {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generateMeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: MealPlanResponse = await response.json();

      if (result) {
        setIsLoading(false);
        console.log('Result: ', result);
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  }
  return (
    <div className={styles.page}>
      <label>Home page</label>
      <button className={styles['button']}>Insert data into database</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button className={styles['button']} onClick={handleGenerateMeal}>
          Generate meal plan
        </button>
      )}
    </div>
  );
}
