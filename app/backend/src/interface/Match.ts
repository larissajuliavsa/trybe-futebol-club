export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface IMatchModel {
  getMatch(): Promise<IMatch[]>;
  matchInProgress(match:IMatch): Promise<IMatch>;
}
