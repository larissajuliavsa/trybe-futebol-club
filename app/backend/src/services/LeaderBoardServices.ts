import {
  scoreBoardHome,
  orderScoreBoard,
  scoreBoardAway,
  scoreBoard,
} from '../utils/HomeLeaderboard';
import { IHomeBoard, IHomeBoardModel } from '../interface/HomeBoard';
import { ITeamModel } from '../interface/Team';
import { IMatchBoardModel } from '../interface/MatchBoard';

export default class LeaderboardService implements IHomeBoardModel {
  constructor(
    private matchRepository: IMatchBoardModel,
    private teamRepository: ITeamModel,
  ) {
    this.matchRepository = matchRepository;
    this.teamRepository = teamRepository;
  }

  public async getHomeBoard(): Promise<IHomeBoard[]> {
    const allMatches = await this.matchRepository.getMatch(false);
    const allTeams = await this.teamRepository.getTeam();

    const homeScoreboard = allTeams.map((eachTeam) => {
      const matches = allMatches.filter(
        (match) => match.homeTeam === eachTeam.id,
      );
      return scoreBoardHome(eachTeam, matches);
    });

    const order = orderScoreBoard(homeScoreboard);
    return order;
  }

  public async getAwayBoard(): Promise<IHomeBoard[]> {
    const allMatches = await this.matchRepository.getMatch(false);
    const allTeams = await this.teamRepository.getTeam();

    const awayScoreboard = allTeams.map((eachTeam) => {
      const matches = allMatches.filter(
        (match) => match.awayTeam === eachTeam.id,
      );
      return scoreBoardAway(eachTeam, matches);
    });

    const order = orderScoreBoard(awayScoreboard);
    return order;
  }

  public async getBoard(): Promise<IHomeBoard[]> {
    const allMatches = await this.matchRepository.getMatch(false);
    const allTeams = await this.teamRepository.getTeam();

    const scoreboard = allTeams.map((eachTeam) => {
      const home = allMatches.filter(
        (match) => match.homeTeam === eachTeam.id,
      );
      // filtrando cada team em que está atuando como home nas partidas

      const away = allMatches.filter(
        (match) => match.awayTeam === eachTeam.id,
      );
      // filtrando cada team em que está atuando como away nas partidas
      const boardHome = scoreBoardHome(eachTeam, home);
      const boardAway = scoreBoardAway(eachTeam, away);

      return scoreBoard(eachTeam, boardHome, boardAway);
      //
      // estou enviando cada team e os scoreboards de home e away para scoreBoard
      // onde vai gerar o objeto com a classificação final dos pontos
    });

    const order = orderScoreBoard(scoreboard);
    return order;
  }
}

/*
  Em homeScoreboard, estou pegando cada team e filtrando somente os que estejam atuando como home nas suas partidas (na const matches),
  estou retornando com a função scoreBoard() em que recebe cada team e as partidas em que eles atuaram como home.

  Para conseguir estruturar o placar somente com as partidas concluídas, usei a dica que os mentores Pedro Carvalho e Rafael Medeiros deram:
  Na query de getMatch onde retorna todas as partidas, devo passar inProgress como parametro (true ou false)
  para ter controle de quando eu quiser somente as partidas concluídas ou em andamento;
  Obrigada! <3
*/
