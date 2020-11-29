#!/usr/bin/env node

const index = require('./index');

(async () => {
  const hosts = await index.findLocalIps(process.argv);
  hosts.map(host => console.log(`${host.ip} (${host.name || host.mac})`));
})();
