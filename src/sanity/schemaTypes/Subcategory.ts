import { defineField } from "sanity";

export const SubCategory = {
    name: "Subcategory",
    title: "Subcategory",
    type: "document",

    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            },
        })
    ]
}