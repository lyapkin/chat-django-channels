const env = process.env.NODE_ENV

export const MOBILE_VERSION_WIDTH = 600

export const BASE_HTTP_URL = env === 'development' ? 'http://127.0.0.1:8000' : 'https://social-hole-chat.up.railway.app/'

export const BASE_WS_URL = env === 'development' ? 'ws://127.0.0.1:8000' : 'wss://social-hole-chat.up.railway.app/'