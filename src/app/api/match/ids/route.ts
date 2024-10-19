import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const puuid = searchParams.get('puuid');
  const riotApiKey = process.env.NEXT_PUBLIC_RIOT_API_KEY;
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  const type = searchParams.get('type');
  let apiUrl = api+`/lol/match/v5/matches/by-puuid/${puuid}/ids`


  if (!puuid) {
    return NextResponse.json({ error: 'puuid is required' }, { status: 400 });
  }

  const queryParams = new URLSearchParams();

  if(startTime){
    queryParams.append('startTime', startTime);
  }
  if(endTime){
    queryParams.append('endTime', endTime);
  }
  if(type){
    queryParams.append('type', type);
  }

  const finalUrl = queryParams.toString() ? `${apiUrl}?${queryParams.toString()}` : apiUrl;

  try {
    const response = await fetch(
    finalUrl,
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
