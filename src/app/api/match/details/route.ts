import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get('matchId');
  const riotApiKey = process.env.NEXT_PUBLIC_RIOT_API_KEY;
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;


  if (!matchId) {
    return NextResponse.json({ error: 'matchId is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      api+` /lol/match/v5/matches/${matchId} `,
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
