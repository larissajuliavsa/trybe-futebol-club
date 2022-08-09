import { scoreBoard, orderScoreBoard } from '../utils/HomeLeaderboard';
import { IHomeBoard, IHomeBoardModel } from '../interface/HomeBoard';
import { IMatchModel } from '../interface/Match';
import { ITeamModel } from '../interface/Team';

export default class LeaderboardService implements IHomeBoardModel {
  constructor(private matchRepository: IMatchModel, private teamRepository: ITeamModel) {
    this.matchRepository = matchRepository;
    this.teamRepository = teamRepository;
  }

  public async getHomeBoard():Promise<IHomeBoard[]> {
    const allMatches = await this.matchRepository.getMatch(false);
    const allTeams = await this.teamRepository.getTeam();

    const homeScoreboard = allTeams.map((eachTeam) => {
      const matches = allMatches.filter((match) => match.homeTeam === eachTeam.id);
      return scoreBoard(eachTeam, matches);
    });

    const order = orderScoreBoard(homeScoreboard);
    return order;
  }
}
// Em homeScoreboard, estou pegando cada team e filtrando somente os que estejam atuando como home nas suas partidas (na const matches),
// estou retornando com a função scoreBoard() em que recebe cada team e as partidas em que eles atuaram como home.
//
// Para conseguir estruturar o placar somente com as partidas concluídas, usei a dica que os mentores Pedro Carvalho e Rafael Medeiros deram:
// Na query de getMatch onde retorna todas as partidas, devo passar inProgress como parametro (true ou false)
// para ter controle de quando eu quiser somente as partidas concluídas ou em andamento;
// Obrigada! <3
