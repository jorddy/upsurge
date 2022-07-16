import Header from "@/components/header";
import { authorize } from "@/utils/authorize";
import { useProfileStore } from "@/utils/profile-store";

export { authorize as getServerSideProps };

export default function ProfilePage() {
  const convertWeightToKilos = useProfileStore(
    state => state.convertWeightToKilos
  );
  const convertWeightToPounds = useProfileStore(
    state => state.convertWeightToPounds
  );

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-4'>
        <h1 className='text-2xl font-bold'>Your profile</h1>
        <section className='p-4 bg-zinc-900 border border-zinc-500'></section>
      </main>
    </>
  );
}
