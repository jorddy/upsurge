import { useForm } from "react-hook-form";

const OneOffForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <div></div>
    </form>
  );
};

export default OneOffForm;
