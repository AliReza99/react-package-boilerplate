import fs from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
// @ts-expect-error postcss-safe-parser type not added
import safeParser from 'postcss-safe-parser';
import { paths } from './paths';

async function processTailwindAndGenerateSafelist() {
  const css = fs.readFileSync(paths.tailwindSourceFile);
  const result = await postcss([autoprefixer, tailwindcss]).process(css, {
    from: paths.tailwindSourceFile,
  });

  const classNames = extractClassNames(result.css);

  const fileContent = `export const safelist = ${JSON.stringify(Array.from(classNames))};`;

  fs.writeFileSync(paths.safelistFile, fileContent);
}

const extractClassNames = (css: string) => {
  const root = postcss.parse(css, { parser: safeParser } as any);
  const classNames: Set<string> = new Set();

  root.walkRules(rule => {
    rule.selectors.forEach(selector => {
      let finalClassname = selector;
      if (selector.startsWith('.')) {
        finalClassname = selector.slice(1);
      }
      classNames.add(finalClassname.replaceAll('\\', ''));
    });
  });

  return Array.from(classNames);
};

processTailwindAndGenerateSafelist();
