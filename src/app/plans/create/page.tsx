'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import styles from './page.module.scss';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { DropdownMenu } from '@/ui/DropdownMenu/DropdownMenu';
import { Button } from '@/components/ui/button';
import { Gender, GenderLabels } from '@/types/Gender';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fields } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';

const defaultAge = 24;
const minAge = 10;
const maxAge = 100;

// measured in cm
const defaultHeight = 160;
const minHeight = 100;
const maxHeight = 300;

// measured in kg
const defaultWeight = 70;
const minWeight = 30;
const maxWeight = 500;

const formSchema = z.object({
  age: z
    .number()
    .min(minAge, { message: `Age must be at least ${minAge}` })
    .max(maxAge, {
      message: `Age must be ${maxAge} or below`,
    }),
  gender: z.nativeEnum(Gender),
  height: z
    .number()
    .min(minHeight, { message: `Height must be at least ${minHeight}` })
    .max(maxHeight, { message: `Height must be ${maxHeight} or below` }),
  weight: z
    .number()
    .min(minWeight, { message: `Weight must be at least ${minWeight}` })
    .max(maxWeight, { message: `Weight must be ${maxWeight} or below` })
    .nullable(),
});

export default function CreatePlansPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: defaultAge,
      height: defaultHeight,
      weight: defaultWeight,
      gender: Gender.Male,
    },
  });

  const { setError } = form;

  function handleInputNumberChange(callback: (value: number | null) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        callback(null);
      } else {
        callback(Number(event.target.value));
      }
    };
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.weight === null) {
      setError('weight', {
        message: 'Please enter a valid value',
        type: 'manual',
      });

      return;
    }
    console.log('values: ', { ...values, gender: GenderLabels[values.gender] });
  }

  return (
    <div className={styles.container}>
      <section className={styles['card-wrapper']}>
        <Card>
          <CardHeader>
            <CardTitle>Create Your Personalized Meal Plan</CardTitle>
            <CardDescription>
              We just need some basic information about you to create a meal
              plan tailored specifically for your needs.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="border-rose-500 flex flex-col md:flex-row">
                <FormField
                  name="age"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <FormControl>
                        <Input
                          id="age"
                          {...field}
                          type="number"
                          onChange={handleInputNumberChange(field.onChange)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="height"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="height">Height</FormLabel>
                      <FormControl>
                        <Input
                          id="height"
                          {...field}
                          type="number"
                          onChange={handleInputNumberChange(field.onChange)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="weight"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="mb-5 border">
                      <FormLabel htmlFor="weight">Weight</FormLabel>
                      <FormControl>
                        <Input
                          id="weight"
                          {...field}
                          value={field.value ?? ''} // Convert null to an empty string
                          type="number"
                          onChange={handleInputNumberChange(field.onChange)}
                        />
                      </FormControl>
                      {/* Display error message if it exists */}
                      {fieldState.error && (
                        <p className="text-red-600 absolute mt-0">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="gender">Gender</FormLabel>
                      <FormControl>
                        <DropdownMenu
                          {...field}
                          onOptionSelect={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            field.onChange(
                              Number(event.target.value) as Gender
                            );
                          }}
                          option={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-rose-500">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </section>
    </div>
  );
}
