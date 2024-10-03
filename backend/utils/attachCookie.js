const attachCookie = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    signed: true,
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
};

export default attachCookie;
