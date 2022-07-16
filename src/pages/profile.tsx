import Header from "@/components/header";
import { authorize } from "@/utils/authorize";
import { useProfileStore } from "@/utils/profile-store";
import { Switch } from "@headlessui/react";

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
          <Switch.Group>
            <div className='flex items-center'>
              <Switch.Label className='pr-4'>
                Switch weight unit to pounds (lbs)
              </Switch.Label>
              <Switch
                checked={weightUnit === "lbs"}
                onChange={handleWeightChange}
                className={`${
                  weightUnit === "lbs" ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    weightUnit === "lbs" ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </Switch.Group>
        </section>
      </main>
    </>
  );
}
