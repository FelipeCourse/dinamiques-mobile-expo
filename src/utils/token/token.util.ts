import jwt from 'expo-jwt';
import { JWTBody, JWTDefaultBody } from 'expo-jwt/dist/types/jwt';

const JWT_SECRET = process.env.EXPO_PUBLIC_JWT_SECRET!;

export function verifyToken(token: string): JWTBody<JWTDefaultBody> {
  try {
    const decoded = jwt.decode(token, JWT_SECRET);

    return decoded;
  } catch (error: unknown) {
    throw `Token inválido - ${error}`;
  }
}

export function isExpiredToken(expires: number) {
  const currentTime = Math.floor(Date.now() / 1000);

  return expires < currentTime;
}
