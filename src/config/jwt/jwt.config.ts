export const jwtConfig = {
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: '1d',
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: '7d',
  },
};
