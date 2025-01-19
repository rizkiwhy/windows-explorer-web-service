import { ItemRepository } from "../repositories/item-repository";
import { ItemFilter, ItemResponse, toItemResponse } from "../entities/item-model";

export class ItemService {
    static async find(filter: ItemFilter): Promise<ItemResponse[]> {
        const items = await ItemRepository.find(filter);
        return items.map(toItemResponse);
    }

    static async findById(id: number): Promise<ItemResponse | null> {
        const item = await ItemRepository.findById(id);
        return item ? toItemResponse(item) : null;
    }

    static async findFullHierarchy(filter: ItemFilter): Promise<ItemResponse[]> {
        const rootItems = await ItemRepository.find({ ...filter, parentId: filter.parentId || null });
    
        const buildHierarchy = async (item: any): Promise<ItemResponse> => {
            const children = await ItemRepository.find({ parentId: item.id });
    
            const itemResponse: ItemResponse = {
                ...toItemResponse(item),
                ...(item.type !== 'file' ? { children: await Promise.all(children.map(buildHierarchy)) } : {}),
            };
    
            return itemResponse;
        };
    
        return Promise.all(rootItems.map(buildHierarchy));
    }
}
