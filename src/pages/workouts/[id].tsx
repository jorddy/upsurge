import { useRouter } from "next/router";

const WorkoutPage = () => {
  const { query } = useRouter();

  return <div>{query.id}</div>;
};

export default WorkoutPage;
