import Header from "@/components/header";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <Header app />
    </>
  );
};

export default Dashboard;
