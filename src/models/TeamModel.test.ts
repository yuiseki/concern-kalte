import * as mockingoose from 'mockingoose'
import { TeamModel } from './TeamModel'
import { UserModel } from './UserModel'

describe('TeamModel', () => {
  describe('save', () => {
    it('正常にsaveできること', () => {
      const team1 = new TeamModel({
        name: 'team1'
      })
      mockingoose(TeamModel).toReturn(team1, 'save')
      return expect(team1.save()).resolves.toBe(team1)
    })
    it('ユーザーが追加できること', async () => {
      const user1 = new UserModel({
        name: 'user1',
        email: 'example@example.com',
        password: 'test',
      })
      const team1 = new TeamModel({
        name: 'team1',
        users: [user1],
      })
      mockingoose(TeamModel).toReturn(team1, 'save')
      expect(team1.save()).resolves.toBe(team1)
      expect(team1.users[0].name).toMatch('user1')
    })
  })
})