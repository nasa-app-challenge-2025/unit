import { PersonaScore, PersonaScoreRequest } from '../model/types';

let fetchFn: any;
if (typeof window === 'undefined') {
  fetchFn = (await import('node-fetch')).default;
} else {
  fetchFn = fetch;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class PersonaAPI {
  static async getScores(
    requestBody: PersonaScoreRequest
  ): Promise<PersonaScore[]> {
    const response = await fetchFn(
      `${API_BASE_URL}/public/v1/personas/scores?request=${encodeURIComponent(JSON.stringify(requestBody))}`
    );
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Persona API Error:', errorBody);
      throw new Error(`Persona API Error: ${response.status}`);
    }
    return response.json();
  }
}

export type PersonaScore = { /* 정의 */ };
export type PersonaScoreRequest = { /* 정의 */ };
