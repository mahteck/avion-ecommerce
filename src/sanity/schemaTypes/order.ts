import { defineField } from "sanity";

export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        defineField({
            name: 'trackingNumber',
            type: 'string',
            title: 'Tracking Number'
        }),
        defineField({
            name: 'customer',
            type: 'reference',
            to: [{ type: 'customer' }],
            title: 'Customer',
        }),
        defineField({
            name: 'cartItems',
            type: 'array',
            title: 'Cart Items',
            of: [{ type: 'cartItem' }]
        }),
        defineField({
            name: 'total',
            type: 'number',
            title: 'Total Amount'
        }),
    ],
};
