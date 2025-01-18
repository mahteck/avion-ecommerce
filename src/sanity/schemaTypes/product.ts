export const Product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            // validation: (rule) => rule.required()  // No need for ValidationRule import
        },
        {
            name: "description",
            title: "Description",
            type: "string"
        },
        {
            name: "image",
            title: "Image",
            type: "image"
        },
        {
            name: "id",
            title: "ID",
            type: "number"
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of key features of the product',
        },
        {
            name: 'dimensions',
            title: 'Dimensions',
            type: 'object',
            fields: [
                { name: 'height', title: 'Height', type: 'string' },
                { name: 'width', title: 'Width', type: 'string' },
                { name: 'depth', title: 'Depth', type: 'string' },
            ],
            description: 'Dimensions of the product',
        },
        {
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: 'category' }]
        },
        {
            name: "price",
            title: "Price",
            type: "number"
        },
        {
            name: "tags",
            title: 'Tags',
            type: "array",
            of: [{ type: 'string' }]
        }
        , {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            },
        },
    ]
};
