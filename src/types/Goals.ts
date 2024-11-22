export enum Goals {
  LoseWeight = 'Lose Weight',
  MaintainWeight = 'Maintain Weight',
  GainWeight = 'Gain Weight',
}

export const goalOptions = Object.values(Goals) as string[];
