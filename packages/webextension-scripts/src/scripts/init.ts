import fs from 'fs-extra';

import { packageJson } from '../utils/packageJson';
import * as paths from '../utils/paths';

packageJson.scripts = {
  start: 'webextension-scripts start',
  build: 'webextension-scripts build',
};

fs.outputJsonSync(paths.extPackageJson, packageJson, { spaces: 2 });

fs.copySync(paths.templatesGitignore, paths.extGitignore);
fs.copySync(paths.templatesReadme, paths.extReadme);

const dependencies = packageJson.dependencies || {};

if (dependencies.react && dependencies.typescript) {
  fs.copySync(paths.templatesReactTypescript, paths.extSrc);
  fs.copySync(paths.templatesEnvTypes, paths.extEnvTypes);
} else if (dependencies.react) {
  fs.copySync(paths.templatesReact, paths.extSrc);
} else if (dependencies.typescript) {
  fs.copySync(paths.templatesTypescript, paths.extSrc);
} else {
  fs.copySync(paths.templatesJs, paths.extSrc);
}
