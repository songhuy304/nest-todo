export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  id: number;
  email: string;
  tokenId: string;
}
