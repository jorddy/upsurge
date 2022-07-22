import { PropsWithChildren } from "react";
import Header from "../ui/header";

export default function AppLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header app />
      <main className='container mx-auto p-4 space-y-6'>{children}</main>
    </>
  );
}
