import { defineField } from "sanity";

export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string'
        }),
        defineField({
            name: 'password',
            title: 'Password',
            type: 'string'
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        })
    ]
};
