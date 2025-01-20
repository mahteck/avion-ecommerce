import { defineField } from "sanity";

export const Product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
            description: 'Detailed description of the product',
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "id",
            title: "ID",
            type: "number"
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of key features of the product',
        }),
        defineField({
            name: 'dimensions',
            title: 'Dimensions',
            type: 'object',
            fields: [
                { name: 'height', title: 'Height', type: 'string' },
                { name: 'width', title: 'Width', type: 'string' },
                { name: 'depth', title: 'Depth', type: 'string' },
            ],
            description: 'Dimensions of the product',
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: 'category' }]
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: "tags",
            title: 'Tags',
            type: "array",
            of: [{ type: 'string' }]
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            },
            validation: (rule) => rule.required(),
        }),
    ]
};
