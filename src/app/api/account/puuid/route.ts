import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const gameName = searchParams.get('gameName');
  const tagline = searchParams.get('tagline');
  const riotApiKey = process.env.NEXT_PUBLIC_RIOT_API_KEY;
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;


  if (!gameName || !tagline) {
    return NextResponse.json({ error: 'gameName and tagline are required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      api+`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagline}`,
      {
        headers: {
          'X-Riot-Token': riotApiKey || '',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching data from Riot API' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
