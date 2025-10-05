export class NominatimAPI {
  /**
   * 좌표를 주소로 변환합니다 (Reverse Geocoding)
   */
  static async getAddressFromCoords(lat: number, lon: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name || '주소를 찾을 수 없습니다.';
    } catch (error) {
      console.error('주소 변환 실패:', error);
      return '주소 변환 중 오류 발생';
    }
  }

  /**
   * 주소로 좌표를 검색합니다 (Geocoding)
   */
  static async getCoordsFromAddress(query: string) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          address: display_name,
        };
      }
      return null;
    } catch (error) {
      console.error('주소 검색 실패:', error);
      throw new Error('주소 검색 중 오류가 발생했습니다.');
    }
  }
}
