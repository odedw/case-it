interface Props {
  visible: boolean;
}

export function CopyToast({ visible }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="copy-toast"
      className={`absolute -top-[52px] right-0 w-full sm:w-[23%] h-8 leading-8 text-center font-bold bg-[#2ECC71] text-white transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      Text Copied to clipboard
    </div>
  );
}
