import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div
          className='min-h-screen bg-slate-800 text-white 
          [background-image:url("/Background.png")] bg-cover'
        >
          <Component {...pageProps} />
          <Toaster position='top-right' />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
