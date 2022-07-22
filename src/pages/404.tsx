import AppLayout from "@/components/layouts/app-layout";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <AppLayout>
      <h1 className='text-center text-2xl font-bold'>
        Error 404: Page not found
      </h1>
      <Link href='/'>Go home</Link>
    </AppLayout>
  );
}
