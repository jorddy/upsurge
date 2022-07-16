import Header from "@/components/header";
import { authorize } from "@/utils/authorize";

export { authorize as getServerSideProps };

export default function ProfilePage() {
  return (
    <>
      <Header app />

      <main className='container mx-auto p-4'>
        <section className='p-4 bg-zinc-900 border border-zinc-500'>
          <h1>Your settings</h1>
        </section>
      </main>
    </>
  );
}
