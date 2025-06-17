export const jwtConfig = {
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: '100d',
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: '7d',
  },
};
