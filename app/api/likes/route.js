import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { postId, likeCount } = await request.json();
    
    if (!postId || likeCount === undefined) {
      return NextResponse.json(
        { error: 'Missing postId or likeCount' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BUS_TALES_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Update the like count in Airtable using axios
    const updateResponse = await axios.patch(
      `https://api.airtable.com/v0/appY0c6Ir9XIShPYQ/Table%201/${postId}`,
      {
        fields: {
          likescount: likeCount
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    );

    // Fetch the updated record to get the current like count from Airtable
    const fetchResponse = await axios.get(
      `https://api.airtable.com/v0/appY0c6Ir9XIShPYQ/Table%201/${postId}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      }
    );

    const currentLikeCount = fetchResponse.data.fields.likescount || 0;

    return NextResponse.json({
      success: true,
      data: updateResponse.data,
      currentLikeCount: currentLikeCount
    });

  } catch (error) {
    console.error('Error updating like count:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return NextResponse.json(
        { error: 'Failed to update like count', details: error.response.data },
        { status: error.response.status }
      );
    } else if (error.request) {
      // The request was made but no response was received
      return NextResponse.json(
        { error: 'No response from server' },
        { status: 500 }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
} 