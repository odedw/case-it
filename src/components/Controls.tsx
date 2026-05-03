import type { CaseType } from '../lib/caseUtils';

interface Props {
  keepSpaces: boolean;
  onKeepSpacesChange: (value: boolean) => void;
  onTransform: (caseType: CaseType) => void;
  metaKeyName: string;
}

const buttons: { caseType: CaseType; label: string }[] = [
  { caseType: 'upper', label: 'UPPER CASE' },
  { caseType: 'lower', label: 'lower case' },
  { caseType: 'pascal', label: 'Pascal Case' },
  { caseType: 'camel', label: 'camel Case' },
];

const renderLabel = (label: string, keepSpaces: boolean) =>
  keepSpaces ? label : label.replace(/\s+/g, '');

export function Controls({ keepSpaces, onKeepSpacesChange, onTransform, metaKeyName }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {buttons.map(({ caseType, label }) => (
        <button
          key={caseType}
          type="button"
          data-case={caseType}
          onClick={() => onTransform(caseType)}
          className="flat-btn"
        >
          {renderLabel(label, keepSpaces)}
        </button>
      ))}

      <label className="flex items-center gap-3 mt-4 mb-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={keepSpaces}
          onChange={(e) => onKeepSpacesChange(e.target.checked)}
          className="flat-checkbox"
        />
        <span className="font-bold text-[17px]">keep spaces</span>
      </label>

      <div className="bg-[#343A41] text-white p-3 px-4 mt-2">
        <p className="uppercase font-bold text-lg mb-1">Cheatsheet</p>
        <p className="text-sm leading-snug mb-1">
          {metaKeyName}+v anywhere on the page to paste text
        </p>
        <p className="text-sm leading-snug mb-1">Alt+(1-4) to transform text</p>
        <p className="text-sm leading-snug">
          {metaKeyName}+c anywhere on the page to copy text
        </p>
      </div>
    </div>
  );
}
