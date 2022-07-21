import { PropsWithChildren } from "react";
import Header from "../ui/header";

const Footer = () => {
  return (
    <footer className='bg-zinc-900 border-t border-zinc-500'>
      <div className='container mx-auto py-6 px-4'>
        <p>© Upsurge, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default function WebLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <Header />
      <main className='text-center container mx-auto p-4 sm:text-left'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
