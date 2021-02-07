#!/usr/bin/env node

const ip = require('ip');

const find = require('./src/find');

const IP_ADDRESS = process.argv[2] || ip.address();

(async () => {
  const hosts = await find.localIps(IP_ADDRESS);
  hosts.map(host => console.log(`${host.ip} (${host.name || host.mac})`));
})();
