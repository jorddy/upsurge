import Header from "@/components/header";
import Loader from "@/components/loader";
import { signIn, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { status } = useSession();

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") signIn();
  if (status === "authenticated") return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 grid place-content-center min-h-screen'>
        <h1>Feature coming soon!</h1>
      </main>
    </>
  );
}
