// Google Search Console API Wrapper
// Uses OAuth 2.0 for authentication

import { OAuth2Client } from 'google-auth-library';

interface GSCPerformanceQuery {
  startDate: string; // Format: YYYY-MM-DD
  endDate: string;
  dimensions?: string[]; // 'query', 'page', 'country', 'device', 'date'
  rowLimit?: number;
  aggregationType?: 'auto' | 'byProperty' | 'byPage';
}

interface GSCPerformanceRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCPerformanceResponse {
  rows: GSCPerformanceRow[];
}

/**
 * Initialize OAuth2Client with credentials from environment variables
 */
export function getOAuth2Client(): OAuth2Client {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env');
  }

  const client = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: 'http://localhost:3000/api/auth/callback',
  });

  return client;
}

/**
 * Generate OAuth 2.0 authorization URL
 */
export function getAuthUrl(): string {
  const oauth2Client = getOAuth2Client();

  const scopes = [
    'https://www.googleapis.com/auth/webmasters.readonly',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
}

/**
 * Exchange authorization code for access token
 */
export async function getAccessToken(
  oauth2Client: OAuth2Client,
  code: string
): Promise<string> {
  const { tokens } = await oauth2Client.getToken(code);
  const token = tokens.access_token;

  if (!token) {
    throw new Error('Failed to get access token');
  }

  return token;
}

/**
 * Fetch search analytics data from Google Search Console
 * Note: This requires the googleapis package and valid access token
 */
export async function getSearchAnalytics(
  siteUrl: string,
  accessToken: string,
  query: GSCPerformanceQuery
): Promise<GSCPerformanceRow[]> {
  const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      startDate: query.startDate,
      endDate: query.endDate,
      dimensions: query.dimensions || ['query'],
      rowLimit: query.rowLimit || 100,
      aggregationType: query.aggregationType || 'auto',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GSC API Error: ${response.status} - ${error}`);
  }

  const data: GSCPerformanceResponse = await response.json();
  return data.rows || [];
}

/**
 * Fetch top keywords for a given site
 */
export async function getTopKeywords(
  siteUrl: string,
  accessToken: string,
  startDate: string,
  endDate: string,
  limit: number = 20
): Promise<Array<{
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}>> {
  const rows = await getSearchAnalytics(siteUrl, accessToken, {
    startDate,
    endDate,
    dimensions: ['query'],
    rowLimit: limit,
  });

  return rows.map(row => ({
    query: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
}

/**
 * Fetch top pages for a given site
 */
export async function getTopPages(
  siteUrl: string,
  accessToken: string,
  startDate: string,
  endDate: string,
  limit: number = 20
): Promise<Array<{
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}>> {
  const rows = await getSearchAnalytics(siteUrl, accessToken, {
    startDate,
    endDate,
    dimensions: ['page'],
    rowLimit: limit,
  });

  return rows.map(row => ({
    page: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
}

/**
 * Export performance data for keyword tracking sheet
 */
export async function exportForKeywordTracking(
  siteUrl: string,
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<{
  topKeywords: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
}> {
  const [topKeywords, topPages] = await Promise.all([
    getTopKeywords(siteUrl, accessToken, startDate, endDate, 50),
    getTopPages(siteUrl, accessToken, startDate, endDate, 50),
  ]);

  return {
    topKeywords,
    topPages,
  };
}
