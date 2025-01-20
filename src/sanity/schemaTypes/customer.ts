import { defineField } from "sanity";

export default {
    name: 'customer',
    type: 'document',
    title: 'Customer',
    fields: [
        defineField({ name: 'name', type: 'string', title: 'Name' }),
        defineField({ name: 'email', type: 'string', title: 'Email' }),
        defineField({ name: 'phone', type: 'string', title: 'Phone Number' }),
    ],
};
