#!/usr/bin/env node

const index = require('./index');

(async () => {
  await index.findLocalIps(process.argv);
})();
