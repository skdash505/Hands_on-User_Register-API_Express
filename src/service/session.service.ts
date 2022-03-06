import SessionModel from "../model/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    // Allows a user object that has had the password omitted
    | Omit<UserDocument, "password">
    // Allows a user object that has been found with .lean()
    | LeanDocument<Omit<UserDocument, "password">>;
  session:
    // Allows a session object that has had the password omitted
    | Omit<SessionDocument, "password">
    // Allows a session object that has been found with .lean()
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}