import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {
  CreateExerciseType,
  createExerciseValidator
} from "@/shared/create-exercise-validator";

const CreateExercisePage = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateExerciseType>({
    resolver: zodResolver(createExerciseValidator)
  });

  return <form onSubmit={handleSubmit(data => console.log(data))}></form>;
};

export default CreateExercisePage;
