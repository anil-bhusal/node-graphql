import { getRepository, In } from 'typeorm';
import { Item } from '../entities/Item';

export const itemResolvers = {
  items: async () => {
    const itemRepository = getRepository(Item);
    return await itemRepository.find();
  },

  itemById: async ({ id }: { id: number }) => {
    const itemRepository = getRepository(Item);
    return await itemRepository.findOneBy({ id });
  },

  addItem: async ({ name, description, price }: { name: string; description: string; price: number }) => {
    const itemRepository = getRepository(Item);
    const item = itemRepository.create({ name, description, price });
    return await itemRepository.save(item);
  },

  updateItem: async ({ id, name, description, price }: { id: number; name?: string; description?: string; price?: number }) => {
    const itemRepository = getRepository(Item);
    const item = await itemRepository.findOneBy({ id });
    if (!item) {
      throw new Error('Item not found');
    }
    if (name) item.name = name;
    if (description) item.description = description;
    if (price) item.price = price;
    return await itemRepository.save(item);
  },

  deleteItem: async ({ id }: { id: number }) => {
    const itemRepository = getRepository(Item);
    const result = await itemRepository.delete(id);
    return result.affected !== 0;
  }
};
