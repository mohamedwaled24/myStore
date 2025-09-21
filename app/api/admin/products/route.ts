import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Simple slug generator from name
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, imageUrl, category } = body;

    if (!name || !price || !imageUrl || !category) {
      return NextResponse.json(
        { message: 'Name, price, image, and category are required' },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price,
        description,
        image: imageUrl, // store base64 or URL here
        category,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}