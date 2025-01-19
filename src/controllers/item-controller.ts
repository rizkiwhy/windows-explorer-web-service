import Elysia, { t } from "elysia";
import { ItemService } from "../services/item-service";
import { ItemFilter, ItemResponseSchema } from "../entities/item-model";
import Boom from "@hapi/boom";

export const ItemController = new Elysia()
    .group('/items', (app) =>
        app
            .get('/', async ({ query }) => {
                const filter = query as ItemFilter;
                 if (filter.fullHierarchy) {
                    const hierarchy = await ItemService.findFullHierarchy(filter);
                    return { status: 'success', data: hierarchy };
                }

                const items = await ItemService.find(filter);
                return { status: 'success', data: items };
            }, {
                query: t.Object({
                    name: t.Optional(t.String()),
                    parentId: t.Optional(t.Number()),
                    page: t.Optional(t.Number()),
                    limit: t.Optional(t.Number()),
                    fullHierarchy: t.Optional(t.Boolean()),
                }),
                response: {
                    200: t.Object({
                        status: t.String(),
                        data: t.Array(ItemResponseSchema),
                    }),
                    500: t.Object({
                        status: t.String(),
                        message: t.String(),
                    }),
                },
                detail: {
                    tags: ['Items'],
                    summary: 'Get all items (files and folders)',
                    description: 'Fetch all items, including files and folders, with optional filtering and pagination',
                },
            })
            .get('/:id', async ({ params }) => {
                const item = await ItemService.findById(params.id);
                if (!item) {
                    throw Boom.notFound('Item not found');
                }
                return { status: 'success', data: item };
            }, {
                params: t.Object({
                    id: t.Number(),
                }),
                response: {
                    200: t.Object({
                        status: t.String(),
                        data: ItemResponseSchema,
                    }),
                    404: t.Object({
                        status: t.String(),
                        message: t.String(),
                    }),
                    500: t.Object({
                        status: t.String(),
                        message: t.String(),
                    }),
                },
                detail: {
                    tags: ['Items'],
                    summary: 'Get an item by ID (folder or file)',
                    description: 'Fetch an item (folder or file) by its ID',
                },
            })
    );
