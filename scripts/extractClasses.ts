import postcss from 'postcss';
// @ts-expect-error postcss-safe-parser type not added
import safeParser from 'postcss-safe-parser';
import { readFileSync, writeFileSync } from 'fs';
import { paths } from './paths';

const extractClassNames = (cssFilePath: string) => {
  const css = readFileSync(cssFilePath, 'utf8');

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

  return classNames;
};

const classNames = extractClassNames(paths.tailwindCssFile);

const fileContent = `export const safelist = ${JSON.stringify(Array.from(classNames))};`;

writeFileSync(paths.safelistFile, fileContent);
