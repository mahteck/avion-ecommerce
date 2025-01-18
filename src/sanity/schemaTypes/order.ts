export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        { name: 'trackingNumber', type: 'string', title: 'Tracking Number' },
        {
            name: 'customer',
            type: 'reference',
            to: [{ type: 'customer' }],
            title: 'Customer',
        },
        { name: 'cartItems', type: 'array', of: [{ type: 'cartItem' }], title: 'Cart Items' },
        { name: 'total', type: 'number', title: 'Total Amount' },
    ],
};
