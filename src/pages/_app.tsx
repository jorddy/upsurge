import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import toast, { Toaster } from "react-hot-toast";
import { FC, PropsWithChildren } from "react";
import { useRefetching } from "@/hooks/use-refetching";

const AppLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  useRefetching();

  return (
    <div
      className='min-h-screen bg-zinc-800 text-white 
      [background-image:url("/Background.png")] bg-cover bg-fixed'
    >
      {children}
      <Toaster position='top-right' />
    </div>
  );
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      toast.error(
        "Oops! Something went wrong, Check the browser's console if you're reporting a bug"
      );
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
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
