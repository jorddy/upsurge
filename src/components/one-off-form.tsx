import { useFieldArray, useForm } from "react-hook-form";

const OneOffForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "wd",
    control
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <div className='field'>
        <label htmlFor='name'>Exercise name:</label>
        <input {...register("name")} className='input' id='name' />
      </div>
    </form>
  );
};

export default OneOffForm;
