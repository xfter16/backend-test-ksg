import NodeCache from 'node-cache';
import { config } from '../config';
import { fetchItemsFromSkinport } from '../providers/skinport.provider';
import { Item } from '../providers/skinport.interface';

const cache = new NodeCache({ stdTTL: config.CACHE_TTL });

export const getCachedItems = async (): Promise<Item[]> => {
  const cacheKey = config.SKINPORT_CACHE_KEY;
  const cachedItems = cache.get<Item[]>(cacheKey);
  if (cachedItems) return cachedItems;

  const items = await fetchItemsFromSkinport();
  cache.set(cacheKey, items);
  return items;
};
