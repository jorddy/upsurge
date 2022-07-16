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

      <main className='container mx-auto p-4 space-y-8'>
        <section>
          <h1 className='pb-4 text-2xl font-bold'>App Settings</h1>
          <div className='p-6 bg-zinc-900 border border-zinc-500'>
            <Toggle
              checked={weightUnit === "lbs"}
              onChange={handleWeightChange}
            >
              Switch Weight Unit To Pounds (lbs)
            </Toggle>
          </div>
        </section>

        <section>
          <h2 className='pb-4 text-2xl font-bold'>Update Profile</h2>
          <form
            onSubmit={() => alert("This feature needs to be done")}
            className='p-6 space-y-6 bg-zinc-900 border border-zinc-500'
          >
            <div className='field'>
              <label htmlFor='name'>Change Name:</label>
              <input type='text' id='name' className='input bg-zinc-700' />
            </div>
            <div className='field'>
              <label htmlFor='image'>Change Avatar:</label>
              <input type='text' id='image' className='input bg-zinc-700' />
            </div>
            <button type='submit' className='button'>
              Update
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
