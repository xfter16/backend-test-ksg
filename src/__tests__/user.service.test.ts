import { deductBalance, getBalance } from '../services/user.service';
import * as userRepository from '../repositories/user.repository';

jest.mock('../repositories/user.repository');

describe('User Service', () => {
  it('should deduct user balance', async () => {
    const userId = 1;
    const amount = 100;
    const newBalance = 900;

    (userRepository.deductUserBalance as jest.Mock).mockResolvedValue(newBalance);
    
    const result = await deductBalance(userId, amount);
    expect(result).toBe(newBalance);
  });

  it('should get user balance', async () => {
    const userId = 1;
    const balance = 1000;

    (userRepository.getUserBalance as jest.Mock).mockResolvedValue(balance);
    
    const result = await getBalance(userId);
    expect(result).toBe(balance);
  });
});
