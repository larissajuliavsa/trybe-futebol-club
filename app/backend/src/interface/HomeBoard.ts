export interface IHomeBoard {
  name: string | undefined,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface IHomeBoardModel {
  getHomeBoard(): Promise<IHomeBoard[]>;
  getAwayBoard(): Promise<IHomeBoard[]>;
  getBoard(): Promise<IHomeBoard[]>;
}
