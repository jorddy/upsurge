import Header from "@/components/header";
import Toggle from "@/components/toggle";
import { authorize } from "@/utils/authorize";
import { useProfileStore } from "@/utils/stores";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileValidator, ProfileValidator } from "@/utils/validators";
import { trpc } from "@/utils/trpc";
import toast from "react-hot-toast";

export { authorize as getServerSideProps };

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileValidator>({
    resolver: zodResolver(profileValidator)
  });

  const { mutate: updateProfile } = trpc.useMutation(["profile.update"]);

  const onSubmit = (data: ProfileValidator) => {
    const toastId = toast.loading("Updating profile...");
    updateProfile(data, {
      onError: error => {
        toast.error(`Something went wrong: ${error}`, { id: toastId });
      },
      onSuccess: () => {
        toast.success("Successfully updated profile", { id: toastId });
        window.location.reload();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-6 space-y-6 bg-zinc-900 border border-zinc-500'
    >
      <div className='field'>
        <label htmlFor='name'>Change Name:</label>
        <input
          {...register("name")}
          type='text'
          id='name'
          className='input bg-zinc-700'
        />
      </div>

      <div className='field'>
        <label htmlFor='email'>Change Email:</label>
        <input
          {...register("email")}
          type='email'
          id='email'
          className='input bg-zinc-700'
        />

        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>

      <div className='field'>
        <label htmlFor='image'>Change Image:</label>
        <input
          {...register("image")}
          type='text'
          id='image'
          className='input bg-zinc-700'
        />
      </div>

      <button type='submit' className='button'>
        Update
      </button>
    </form>
  );
};

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
          <ProfileForm />
        </section>
      </main>
    </>
  );
}
