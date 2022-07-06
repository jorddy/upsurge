import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useWorkoutById } from "@/hooks/queries/use-workout-by-id";

const WorkoutPage = () => {
  const { data: session, status } = useSession();
  const { query } = useRouter();
  const { data, isLoading } = useWorkoutById(query.id as string);

  if (status === "loading") return <Loader />;

  if (status === "unauthenticated") signIn();

  if (status === "authenticated" && isLoading) return <Loader />;

  if (session) {
    return (
      <div>
        <h1>{query.id}</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
};

export default WorkoutPage;
