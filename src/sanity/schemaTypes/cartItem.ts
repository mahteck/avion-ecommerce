export default {
    name: 'cartItem',
    type: 'object',
    title: 'Cart Item',
    fields: [
        { name: 'name', type: 'string', title: 'Product Name' },
        { name: 'price', type: 'number', title: 'Price' },
        { name: 'quantity', type: 'number', title: 'Quantity' },
    ],
};
