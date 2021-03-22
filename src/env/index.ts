import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL ?? '',
  REACT_APP_NAVER_CLIENT_ID: process.env.REACT_APP_NAVER_CLIENT_ID ?? '',
  REACT_APP_LOGIN_URL: process.env.REACT_APP_LOGIN_URL ?? '',
  REACT_APP_KAKAO_LOGIN_BRIDGE_URL: process.env.REACT_APP_KAKAO_LOGIN_BRIDGE_URL ?? '',
  REACT_APP_KAKAO_LOGIN_KEY: process.env.REACT_APP_KAKAO_LOGIN_KEY ?? '',
  REACT_APP_KAKAO_USER_API_KEY: process.env.REACT_APP_KAKAO_USER_API_KEY ?? '',
  REACT_APP_FB_API_KEY: process.env.REACT_APP_FB_API_KEY ?? '',
  REACT_APP_FB_AUTH_DOMAIN: process.env.REACT_APP_FB_AUTH_DOMAIN ?? '',
  REACT_APP_FB_URL: process.env.REACT_APP_FB_URL ?? '',
  REACT_APP_FB_PROJECT_ID: process.env.REACT_APP_FB_PROJECT_ID ?? '',
  REACT_APP_FB_STORAGE_BUCKET: process.env.REACT_APP_FB_STORAGE_BUCKET ?? '',
  REACT_APP_FB_MESSAGING_SENDER_ID: process.env.REACT_APP_FB_MESSAGING_SENDER_ID ?? '',
  REACT_APP_FB_APP_ID: process.env.REACT_APP_FB_APP_ID ?? '',
  REACT_APP_FB_MEASUREMENT_ID: process.env.REACT_APP_FB_MEASUREMENT_ID ?? '',
  REACT_APP_DEV: process.env.REACT_APP_DEV ?? '',
}