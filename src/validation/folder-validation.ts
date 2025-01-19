import { z, ZodType } from "zod";

export class FolderValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1, { message: "Folder name is required" }).max(255, { message: "Folder name must be less than 255 characters" }),
        parent_id: z.number().nullable().optional()
    })
}
