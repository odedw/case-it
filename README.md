# caseIt

A simple web tool for text case transformations — UPPER CASE, lower case, PascalCase, camelCase. Designed to work with keyboard shortcuts.

**Live:** https://odedw.github.io/case-it/

## Stack

Vite · React 18 · TypeScript · Tailwind CSS v4 · Playwright. Deployed to GitHub Pages via Actions.

The original 2014 C# MVC version lives in [`legacy/`](./legacy) for posterity.

## Develop

```sh
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the built bundle
npm test          # Playwright E2E tests
```

## Keyboard shortcuts

- `Alt+1..4` — UPPER CASE / lower case / Pascal Case / camel Case
- `Cmd/Ctrl+V` anywhere on the page — paste into the textarea
- `Cmd/Ctrl+C` anywhere on the page — copy the textarea contents

## License

All libraries code is licensed under the corresponding library's license.

The rest of the source code is licensed under the MIT license:
(The MIT License)

Copyright (c) 2014 Oded Welgreen oded_wel@hotmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
