export function Button({
  onClick,
  text,
}: {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
}) {
  return (
    <button
      className="border border-slate-400 hover:bg-slate-100 rounded-md px-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
