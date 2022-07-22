import { GetServerSideProps } from "next";
import { getUpsurgeAuth } from "@/server/auth";

export const authorize: GetServerSideProps = async ctx => {
  const session = await getUpsurgeAuth(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false
      }
    };
  }

  return { props: { session } };
};
