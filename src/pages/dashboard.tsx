import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div>
      <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
