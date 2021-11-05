import { Client } from "socialvoid";

export const client = new Client();

export const logout = async () => {
  if (!client.sessionExists) return;

  try {
    await client.session.logout();
  } catch (_) {}

  client.deleteSession();
};
