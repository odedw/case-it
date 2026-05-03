export type CaseType = 'upper' | 'lower' | 'pascal' | 'camel';

const join = (parts: string[], keepSpaces: boolean) =>
  keepSpaces ? parts.join(' ') : parts.join('');

const capFirst = (word: string) =>
  word.length === 0 ? word : word[0].toUpperCase() + word.slice(1).toLowerCase();

const lowerFirst = (word: string) =>
  word.length === 0 ? word : word[0].toLowerCase() + word.slice(1).toLowerCase();

export function toUpper(text: string, keepSpaces: boolean): string {
  return keepSpaces ? text.toUpperCase() : text.toUpperCase().replace(/\s+/g, '');
}

export function toLower(text: string, keepSpaces: boolean): string {
  return keepSpaces ? text.toLowerCase() : text.toLowerCase().replace(/\s+/g, '');
}

export function toPascal(text: string, keepSpaces: boolean): string {
  const parts = text.split(' ').map(capFirst);
  return join(parts, keepSpaces);
}

export function toCamel(text: string, keepSpaces: boolean): string {
  const parts = text.split(' ').map((word, i) => (i === 0 ? lowerFirst(word) : capFirst(word)));
  return join(parts, keepSpaces);
}

export function applyCase(text: string, caseType: CaseType, keepSpaces: boolean): string {
  switch (caseType) {
    case 'upper':
      return toUpper(text, keepSpaces);
    case 'lower':
      return toLower(text, keepSpaces);
    case 'pascal':
      return toPascal(text, keepSpaces);
    case 'camel':
      return toCamel(text, keepSpaces);
  }
}
