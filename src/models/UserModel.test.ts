import * as mockingoose from 'mockingoose';
import { UserModel } from './UserModel';

describe('UserModel', () => {
  describe('save', () => {
    it('正常にsaveできること', () => {
      const user1 = new UserModel({
        name: 'user1',
        email: 'example@example.com',
        password: 'test',
      });
      mockingoose(UserModel).toReturn(user1, 'save');
      return expect(user1.save()).resolves.toBe(user1);
    });
    it('passwordがbcryptで暗号化されていて元のパスワードが検証できること', async () => {
      const user1 = new UserModel({
        name: 'user1',
        email: 'example@example.com',
        password: 'test',
      });
      mockingoose(UserModel).toReturn(null, 'save');
      const user = await user1.save();
      expect(user.password).toMatch(/^\$2a\$10.*/);
      const result = await user.comparePassword('test');
      expect(result).toBe(true);
    });
  });
  describe('validation', () => {
    it('emailは必須', async () => {
      const user1 = new UserModel({
        name: 'user1',
        password: 'test',
      });
      return expect(user1.save()).rejects.toThrow(
        'User validation failed: email: Path `email` is required.'
      );
    });
    it('passwordは必須', async () => {
      const user1 = new UserModel({
        name: 'user1',
        email: 'example@example.com',
      });
      return expect(user1.save()).rejects.toThrow(
        'User validation failed: password: Path `password` is required.'
      );
    });
    it('emailはユニークでなければならない', async () => {
      const user1 = new UserModel({
        name: 'user1',
        email: 'example@example.com',
        password: 'test',
      });
      mockingoose(UserModel).toReturn(user1, 'save');
      await user1.save();
      const user2 = new UserModel({
        name: 'user2',
        email: 'example@example.com',
        password: 'test',
      });
      mockingoose(UserModel).toReturn(1, 'countDocuments');
      return expect(user2.save()).rejects.toThrow(
        'User validation failed: email: Email already exists'
      );
    });
  });
});
