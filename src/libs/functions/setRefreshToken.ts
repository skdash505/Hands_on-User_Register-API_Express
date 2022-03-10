
export default async (
  //     {
  //     token,
  //     expaire,
  //     res,
  //     filename,
  //     setDevLog,
  //     level
  // }:{
  token: any,
  expaire: number,
  res: any,
  filename: string,
  setDevLog: any,
  level: any
  // }
) => {

  if (token) {
    setDevLog(filename, level.MARK, `Sending accessToken in Cookies.`);
    return res.cookie(
      "refreshToken", token,
      {
        expires: new Date(Date.now() + expaire * (24 * 60 * 60 * 1000)),
        httpOnly: true
      });
  }
}