import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/server";
import { QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <div
        className='min-h-screen bg-zinc-800 text-white 
          [background-image:url("/Background.png")] bg-cover bg-fixed'
      >
        <Head>
          <title>Upsurge - The Simple Way To Log Workouts</title>
          <meta
            name='description'
            content='Upsurge is the best way to log your gym workouts'
          />
        </Head>

        <Component {...pageProps} />
      </div>
      <Toaster position='top-right' />
      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      queryClientConfig: {
        queryCache: new QueryCache({
          onError: error => {
            toast.error(`Oops! Something went wrong, ${error}`);
            console.error(error);
          }
        })
      }
    };
  },
  ssr: false
})(MyApp);
