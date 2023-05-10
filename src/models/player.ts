import { Season } from './season';

export interface Player {
  _id?: string;
  firstName: string;
  lastName: string;
  slug?: string;
  dateOfBirth?: string;
  position?: string;
  debut?: string;
  firstGoal?: string;
  honours?: string;
  image?: string;
  aTeamApps?: number;
  aTeamGoals?: number;
  bTeamApps?: number;
  bTeamGoals?: number;
  totalApps?: number;
  totalGoals?: number;
  seasons?: [Season];
}
