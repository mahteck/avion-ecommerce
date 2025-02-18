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
            name: 'city',
            type: 'string',
            title: 'City'
        }),
        defineField({
            name: 'shippingAddress',
            type: 'string',
            title: 'Shipping Address'
        }),
        defineField({
            name: 'customer',
            type: 'reference',
            to: [{ type: 'customer' }],
            title: 'Customer',
        }),
        // defineField({
        //     name: 'user',
        //     type: 'reference',
        //     to: [{ type: 'user' }],
        //     title: 'customer',
        // }),
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
        defineField({
            name: 'status',
            type: 'string',
            title: 'Status'
        }),
    ],
};
