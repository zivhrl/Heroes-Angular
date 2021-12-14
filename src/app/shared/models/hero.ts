import { Ability } from './ability';

export interface Hero {
  id: string;
  name: string;
  ability: Ability;
  startedTrainingDate: Date;
  suitColors: string;
  startingPower: number;
  currentPower: number;
  canTrain: boolean;
  lastTrainingDate: Date;
  trainingCounter: number;
}
