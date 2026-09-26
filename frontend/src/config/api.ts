/**
 * Centralized API configuration for ZeroBait.
 * Dynamically resolves API base URL whether running locally,
 * served via FastAPI monolithic build, or deployed on cloud platforms.
 */
export const getApiBase = (): string => {
  if (typeof window !== 'undefined') {
    // If Vite dev server on port 5173
    if (window.location.port === '5173') {
      return 'http://localhost:8000/api/v1';
    }
    // Production / Render / Monolithic FastAPI / Cloud
    return '/api/v1';
  }
  return '/api/v1';
};

export const API_BASE = getApiBase();
