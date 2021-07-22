import * as mockingoose from 'mockingoose';
import { UserModel } from './UserModel';

describe('UserModel', () => {
  it('create and save', () => {
    const user1 = new UserModel({
      name: 'user1',
      email: 'example@example.com',
    });
    mockingoose(UserModel).toReturn(user1, 'save');
    return expect(user1.save()).resolves.toBe(user1);
  });
  describe('validation', () => {
    it('require email', async () => {
      const user1 = new UserModel({
        name: 'user1',
      });
      return expect(user1.save()).rejects.toThrow(
        'User validation failed: email: Path `email` is required.'
      );
    });
    it('require unique email', async () => {
      const user1 = new UserModel({
        name: 'user1',
        email: 'example@example.com',
      });
      mockingoose(UserModel).toReturn(user1, 'save');
      await user1.save();
      const user2 = new UserModel({
        name: 'user2',
        email: 'example@example.com',
      });
      mockingoose(UserModel).toReturn(1, 'countDocuments');
      return expect(user2.save()).rejects.toThrow(
        'User validation failed: email: Email already exists'
      );
    });
  });
});
