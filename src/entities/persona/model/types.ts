export interface PersonaScoreRequest {
  pm25_24h: number;
  pm10_24h: number;
  o3_8h: number;
  no2_1h: number;
  co_8h: number;
  so2: number;
  hcho: number;
  pollen_level: string;
  heat: boolean;
  cold: boolean;
  dP: boolean;
  storm: boolean;
  dp: boolean;
}

export interface PersonaScore {
  persona: string;
  score: number;
  level: string;
}
