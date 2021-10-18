import { Client } from "socialvoid";

export const client = new Client();

export const authenticated = async () => {
  if (!client.sessionExists) return false;

  const session = await client.session.get();
  return session.authenticated;
};

export const logout = async () => {
  if (!client.sessionExists) return;

  try {
    await client.session.logout();
  } catch (_) {}

  client.deleteSession();
};
