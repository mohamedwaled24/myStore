import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await request.json();
  const { name, price, description, imageUrl } = body;

  if (!name || !price) {
    return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: { name, price, description, imageUrl },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: 'Product deleted' });
}