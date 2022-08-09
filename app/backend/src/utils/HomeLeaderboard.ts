import { ITeam } from '../interface/Team';
import { IMatch } from '../interface/Match';
import { IHomeBoard } from '../interface/HomeBoard';

const scorePointsHome = (matches:IMatch[]) => {
  let totalPoints = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals - each.awayTeamGoals > 0) totalPoints += 3; // somar pontos das vitórias
    if (each.homeTeamGoals === each.awayTeamGoals) totalPoints += 1; // somar pontos dos empates
    return totalPoints;
  });
  return totalPoints;
};

const scorePointsAway = (matches:IMatch[]) => {
  let totalPoints = 0;
  matches.forEach((each) => {
    if (each.awayTeamGoals - each.homeTeamGoals > 0) totalPoints += 3; // somar pontos das vitórias
    if (each.awayTeamGoals === each.homeTeamGoals) totalPoints += 1; // somar pontos dos empates
    return totalPoints;
  });
  return totalPoints;
};

const scoreVictoriesHome = (matches:IMatch[]) => {
  let totalVictories = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals > each.awayTeamGoals) totalVictories += 1; // somar pontos das vitórias
    return totalVictories;
  });
  return totalVictories;
};

const scoreVictoriesAway = (matches:IMatch[]) => {
  let totalVictories = 0;
  matches.forEach((each) => {
    if (each.awayTeamGoals > each.homeTeamGoals) totalVictories += 1; // somar pontos das vitórias
    return totalVictories;
  });
  return totalVictories;
};

const scoreDrawsHome = (matches:IMatch[]) => {
  let totalDraws = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals === each.awayTeamGoals) totalDraws += 1; // somar pontos dos empates
    return totalDraws;
  });
  return totalDraws;
};

const scoreDrawsAway = (matches:IMatch[]) => {
  let totalDraws = 0;
  matches.forEach((each) => {
    if (each.awayTeamGoals === each.homeTeamGoals) totalDraws += 1; // somar pontos dos empates
    return totalDraws;
  });
  return totalDraws;
};

const scoreLossesHome = (matches:IMatch[]) => {
  let totalLosses = 0;
  matches.forEach((each) => {
    if (each.homeTeamGoals < each.awayTeamGoals) totalLosses += 1; // somar pontos das derrotas
    return totalLosses;
  });
  return totalLosses;
};

const scoreLossesAway = (matches:IMatch[]) => {
  let totalLosses = 0;
  matches.forEach((each) => {
    if (each.awayTeamGoals < each.homeTeamGoals) totalLosses += 1; // somar pontos das derrotas
    return totalLosses;
  });
  return totalLosses;
};

const scoreFavorHome = (matches:IMatch[]) => {
  let goalsFavor = 0;
  matches.forEach((each) => {
    goalsFavor += each.homeTeamGoals;
    return goalsFavor;
  });
  return goalsFavor;
};

const scoreFavorAway = (matches:IMatch[]) => {
  let goalsFavor = 0;
  matches.forEach((each) => {
    goalsFavor += each.awayTeamGoals;
    return goalsFavor;
  });
  return goalsFavor;
};

const scoreOwnHome = (matches:IMatch[]) => {
  let goalsOwn = 0;
  matches.forEach((each) => {
    goalsOwn += each.awayTeamGoals;
    return goalsOwn;
  });
  return goalsOwn;
};

const scoreOwnAway = (matches:IMatch[]) => {
  let goalsOwn = 0;
  matches.forEach((each) => {
    goalsOwn += each.homeTeamGoals;
    return goalsOwn;
  });
  return goalsOwn;
};

const scoreBalanceHome = (matches:IMatch[]) => {
  const favor = scoreFavorHome(matches);
  const own = scoreOwnHome(matches);
  const goalsBalance = favor - own;
  return goalsBalance;
};

const scoreBalanceAway = (matches:IMatch[]) => {
  const favor = scoreFavorAway(matches);
  const own = scoreOwnAway(matches);
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

export const scoreBoardHome = (each:ITeam, matches:IMatch[]) => {
  const board = {
    name: each.teamName, // nome do time
    totalPoints: scorePointsHome(matches), // somando todos os pontos
    totalGames: matches.length, // numero de partidas como home
    totalVictories: scoreVictoriesHome(matches), // numero de vitorias do time home
    totalDraws: scoreDrawsHome(matches), // numero de empates do time home
    totalLosses: scoreLossesHome(matches), // numero de derrotas do time home
    goalsFavor: scoreFavorHome(matches), // numero de goals do time away
    goalsOwn: scoreOwnHome(matches), // numero de goals do time home
    goalsBalance: scoreBalanceHome(matches), // numero de vantagem do time home para o away
    efficiency: scoreEfficiency(scorePointsHome(matches), matches.length), // eficiência do time home
  };

  return board;
};

export const scoreBoardAway = (each:ITeam, matches:IMatch[]) => {
  const board = {
    name: each.teamName, // nome do time
    totalPoints: scorePointsAway(matches), // somando todos os pontos
    totalGames: matches.length, // numero de partidas como home
    totalVictories: scoreVictoriesAway(matches), // numero de vitorias do time home
    totalDraws: scoreDrawsAway(matches), // numero de empates do time home
    totalLosses: scoreLossesAway(matches), // numero de derrotas do time home
    goalsFavor: scoreFavorAway(matches), // numero de goals do time away
    goalsOwn: scoreOwnAway(matches), // numero de goals do time home
    goalsBalance: scoreBalanceAway(matches), // numero de vantagem do time home para o away
    efficiency: scoreEfficiency(scorePointsAway(matches), matches.length), // eficiência do time home
  };
  return board;
};
