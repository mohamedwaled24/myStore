export type Product = {
id: string;
name: string;
price: number;
category: string;
image: string;
description: string;
createdAt: string; // ISO date
};

export const products: Product[] = [
{
id: 'p1',
name: 'Classic White Dress',
price: 69.99,
category: 'Dresses',
image: 'https://via.placeholder.com/600x800?text=White+Dress',
description: 'Elegant white dress for everyday and special events.',
createdAt: '2025-08-01',
},
{
id: 'p2',
name: 'Black Statement Top',
price: 39.99,
category: 'Tops',
image: 'https://via.placeholder.com/600x800?text=Black+Top',
description: 'Bold black top with flattering cut.',
createdAt: '2025-09-05',
},
{
id: 'p3',
name: 'Casual Denim Jacket',
price: 89.99,
category: 'Outerwear',
image: 'https://via.placeholder.com/600x800?text=Denim+Jacket',
description: 'Timeless denim jacket for every season.',
createdAt: '2025-07-15',
},{
id: 'p4',
name: 'Flowy Summer Skirt',
price: 49.99,
category: 'Skirts',
image: 'https://via.placeholder.com/600x800?text=Summer+Skirt',
description: 'Lightweight skirt with flowy silhouette.',
createdAt: '2025-09-10',
},
{
id: 'p5',
name: 'Comfort Knit Sweater',
price: 59.99,
category: 'Knitwear',
image: 'https://via.placeholder.com/600x800?text=Knit+Sweater',
description: 'Cozy knit sweater with premium yarn.',
createdAt: '2025-06-21',
},{
id: 'p6',
name: 'Tailored Trousers',
price: 79.99,
category: 'Bottoms',
image: 'https://via.placeholder.com/600x800?text=Tailored+Trousers',
description: 'Sleek trousers suitable for day and night.',
createdAt: '2025-08-20',
},
];


export default products;