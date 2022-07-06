import { useForm } from "react-hook-form";

const OneOffForm = () => {
  const { register, handleSubmit } = useForm();

  return <form onSubmit={data => console.log(data)}>Oneoffform</form>;
};

export default OneOffForm;
