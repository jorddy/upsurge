import { useRouter } from "next/router";

const ExercisePage = () => {
  const { query } = useRouter();

  return <main>{query.id}</main>;
};

export default ExercisePage;
