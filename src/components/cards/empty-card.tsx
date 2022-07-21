import { PropsWithChildren } from "react";

export default function EmptyCard({ children }: PropsWithChildren<{}>) {
  return (
    <p className='p-4 bg-zinc-900 rounded-md border border-zinc-500'>
      {children}
    </p>
  );
}
