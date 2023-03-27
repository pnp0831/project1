interface Config {
  baseUrl: string;
  timeout: number;
  limit: number;
}

const config: Config = {
  baseUrl: 'https://641031d1864814e5b649fc8e.mockapi.io/api',
  timeout: 10000,
  limit: 8,
};

export default config;
