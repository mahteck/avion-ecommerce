
export const SubCategory = {
    name: "Subcategory",
    title: "Subcategory",
    type: "document",

    fields: [
        {
            name: "name",
            title: "Name",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            },
        }
    ]
}