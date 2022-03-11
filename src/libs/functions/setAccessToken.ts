// src/libs/function/setAccessToken

export default async (
  //     {
  //     token,
  //     age,
  //     res,
  //     filename,
  //     setDevLog,
  //     level
  // }:{
  token: any,
  age: number,
  res: any,
  filename: string,
  setDevLog: any,
  level: any
  // }
) => {

  if (token) {
    setDevLog(filename, level.MARK, `Sending accessToken in Cookies.`);
    return res.cookie(
      "accessToken", token,
      {
        maxAge: age * (60 * 1000),
        httpOnly: true
      });
  }
}