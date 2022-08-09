import { ITeam } from '../interface/Team';
import { IMatch } from '../interface/Match';
import { IHomeBoard } from '../interface/HomeBoard';

const scorePoints = (matches:IMatch[]) => {
  let totalPoints = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals - each.awayTeamGoals > 0) totalPoints += 3; // somar pontos das vitórias
    if (each.homeTeamGoals === each.awayTeamGoals) totalPoints += 1; // somar pontos dos empates
    return totalPoints;
  });
  return totalPoints;
};

const scoreVictories = (matches:IMatch[]) => {
  let totalVictories = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals > each.awayTeamGoals) totalVictories += 1; // somar pontos das vitórias
    return totalVictories;
  });
  return totalVictories;
};

const scoreDraws = (matches:IMatch[]) => {
  let totalDraws = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals === each.awayTeamGoals) totalDraws += 1; // somar pontos dos empates
    return totalDraws;
  });
  return totalDraws;
};

const scoreLosses = (matches:IMatch[]) => {
  let totalLosses = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals < each.awayTeamGoals) totalLosses += 1; // somar pontos das derrotas
    return totalLosses;
  });
  return totalLosses;
};

const scoreFavor = (matches:IMatch[]) => {
  let goalsFavor = 0;
  matches.forEach((each) => {
    goalsFavor += each.homeTeamGoals;
    return goalsFavor;
  });
  return goalsFavor;
};

const scoreOwn = (matches:IMatch[]) => {
  let goalsOwn = 0;
  matches.forEach((each) => {
    goalsOwn += each.awayTeamGoals;
    return goalsOwn;
  });
  return goalsOwn;
};

const scoreBalance = (matches:IMatch[]) => {
  const favor = scoreFavor(matches);
  const own = scoreOwn(matches);
  const goalsBalance = favor - own;
  return goalsBalance;
};

const scoreEfficiency = (points:number, matches:number) => {
  const efficiency = Math.round((points * 10000) / (matches * 3)) / 100;
  return efficiency;
};

export const orderScoreBoard = (board:IHomeBoard[]) => {
  const order = board.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 0;
  });
  return order;
};

export const scoreBoard = (each:ITeam, matches:IMatch[]) => {
  const board = {
    name: each.teamName, // nome do time
    totalPoints: scorePoints(matches), // somando todos os pontos
    totalGames: matches.length, // numero de partidas como home
    totalVictories: scoreVictories(matches), // numero de vitorias do time home
    totalDraws: scoreDraws(matches), // numero de empates do time home
    totalLosses: scoreLosses(matches), // numero de derrotas do time home
    goalsFavor: scoreFavor(matches), // numero de goals do time away
    goalsOwn: scoreOwn(matches), // numero de goals do time home
    goalsBalance: scoreBalance(matches), // numero de vantagem do time home para o away
    efficiency: scoreEfficiency(scorePoints(matches), matches.length), // eficiência do time home
  };

  return board;
};
