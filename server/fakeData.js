const fakeProducts = [
    {
        id: '1',
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 999.99,
        stock: 20,
        category: 'Electronics',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        name: 'Smartphone',
        description: 'Latest smartphone model',
        price: 799.99,
        stock: 15,
        category: 'Electronics',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: '3',
        name: 'Running Shoes',
        description: 'Comfortable and durable running shoes',
        price: 69.99,
        stock: 50,
        category: 'Footwear',
        image: 'https://via.placeholder.com/150',
    },
];


const fakeUsers = [
    {
        id: '1',
        name: 'yuval leberstein',
        email: 'yuval@gmail.com',
        password: '123456', // Password should be hashed in real scenarios
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '123456',
    },
];

module.exports = { fakeProducts, fakeUsers };