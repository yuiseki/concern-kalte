import * as mockingoose from 'mockingoose';
import { SolutionModel } from './SolutionModel';
import { TeamModel } from './TeamModel';
import { UserModel } from './UserModel';

describe('TeamModel', () => {
  describe('save', () => {
    it('正常にsaveできること', () => {
      const team1 = new TeamModel({
        name: 'team1',
      });
      mockingoose(TeamModel).toReturn(team1, 'save');
      return expect(team1.save()).resolves.toBe(team1);
    });
  });
  describe('relationship', () => {
    it('ユーザーが追加できること', () => {
      const user1 = new UserModel({
        name: 'user1',
        email: 'example@example.com',
        password: 'test',
      });
      const teamWithUsers = new TeamModel({
        name: 'teamWithUsers',
        users: [user1],
      });
      mockingoose(TeamModel).toReturn(teamWithUsers, 'save');
      expect(teamWithUsers.users[0].name).toMatch('user1');
    });
  });
  describe('solutions', () => {
    it('ソリューションが追加できること', () => {
      const solution1 = new SolutionModel({
        name: 'solution1',
      });
      const teamWithSolution = new TeamModel({
        name: 'teamWithSolution',
        solutions: [solution1],
      });
      mockingoose(TeamModel).toReturn(teamWithSolution, 'save');
      expect(teamWithSolution.solutions[0].name).toMatch('solution1');
    });
  });
});
