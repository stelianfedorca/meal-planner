export enum Gender {
  Male = 0,
  Female = 1,
}

export const GenderLabels: Record<Gender, string> = {
  [Gender.Male]: 'Male',
  [Gender.Female]: 'Female',
};
