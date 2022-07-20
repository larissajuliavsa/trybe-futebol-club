export interface ITeam {
  id?: number;
  teamName?: string;
}

export interface ITeamModel {
  getTeam(): Promise<ITeam[]>;
  getTeamId(id:number): Promise<ITeam>;
}
