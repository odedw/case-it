interface Props {
  onAboutClick: () => void;
}

export function Header({ onAboutClick }: Props) {
  return (
    <header className="h-[60px] bg-black text-white flex items-center px-6 sm:px-10 select-none">
      <span className="text-3xl font-bold">caseIt</span>
      <button
        type="button"
        onClick={onAboutClick}
        className="ml-auto text-xl text-white hover:text-white/80 active:translate-y-px focus:outline-none"
      >
        About
      </button>
    </header>
  );
}
