import jwt from "jsonwebtoken";

// Generate AccessToken
export const generateAccessToken = (payload: any) => {
  // expiresIn works in seconds if given in number
  const token = jwt.sign(payload, (process.env.ACCESS_TOKEN_SECRET_KEY as string), {
    expiresIn:  24 * 60 * 60,
  });
  return token;
};

