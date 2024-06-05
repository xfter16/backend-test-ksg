import { query, getClient } from '../db';

export const getUserById = async (userId: number) => {
  const result = await query('SELECT balance FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

export const deductUserBalance = async (userId: number, amount: number) => {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    const queryText = `
      UPDATE users
      SET balance = balance - $1
      WHERE id = $2 AND balance >= $1
      RETURNING balance;
    `;
    
    const { rows } = await client.query(queryText, [amount, userId]);
    if (rows.length === 0) {
      throw new Error('Insufficient balance or user not found');
    }

    await client.query('COMMIT');
    return rows[0].balance;
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
