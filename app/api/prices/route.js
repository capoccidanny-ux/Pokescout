export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    if (!query) return Response.json({ error: 'Missing query' }, { status: 400 });

    const response = await fetch(
      `https://www.pokemonpricetracker.com/api/v2/cards?search=${encodeURIComponent(query)}&limit=1`,
      { headers: { 'Authorization': `Bearer ${process.env.POKE_API_KEY}` } }
    );

    const data = await response.json();
    return Response.json(data?.data?.[0] || null);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}