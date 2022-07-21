type Props = {
  inline?: boolean;
};

export default function Loader({ inline }: Props) {
  return (
    <div className={!inline ? "min-h-screen grid place-items-center" : ""}>
      <img src='/loader.svg' alt='Loading...' />
    </div>
  );
}
