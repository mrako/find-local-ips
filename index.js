const arp = require('@network-utils/arp-lookup');
const ip = require('ip');
const oui = require('oui');
const ping = require('ping');

const lookupMacAddress = async (host) => {
  const mac = await arp.toMAC(host);
  const lookup = oui(mac);

  if (lookup) {
    return lookup.split('\n')[0];
  }
  return mac;
};

const checkIpAndPrintInfo = async (host) => {
  const res = await ping.promise.probe(host);

  if (res.alive) {
    console.log(`${host} - ${await lookupMacAddress(host)}`);
  }
};

const findLocalIps = async (args) => {
  const localIp = args[2] || ip.address();

  const addressBlock = localIp.substring(0, localIp.lastIndexOf('.'));

  const ipBlock = [...Array(254).keys()];

  ipBlock.map(i => checkIpAndPrintInfo(`${addressBlock}.${i + 1}`));
}

module.exports = { findLocalIps, checkIpAndPrintInfo, lookupMacAddress };
