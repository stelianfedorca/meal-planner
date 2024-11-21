'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import styles from './page.module.scss';
import { Input } from '@/components/ui/input';
import React from 'react';
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
import { ActivityLevel, activityLevels } from '@/types/ActivityLevels';

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
  activityLevel: z.nativeEnum(ActivityLevel),
});

export default function CreatePlansPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: defaultAge,
      height: defaultHeight,
      weight: defaultWeight,
      gender: Gender.Male,
      activityLevel: ActivityLevel.Sedentary,
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
              <CardContent className="border-rose-500 flex flex-col gap-2 md:flex-row">
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
                    <FormItem className="border">
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
              </CardContent>
              <CardContent>
                <FormField
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="gender">Gender</FormLabel>
                      <FormControl>
                        <Select
                          value={GenderLabels[field.value]}
                          onValueChange={field.onChange}
                          defaultValue={GenderLabels[field.value]}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              key={'Male'}
                              value={GenderLabels[Gender.Male]}
                            >
                              {GenderLabels[Gender.Male]}
                            </SelectItem>
                            <SelectItem
                              key={'Female'}
                              value={GenderLabels[Gender.Female]}
                            >
                              {GenderLabels[Gender.Female]}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="activityLevel"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="activityLevel">
                          Activity Level
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Activity Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {activityLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    );
                  }}
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
