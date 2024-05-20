import { getItems } from '../services/item.service';
import * as itemRepository from '../repositories/item.repository';

jest.mock('../repositories/item.repository');

describe('Item Service', () => {
  it('should fetch cached items', async () => {
    const mockItems = [
      {
        market_hash_name: "AK-47 | Aquamarine Revenge (Battle-Scarred)",
        tradable_price: 10.0,
        non_tradable_price: 12.0
      },
    ];
    (itemRepository.getCachedItems as jest.Mock).mockResolvedValue(mockItems);
    
    const items = await getItems();
    expect(items).toEqual(mockItems);
  });
});
