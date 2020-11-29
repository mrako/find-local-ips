const arp = require('@network-utils/arp-lookup');
const ip = require('ip');
const oui = require('oui');
const ping = require('ping');

const localIp = process.argv[2] || ip.address();

const macLookup = async (host) => {
  const mac = await arp.toMAC(host);
  const lookup = oui(mac);

  if (lookup) {
    return lookup.split('\n')[0];
  }
  return mac;
};

const checkIp = async (host, port = 22) => {
  const res = await ping.promise.probe(host);

  if (res.alive) {
    console.log(`${host} - ${await macLookup(host)}`);
  }
};

(async () => {
  const addressBlock = localIp.substring(0, localIp.lastIndexOf('.'));

  const ipBlock = [...Array(254).keys()];

  ipBlock.map(i => checkIp(`${addressBlock}.${i + 1}`));
})();
