// Em desenvolvimento: detecta ambiente e rota corretamente
// - localhost: usa /api (reescrito pelo Next.js)
// - GitHub Codespace: substitui porta 3001 → 3000
// - Produção: usa variável de ambiente
let API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL && typeof window !== 'undefined') {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Desenvolvimento local
    API_URL = '/api';
  } else if (window.location.hostname.includes('app.github.dev')) {
    // GitHub Codespace - substitui porta 3001 pela 3000
    // Exemplo: https://ideal-giggle-969gww75gwxj27rv9-3001.app.github.dev → :3000
    const origin = window.location.origin;
    API_URL = origin.replace(/:3001($|[^\d])/, ':3000');
  } else {
    // Fallback
    API_URL = 'http://localhost:3000';
  }
}

API_URL = API_URL || 'http://localhost:3000';

export const getApiUrl = () => API_URL;

const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    let token =
      localStorage.getItem('token') ||
      localStorage.getItem('auth-token') ||
      '';

    if (!token && document.cookie) {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});
      token = cookies['auth-token'] || cookies['token'] || '';
    }

    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  return { 'Content-Type': 'application/json' };
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  // 🔍 debug (pode remover depois)
  console.log('🌐 API_URL:', API_URL);
  console.log('➡️ Request:', url);

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
    credentials: 'include',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await res.text();

  // 🚨 tratamento de erro robusto
  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}`;

    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      errorMessage = text || errorMessage;
    }

    console.error('❌ API ERROR:', errorMessage);
    throw new Error(errorMessage);
  }

  // ⚠️ evita crash quando backend retorna vazio
  if (!text) {
    return { success: true, data: null };
  }

  // 🚨 evita erro "Unexpected token <"
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('❌ Resposta não é JSON:', text);
    throw new Error('Resposta inválida do servidor');
  }
};