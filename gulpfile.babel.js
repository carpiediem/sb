'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';

let root = 'src';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

let resolveToModules = (glob = '') => {
  return path.join(root, 'app/modules', glob); // app/modules/{glob}
};

// map of all paths
let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [resolveToApp('**/*.html'), path.join(root, 'index.html')],
  entry: ['@babel/polyfill', path.join(__dirname, root, 'app/index.js')],
  output: root,
  blankTemplates: {
    component: path.join(__dirname, 'generator', 'component/**/*.**'),
    module: path.join(__dirname, 'generator', 'module/**/*.**'),
  },
  dest: path.join(__dirname, 'dist'),
};

gulp.task(
  'clean',
  gulp.series((cb) => {
    del([paths.dest]).then((paths) => {
      gutil.log('[clean]', paths);

      cb();
    });
  })
);

// use webpack.config.js to build modules
gulp.task(
  'build',
  gulp.series('clean', (cb) => {
    const config = require('./webpack.dist.config');
    config.entry.app = paths.entry;

    webpack(config, (err, stats) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log(
        '[webpack]',
        stats.toString({
          colors: colorsSupported,
          chunks: false,
          errorDetails: true,
        })
      );

      cb();
    });
  })
);

gulp.task(
  'serve',
  gulp.series(() => {
    const config = require('./webpack.dev.config');
    config.entry.app = [
      // this modules required to make HRM working
      // it responsible for all this webpack magic
      'webpack-hot-middleware?reload=true',
      // application entry point
    ].concat(paths.entry);

    var compiler = webpack(config);

    serve({
      port: process.env.PORT || 3000,
      open: false,
      server: { baseDir: root },
      middleware: [
        historyApiFallback(),
        webpackDevMiddleware(compiler, {
          publicPath: config.output.publicPath,
        }),
        webpackHotMiddleware(compiler),
      ],
    });
  })
);
