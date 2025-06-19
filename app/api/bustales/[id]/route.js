import axios from 'axios';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const apiKey = process.env.BUS_TALES_KEY;
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Post ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await axios.get(
      `https://api.airtable.com/v0/appY0c6Ir9XIShPYQ/Table%201/${id}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Transform the data to match the expected format
    const post = {
      ...response.data.fields,
      airtableId: response.data.id
    };

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching post from Airtable:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch post from Airtable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 