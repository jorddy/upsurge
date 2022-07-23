import { PropsWithChildren } from "react";
import Header from "../ui/header";

type Props = {
  dashboard?: boolean;
};

export default function AppLayout({
  children,
  dashboard
}: PropsWithChildren<Props>) {
  return (
    <>
      <Header app dashboard={dashboard} />
      <main className='container mx-auto p-4 space-y-6 standalone:pt-32'>
        {children}
      </main>
    </>
  );
}
