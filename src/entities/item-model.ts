import { t } from "elysia"
import { Item } from "@prisma/client"

export type ItemFilter = {
    name?: string
    parentId?: number | null
    page?: number
    limit?: number
    fullHierarchy?: boolean | null
}

export type ItemResponse = {
    id: number
    title: string
    parent_id?: number | null
    type: string
    path: string | null
    created_at: string
    updated_at: string
    children?: ItemResponse[]
}

export const ItemResponseSchema = t.Object({
    id: t.Number(),
    title: t.String(),
    parent_id: t.Optional(t.Union([t.Number(), t.Null()])),
    type: t.String(),
    path: t.Optional(t.Union([t.String(), t.Null()])),
    created_at: t.String(),
    updated_at: t.String(),
    children: t.Optional(t.Array(t.Unknown())),
});

export function toItemResponse(item: Item): ItemResponse {
    const formatDate = (date: Date): string => {
        const localDateString = date.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const [datePart, timePart] = localDateString.split(', ');
        const [day, month, year] = datePart.split('/');
        
        return `${year}-${month}-${day} ${timePart}`;
    };

    return {
        id: item.id,
        title: item.name,
        parent_id: item.parentId,
        type: item.type,
        path: item.path,
        created_at: formatDate(item.createdAt),
        updated_at: formatDate(item.updatedAt),
    };
}