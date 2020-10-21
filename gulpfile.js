const { series, parallel, watch } = require('gulp');
const run = require("gulp-run-command").default;

function build() { return run("npm run build")(); }

function startWatch() { watch(["src/**/*.ts"], build); }

exports.watch = startWatch;
exports.default = series(build, startWatch);