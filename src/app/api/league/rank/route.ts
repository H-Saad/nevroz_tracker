import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const encryptedSummonerId = searchParams.get('encryptedSummonerId');
  const riotApiKey = process.env.NEXT_PUBLIC_RIOT_API_KEY;
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!encryptedSummonerId) {
    return NextResponse.json({ error: 'encryptedSummonerId is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${api}/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`,
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

    // Filter for only "RANKED_SOLO_5x5" queue type
    const rankedSolo5v5Data = data.filter((entry: any) => entry.queueType === 'RANKED_SOLO_5x5');

    return NextResponse.json(rankedSolo5v5Data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
