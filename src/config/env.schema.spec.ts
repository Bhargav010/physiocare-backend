import { describe, expect, it } from 'vitest';
import { validateEnv } from './env.schema.js';

describe('validateEnv', () => {
  it('applies defaults when variables are missing', () => {
    expect(validateEnv({})).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      API_PREFIX: 'api',
      CORS_ORIGINS: [],
    });
  });

  it('coerces PORT and splits CORS_ORIGINS', () => {
    const env = validateEnv({
      PORT: '8080',
      CORS_ORIGINS: 'https://admin.example.com, http://localhost:5173',
    });
    expect(env.PORT).toBe(8080);
    expect(env.CORS_ORIGINS).toEqual(['https://admin.example.com', 'http://localhost:5173']);
  });

  it('rejects invalid values with a readable message', () => {
    expect(() => validateEnv({ NODE_ENV: 'prod', PORT: 'abc' })).toThrow(
      /Invalid environment variables:[\s\S]*NODE_ENV[\s\S]*PORT/,
    );
  });

  it('rejects malformed CORS origins', () => {
    expect(() => validateEnv({ CORS_ORIGINS: 'not-a-url' })).toThrow(/CORS_ORIGINS/);
  });
});
