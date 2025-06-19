import axios from 'axios';

const AIRTABLE_ENDPOINT = 'https://api.airtable.com/v0/appY0c6Ir9XIShPYQ/Table%201?maxRecords=3&view=Grid%20view';

export async function GET(request) {
  try {
    const apiKey = process.env.BUS_TALES_KEY;
    const response = await axios.get(AIRTABLE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data from Airtable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}