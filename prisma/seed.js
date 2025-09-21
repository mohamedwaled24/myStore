import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Floral Summer Dress",
        slug: "floral-summer-dress",
        description: "Step into summer with this chic floral dress 🌸.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1520975698519-59c8a2b7e8f3?auto=format&fit=crop&w=900&q=80",
        category: "Dresses",
      },
      {
        name: "Cozy Winter Jacket",
        slug: "cozy-winter-jacket",
        description: "Stay warm and stylish ❄️.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1602810318383-e3b60c5fa9d2?auto=format&fit=crop&w=900&q=80",
        category: "Jackets",
      },
    ],
  });
}

main()
  .then(() => console.log("✅ Database seeded"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
