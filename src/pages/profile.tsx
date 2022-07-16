import Header from "@/components/header";
import Toggle from "@/components/toggle";
import { authorize } from "@/utils/authorize";
import { useProfileStore } from "@/utils/profile-store";

export { authorize as getServerSideProps };

export default function ProfilePage() {
  const { weightUnit, convertWeightToKilos, convertWeightToPounds } =
    useProfileStore();

  const handleWeightChange = () => {
    if (weightUnit === "kg") {
      convertWeightToPounds();
    }

    if (weightUnit === "lbs") {
      convertWeightToKilos();
    }
  };

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-4'>
        <h1 className='text-2xl font-bold'>Your profile</h1>
        <section className='p-4 bg-zinc-900 border border-zinc-500'>
          <Toggle
            label='Switch weight unit to pounds (lbs)'
            checked={weightUnit === "lbs"}
            onChange={handleWeightChange}
          />
        </section>
      </main>
    </>
  );
}
