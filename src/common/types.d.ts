import { JwtPayload } from '@/modules/auth/interfaces/jwt-payload.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
