import { join } from 'path';
import { makeTsProject, templateLocals } from '../../utils';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';

const plugins = <any>gulpLoadPlugins();

import {
  TMP_DIR,
  JS_DEST,
  JS_PROD_APP_BUNDLE
} from '../../config';

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  const tsProject = makeTsProject({
    target: 'es5',
    module: 'commonjs',
    allowJs: true,
    noFallthroughCasesInSwitch: false
  });
  let src = [
    join(TMP_DIR, JS_PROD_APP_BUNDLE)
  ];
  return gulp.src(src)
    .pipe(plugins.typescript(tsProject))
    .pipe(plugins.template(templateLocals()))
//    .pipe(plugins.uglify({
//      mangle: true,
//      compress: true,
//      'screw-ie8': true
//    }))
    .pipe(gulp.dest(JS_DEST));
};
