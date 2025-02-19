export type PropertyApiError = {
  code: 'FETCH_ERROR' | 'CREATE_ERROR' | 'UPDATE_ERROR' | 'DELETE_ERROR' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'NETWORK_ERROR' | 'PARSE_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  status?: number;
};

export interface PropertyApiResponse {
  success: boolean;
  data?: any[];
  error?: PropertyApiError;
}