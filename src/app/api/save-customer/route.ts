// app/api/save-customer/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Aqui você implementaria a lógica para salvar no seu banco de dados
    console.log('Dados do cliente:', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving customer:', error);
    return NextResponse.json(
      { error: 'Error saving customer data' },
      { status: 500 }
    );
  }
}