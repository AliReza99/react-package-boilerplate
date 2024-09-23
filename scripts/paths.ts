import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const resolveFromRoot = (relativePath: string) => path.resolve(__dirname, '..', relativePath);

export const paths = {
  projectRoot: resolveFromRoot('.'),
  packageJson: resolveFromRoot('package.json'),
  tailwindCssFile: resolveFromRoot('./dist/tailwind.css'),
  safelistFile: resolveFromRoot('./dist/safelist.js'),
};
