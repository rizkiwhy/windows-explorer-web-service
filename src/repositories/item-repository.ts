import { prismaClient } from "../utils/database/database";
import { ItemFilter } from "../entities/item-model";

export class ItemRepository {
    static async find(filter: ItemFilter): Promise<any[]> {
        const { name, parentId, page = 1, limit = 10, fullHierarchy = false } = filter;
        const offset = (page - 1) * limit;
    
        const items = await prismaClient.item.findMany({
            where: {
                parentId: parentId ?? null,
                name: name ? { contains: name } : undefined,
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: fullHierarchy ? {
                children: true,
            } : {},
        });

        return items.map((item: { 
            id: number, 
            name: string, 
            parentId: number | null, 
            type: string, 
            createdAt: Date, 
            updatedAt: Date, 
            children?: any[] 
        }) => {
            const result: any = {
                ...item,
            };
    
            if (item.type === 'file') {
                delete result.children
            } else if (fullHierarchy && item.children) {
                result.children = item.children
            } else {
                result.children = []
            }
    
            return result;
        });    
    }    

    static async findById(id: number): Promise<any | null> {
        return await prismaClient.item.findUnique({
            where: {
                id,
            },
        });
    }
}
