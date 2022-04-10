#!/usr/bin/env node

const ip = require('ip');

const find = require('./src/find');

const IP_ADDRESS = process.argv[2] || ip.address();

(async () => {
  const hosts = await find.localIps(IP_ADDRESS);
  hosts.map(host => {
    const info = [];

    info.push(host.ip);
    info.push(`(${host.mac})`);
    if (host.name) info.push(host.name);

    console.log(info.join(' '));
  });
})();
