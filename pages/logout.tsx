import { useRouter } from "next/router";
import { logout } from "../client";
import { runOnClient } from "../utils";

export default function Logout() {
  const router = useRouter();

  runOnClient(async () => {
    await logout();
    router.push("/");
  });

  return <></>;
}
