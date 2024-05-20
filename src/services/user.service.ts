import { deductUserBalance, getUserBalance } from '../repositories/user.repository';

export const deductBalance = async (userId: number, amount: number) => deductUserBalance(userId, amount);

export const getBalance = async (userId: number) => getUserBalance(userId);
