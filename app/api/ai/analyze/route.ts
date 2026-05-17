/**
 * AEGIS OS AI API - Complete Crisis Analysis Endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiOrchestrator } from '@/lib/ai/orchestrator';
import { AIRequest, Coordinates, SeverityFactors } from '@/lib/ai/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, location, factors, priority = 'high' } = body;

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

    // Parse severity factors if provided
    let severityFactors: SeverityFactors | undefined;
    if (factors) {
      severityFactors = factors as SeverityFactors;
    }

    // Create AI request
    const aiRequest: AIRequest = {
      id: `analyze-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'analyze',
      timestamp: new Date().toISOString(),
      priority: priority as any,
      data: {
        description,
        location: coords,
        factors: severityFactors,
      },
      context: coords ? {
        location: { lat: coords.latitude, lng: coords.longitude },
      } : undefined,
    };

    // Process request
    const response = await aiOrchestrator.processRequest(aiRequest);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Analysis API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/ai/analyze',
    method: 'POST',
    description: 'Complete crisis analysis including classification, severity prediction, recommendations, and evacuation planning',
    parameters: {
      description: 'string (required) - Crisis description',
      location: 'object (optional) - { latitude: number, longitude: number }',
      factors: 'object (optional) - Severity factors for prediction',
      priority: 'string (optional) - Request priority: immediate, urgent, high, medium, low',
    },
    example: {
      description: 'Major earthquake detected, magnitude 7.2, multiple buildings collapsed',
      location: { latitude: 34.0522, longitude: -118.2437 },
      priority: 'immediate',
    },
  });
}

// Made with Bob
