import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import { FC, PropsWithChildren } from "react";
import { useRefetching } from "@/hooks/use-refetching";

const AppLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  useRefetching();

  return (
    <div
      className='min-h-screen bg-slate-800 text-white 
      [background-image:url("/Background.png")] bg-cover bg-no-repeat'
    >
      {children}
      <Toaster position='top-right' />
    </div>
  );
};

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
