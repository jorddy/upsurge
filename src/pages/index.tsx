import { trpc } from "@/utils/trpc";

export default function Home() {
  const hello = trpc.useQuery(["hello"]);

  return (
    <main>
      <h1>Hello</h1>
      {hello.data?.greeting}
    </main>
  );
}
