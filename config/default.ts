// config/default.ts

import {apiPaths} from "./apiPaths"

export default {
  port: 3000,
  host: "localhost",
  dbUri: "mongodb://localhost:27017/userRegister",

  apiPaths: apiPaths(),
  
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",

  publicKey: `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDL2OpaVZbcselXjvZ9xxZ3ewVZ
  D6VMuIiD7JiwiRLChFsTG5vC1x7pLKvzMML3LtrYdfNsTUTkvVJ+ma7veY17DQvu
  TRsEyRefh7D3QM8QOMtv5ZUaIskt454PSjlPElTKUrewERIqKCcdjxZrPmkNFBiQ
  d3n5wqoo08qTem7bIwIDAQAB
  -----END PUBLIC KEY-----
  `,
  privateKey: `-----BEGIN PRIVATE KEY-----
  MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMvY6lpVltyx6VeO
  9n3HFnd7BVkPpUy4iIPsmLCJEsKEWxMbm8LXHuksq/Mwwvcu2th182xNROS9Un6Z
  ru95jXsNC+5NGwTJF5+HsPdAzxA4y2/llRoiyS3jng9KOU8SVMpSt7AREiooJx2P
  Fms+aQ0UGJB3efnCqijTypN6btsjAgMBAAECgYB3yQSVhrv6/fTfhdvkt0vFdB4F
  YsNA3SMjWrGy8yl58mrORKf4C49Xd++nHV1EAV2KW21qk9FLFNFYIZkBkg0HVs4q
  +D85VdZf5EFIrvlpsQxgPei/ZS6LG+vfRdUPmoAHn8ZUT/Hn//d0HVhhqkZcz5N2
  AI6QI6GS+IHFVPgmEQJBAP+HTPReG/lg+3uw1Oy/K85W//w6yS8bJ2S0I3NvGUGa
  VWqFSbujH9TAzt8KlarHWUUFIBC6Ty0YBRBdp8Txz9sCQQDMOTP//IxaAJa/bxto
  Gn9FlLqB4O6GBhon5GBAS8eJe8AcZk1uOHwtckJKoSEbeN3T7UCUWLFUg5/TAI4Y
  OEhZAkEAsrbib5bSYdwehyfqA5rA/JOEfdhvlO6c4qXKlZWCSIu0acfHBeDVBmvD
  Q+OXQdYi7U7kWk6zyYofII8gI3IsOQJBALCFVTwTyCDXV3W6jL7sAExdZOR0TteL
  mLoYfVW16pAcZg5mItF9g2Ao3cHyClLboynWbbaL/yMk7lWMqkWnCGkCQEcElPkd
  1mh3TGSyop9FWH60nPrVxgUQTtuUM8bSfktcZsEPZfKvWG9b+eboIKgSGPrkckib
  d0yzfbNscZI8kJ8=
  -----END PRIVATE KEY-----
  `,
}