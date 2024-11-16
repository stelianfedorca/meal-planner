'use client';

import { MealPlan } from '@/types/MealPlan';
import styles from './page.module.css';
import { useState } from 'react';

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

      const result: MealPlan = await response.json();

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
