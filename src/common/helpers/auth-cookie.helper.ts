import { Response } from 'express';
import { COOKIE_NAME } from '@/common/constants';

export const setAuthCookie = (res: Response, accessToken: string) => {
  res.cookie(COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24,
  });
};

export const removeAuthCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAME);
};
