#!/usr/bin/env node

const ip = require('./src/ip');
const find = require('./src/find');

const IP_ADDRESS = process.argv[2];

(async () => {
  try {
    const myIp = IP_ADDRESS || (await ip.getEn0IPv4());
    const hosts = await find.localIps(myIp);

    hosts.map((host) => {
      const info = [];

      info.push(host.ip);
      info.push(`(${host.mac})`);
      if (host.name) info.push(host.name);

      console.log(info.join(' '));
    });
  } catch (err) {
    console.error(err.message);
  }
})();
