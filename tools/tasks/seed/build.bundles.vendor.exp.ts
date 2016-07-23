import { join } from 'path';

const nodeResolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup').rollup;

import {
  BOOTSTRAP_MODULE,
  JS_PROD_APP_BUNDLE,
  TMP_DIR
} from '../../config';

class RollupNG2 {
  options: any;
  constructor(options?: any) {
    this.options = options;
  }
  resolveId(id: string, from: string) {
    if (id.startsWith('rxjs/')) {
      return `${__dirname}/../../../node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
    }
    return undefined;
  }
}

const rollupNG2 = (config?: any) => new RollupNG2(config);

const rollupConfig = {
  entry: join(TMP_DIR, 'app', 'vendor.ts'),
  plugins: [
    rollupNG2(),
    nodeResolve({
      jsnext: true, main: true
    })
  ]
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  return rollup(rollupConfig)
    .then((bundle: any) => {
      return bundle.write({
        format: 'iife',
        moduleName: 'vendor',
        dest: join(TMP_DIR, 'app', 'vendor.2015.js')
      });
    });
};
