import { useRouter } from "next/router";
import { logout } from "../client";
import { runOnClient } from "../utils";
import { setLoading } from "../stores";

export default function Logout() {
  const router = useRouter();

  runOnClient(async () => {
    await logout();
    setLoading(false);
    router.push("/");
  });

  return <></>;
}
