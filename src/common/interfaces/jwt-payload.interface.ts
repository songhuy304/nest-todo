export interface JwtUser {
  id: number;
  email: string;
  tokenId: string;

  iat?: number;
  exp?: number;
}
