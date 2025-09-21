import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Replace these with real admin credentials or a database check
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'password123';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ message: 'Login successful' });
    // Set a cookie valid for 1 day
    res.cookies.set({
      name: 'admin',
      value: 'true',
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
