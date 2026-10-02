const { z } = require("zod");

const createUrlSchema = z.object({
    longUrl: z.string().url("Invalid URL"),

    customCode: z
        .string()
        .min(3, "Custom code must be at least 3 characters")
        .max(20, "Custom code must be at most 20 characters")
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "Custom code can only contain letters, numbers, hyphens and underscores"
        )
        .optional(),

        expiresAt: z
        .string()
        .datetime({ offset: true })
        .optional()
});

module.exports = {
    createUrlSchema
};