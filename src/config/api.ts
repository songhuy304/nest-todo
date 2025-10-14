interface ApiConfig {
  readonly GLOBAL_PREFIX: string;
  readonly PORT: number | string;
}

export const API_CONFIG: ApiConfig = {
  GLOBAL_PREFIX: 'gw/api/v1',
  PORT: 3000,
};
