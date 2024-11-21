export enum ActivityLevel {
  Sedentary = 'Sedentary',
  LightlyActive = 'Lightly Active',
  ModeratelyActive = 'Moderately Active',
  VeryActive = 'Very Active',
}

export const ActivityLevelLabels = {
  [ActivityLevel.Sedentary]: 'Sedentary (Little to no exercise)',
  [ActivityLevel.LightlyActive]:
    'Lightly Active (Light exercise 1-3 days/week)',
  [ActivityLevel.ModeratelyActive]:
    'Moderately Active (Moderate exercise 3-5 days/week)',
  [ActivityLevel.VeryActive]: 'Very Active (Hard exercise 6-7 days/week)',
};

export const activityLevels = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
];
