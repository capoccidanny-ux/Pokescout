export async function POST(req) {
  try {
    const { image, mimeType } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: mimeType, data: image } },
              { text: `You are a Pokemon card expert. Identify ALL Pokemon cards in this image, including cards in sleeves, top loaders, or grading slabs. Return ONLY valid JSON, no markdown, no backticks: {"cards":[{"name":"Charizard","set":"Base Set","number":"4/102","condition":"LP","condition_fr":"Légèrement Jouée","psa_estimate":8,"psa_probs":{"10":5,"9":20,"8":35,"7":25,"6":15},"centering":85,"in_slab":false,"slab_grade":null}]} Rules: condition: NM, LP, MP, HP, or DMG. psa_estimate: 1-10. psa_probs must sum to 100. in_slab: true if PSA/BGS/CGC slab.` }
            ]
          }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 2000 }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return Response.json({ error: err?.error?.message || 'Gemini error' }, { status: 500 });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return Response.json({ error: 'No cards detected' }, { status: 400 });

    return Response.json(JSON.parse(match[0]));
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}