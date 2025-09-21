import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 9);
    const category = searchParams.get("category") || "All";

    const where = category !== "All" ? { category } : {};

    const total = await prisma.product.count({ where });
    const totalPages = Math.ceil(total / limit);

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ products, total, totalPages });
  } catch (err) {
    console.error("API /products error:", err);
    return NextResponse.json({ products: [], total: 0, totalPages: 1 }, { status: 500 });
  }
}
