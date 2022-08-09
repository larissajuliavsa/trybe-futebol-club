export interface IHomeBoard {
  name: string | undefined,
  totalPoints: string | number,
  totalGames: string | number,
  totalVictories: string | number,
  totalDraws: string | number,
  totalLosses: string | number,
  goalsFavor: string | number,
  goalsOwn: string | number,
  goalsBalance: string | number,
  efficiency: string | number,
}

export interface IHomeBoardModel {
  getHomeBoard(): Promise<IHomeBoard[]>;
}
