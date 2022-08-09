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
  matchStarted(match:IMatch): Promise<IMatch>;
  matchFinished(id:number): Promise<object | void>;
  matchUpdated(id:number, body:object): Promise<object | void>;
}
