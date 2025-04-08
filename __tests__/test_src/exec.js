'use strict';

const { spawn } = require('node:child_process');

function _exec(cmd, args, timeOut, callback) {
  let stdout = '';

  const shell = spawn(cmd, args, { shell: true, timeout: timeOut });

  shell.stdout.on('data', chunk => {
    stdout += chunk;
  });

  shell.stderr.on('data', data => {
    // eslint-disable-next-line no-console
    console.error(`stderr: ${data}`);
  });

  shell.on('close', () => {
    callback(stdout.toString());
  });
}

module.exports = _exec;
