const arp = require('@network-utils/arp-lookup');
const ip = require('ip');
const net = require('net');
const oui = require('oui');
const ping = require('ping');

const lookupMacAddress = async (ipaddress) => {
  if (!net.isIP(ipaddress)) return {};

  const mac = await arp.toMAC(ipaddress);

  try {
    const lookup = oui(mac);

    if (lookup) {
      return { mac, name: lookup.split('\n')[0] };
    }
  } catch (e) {
    console.log(e);
  }

  return { mac };
};

const checkIpAndPrintInfo = async (ipaddress) => {
  try {
    const res = await ping.promise.probe(ipaddress);

    if (res.alive) {
      return Object.assign({}, { ip: ipaddress }, await lookupMacAddress(ipaddress));
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

const findLocalIps = async (args) => {
  const localIp = args[2] || ip.address();

  const addressBlock = localIp.substring(0, localIp.lastIndexOf('.'));

  const ipBlock = [...Array(254).keys()];

  const hosts = await Promise.all(ipBlock.map(async (i) => checkIpAndPrintInfo(`${addressBlock}.${i + 1}`)));

  return hosts.filter(Boolean);
}

module.exports = { findLocalIps, checkIpAndPrintInfo, lookupMacAddress };
