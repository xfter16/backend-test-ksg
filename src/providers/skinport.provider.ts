import axios from 'axios';
import { config } from '../config';
import { SkinportItem, Item } from './skinport.interface';

const fetchItems = async (tradable: boolean): Promise<Item[]> => {
  const response = await axios.get<SkinportItem[]>(config.SKINPORT_API_URL, {
    params: {
      app_id: config.SKINPORT_APP_ID,
      currency: config.SKINPORT_CURRENCY,
      tradable: tradable ? 1 : 0
    }
  });

  return response.data.map((item: SkinportItem) => ({
    ...item,
    tradable_price: tradable ? item.min_price : null,
    non_tradable_price: !tradable ? item.min_price : null
  }));
};

export const fetchItemsFromSkinport = async (): Promise<Item[]> => {
  const tradableItems = await fetchItems(true);
  const nonTradableItems = await fetchItems(false);

  const itemsMap = new Map<string, Item>();

  tradableItems.forEach(item => {
    itemsMap.set(item.market_hash_name, item);
  });

  nonTradableItems.forEach(item => {
    if (itemsMap.has(item.market_hash_name)) {
      const existingItem = itemsMap.get(item.market_hash_name);
      existingItem!.non_tradable_price = item.non_tradable_price;
    } else {
      itemsMap.set(item.market_hash_name, item);
    }
  });

  return Array.from(itemsMap.values());
};
