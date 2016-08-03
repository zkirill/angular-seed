import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.SYSTEM_CONFIG = {
      defaultJSExtensions: true,
      packageConfigPaths: [
        `/node_modules/*/package.json`,
        `/node_modules/**/package.json`,
        `/node_modules/@angular/*/package.json`
      ],
      paths: {
        [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
        '@angular/common': `node_modules/@angular/common/bundles/common.umd.js`,
        '@angular/compiler': `node_modules/@angular/compiler/bundles/compiler.umd.js`,
        '@angular/core': `node_modules/@angular/core/bundles/core.umd.js`,
        '@angular/forms': `node_modules/@angular/forms/bundles/forms.umd.js`,
        '@angular/http': `node_modules/@angular/http/bundles/http.umd.js`,
        '@angular/platform-browser': `node_modules/@angular/platform-browser/bundles/platform-browser.umd.js`,
        '@angular/platform-browser-dynamic': `node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js`,
        '@angular/router': `node_modules/@angular/router/index.js`,
        firebase: 'node_modules/firebase/firebase-browser.js',
        'rxjs/*': `node_modules/rxjs/*`,
        'app/*': `/app/*`,
        '*': `node_modules/*`
      },
      packages: {
        rxjs: { defaultExtension: 'js' }
      }
    };


    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
