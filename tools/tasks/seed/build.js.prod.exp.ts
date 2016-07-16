import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import { TMP_DIR } from '../../config';
import { makeTsProject } from '../../utils';

const plugins = <any>gulpLoadPlugins();

const INLINE_OPTIONS = {
  base: TMP_DIR,
  useRelativePaths: true,
  removeLineBreaks: true
};

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */

export = () => {
  let tsProject = makeTsProject({
    target: 'es6',
    module: 'es6',
    moduleResolution: 'node'
  });
  let src = [
    'typings/globals/node/index.d.ts',
    join(TMP_DIR, '**/*.ts'),
    '!' + join(TMP_DIR, '**/typings.d.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
    .pipe(plugins.typescript(tsProject))
    .once('error', function () {
      this.once('finish', () => process.exit(1));
    });


  return result.js
    .pipe(gulp.dest(TMP_DIR));
};
