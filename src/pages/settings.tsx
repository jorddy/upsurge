import Header from "@/components/common/header";
import Toggle from "@/components/fields/toggle";
import { authorize } from "@/utils/authorize";
import { useProfileStore } from "@/utils/stores";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileValidator, ProfileValidator } from "@/utils/validators/profile";
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

  const { mutate: updateProfile, isLoading } = trpc.useMutation([
    "profile.update"
  ]);

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
        <label htmlFor='name'>Change name:</label>
        <input
          {...register("name")}
          type='text'
          id='name'
          className='input bg-zinc-700'
        />

        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

      <div className='field'>
        <label htmlFor='email'>Change email:</label>
        <input
          {...register("email")}
          type='email'
          id='email'
          className='input bg-zinc-700'
        />

        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>

      <div className='field'>
        <label htmlFor='image'>Change image:</label>
        <input
          {...register("image")}
          type='text'
          id='image'
          className='input bg-zinc-700'
        />

        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
      </div>

      <button type='submit' disabled={isLoading} className='button-create'>
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
          <h1 className='pb-4 text-2xl font-bold'>App settings</h1>
          <div className='p-6 bg-zinc-900 border border-zinc-500'>
            <Toggle
              checked={weightUnit === "lbs"}
              onChange={handleWeightChange}
            >
              Switch weight unit to pounds (lbs)
            </Toggle>
          </div>
        </section>

        <section>
          <h2 className='pb-4 text-2xl font-bold'>Update profile</h2>
          <ProfileForm />
        </section>
      </main>
    </>
  );
}
