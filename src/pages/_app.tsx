import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import toast, { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      toast.error(`Oops! Something went wrong, ${error}`);
      console.error(error);
    }
  })
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div
          className='min-h-screen bg-zinc-800 text-white 
          [background-image:url("/Background.png")] bg-cover bg-fixed'
        >
          <Component {...pageProps} />
        </div>
        <Toaster position='top-right' />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
