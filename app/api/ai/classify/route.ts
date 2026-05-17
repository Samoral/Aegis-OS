/**
 * AEGIS OS AI API - Crisis Classification Endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiOrchestrator } from '@/lib/ai/orchestrator';
import { Coordinates } from '@/lib/ai/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, location } = body;

    // Validate input
    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required and must be a string' },
        { status: 400 }
      );
    }

    // Parse location if provided
    let coords: Coordinates | undefined;
    if (location) {
      if (typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
        return NextResponse.json(
          { error: 'Invalid location format. Must include latitude and longitude as numbers' },
          { status: 400 }
        );
      }
      coords = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }

    // Perform classification
    const response = await aiOrchestrator.classify(description, coords);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Classification API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/ai/classify',
    method: 'POST',
    description: 'Classify crisis type and severity from description',
    parameters: {
      description: 'string (required) - Crisis description',
      location: 'object (optional) - { latitude: number, longitude: number }',
    },
  });
}

// Made with Bob
