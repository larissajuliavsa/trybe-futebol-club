import { IMatch } from './Match';

export interface IMatchBoardModel {
  getMatch(inProgress: null | boolean): Promise<IMatch[]>;
}
