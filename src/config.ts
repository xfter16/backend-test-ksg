import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  CACHE_TTL: Number(process.env.CACHE_TTL) || 600,
  SKINPORT_API_URL: process.env.SKINPORT_API_URL || 'https://api.skinport.com/v1/items',
  SKINPORT_APP_ID: process.env.SKINPORT_APP_ID || '730',
  SKINPORT_CURRENCY: process.env.SKINPORT_CURRENCY || 'USD',
  SKINPORT_CACHE_KEY: process.env.SKINPORT_CACHE_KEY || 'skinport-items',
};
