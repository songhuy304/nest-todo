export interface JwtPayload {
  id: number;
  email: string;
  tokenId: string;
  iat?: number;
  exp?: number;
}
