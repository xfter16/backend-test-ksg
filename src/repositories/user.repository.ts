import { query, getClient } from '../db';

export const getUserById = async (userId: number) => {
  const result = await query('SELECT balance FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

export const updateUserBalance = async (userId: number, newBalance: number) => {
  await query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, userId]);
};

export const deductUserBalance = async (userId: number, amount: number) => {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query('SELECT balance FROM users WHERE id = $1', [userId]);
    if (rows.length === 0) throw new Error('User not found');

    const user = rows[0];
    if (user.balance < amount) throw new Error('Insufficient balance');

    const newBalance = user.balance - amount;
    await client.query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, userId]);
    await client.query('COMMIT');
    return newBalance;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const getUserBalance = async (userId: number) => {
  const result = await query('SELECT balance FROM users WHERE id = $1', [userId]);
  if (result.rows.length === 0) throw new Error('User not found');
  return result.rows[0].balance;
};
