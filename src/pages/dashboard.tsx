import Header from "@/components/header";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4'></main>
    </>
  );
};

export default Dashboard;
