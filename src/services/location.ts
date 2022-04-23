import { apiService } from '@/services/api';

export function useLocation() {
  function getLocation(cep: string) {
    return apiService.get(`/${cep}/json`);
  }

  return { getLocation };
}
