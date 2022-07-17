import Header from "@/components/common/header";
import { authorize } from "@/utils/authorize";

export { authorize as getServerSideProps };

export default function EditExercisePage() {
  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 grid place-content-center min-h-screen'>
        <h1>Feature coming soon!</h1>
      </main>
    </>
  );
}
