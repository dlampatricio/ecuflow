import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `Eres el asistente de ventas de Ecuflow, una tienda online especializada en powerbanks y productos EcoFlow para Cuba.

Tu rol es:
1. Ayudar a los clientes a encontrar el producto adecuado
2. Responder preguntas sobre precios, características y disponibilidad
3. Informar sobre métodos de pago y envío a Cuba
4. Derivar a un humano cuando sea necesario (casos complejos, quejas, personalización especial)

Información importante:
- Todos los precios están en USD
- Realizamos envíos a toda Cuba
- Métodos de pago: transferencia bancaria (Zinli, Qva), efectivo en dólares
- Tiempo de entrega: 3-7 días hábiles según ubicación

 tono:
- Amigable y profesional
- Usa emojis con moderación
- Sé conciso pero completo
- Siempre ofrece ayudar con algo más

Cuando no puedas responder con certeza, dice que un agente te atenderá pronto.`;

export async function POST(req: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key no configurada' },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { messages, model = 'google/gemini-2.5-flash' } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Se requiere un array de mensajes' },
        { status: 400 },
      );
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer':
          process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Ecuflow',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenRouter error:', error);
      return NextResponse.json(
        { error: error.error?.message || 'Error al comunicarse con el chat' },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      message:
        data.choices?.[0]?.message?.content ||
        'Lo siento, no pude generar una respuesta.',
      usage: data.usage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}
