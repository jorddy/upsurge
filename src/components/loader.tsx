export default function Loader({ inline }: { inline?: boolean }) {
  return (
    <div className={!inline ? "min-h-screen grid place-items-center" : ""}>
      <img src='/loader.svg' alt='Loading...' />
    </div>
  );
}
