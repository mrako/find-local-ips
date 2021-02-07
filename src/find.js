const arp = require('@network-utils/arp-lookup');
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
  if (!net.isIP(ipaddress)) return;

  try {
    const res = await ping.promise.probe(ipaddress);

    if (res.alive) {
      return Object.assign({}, { ip: ipaddress }, await lookupMacAddress(ipaddress));
    }
  } catch (e) {
    console.log(e);
  }
};

const localIps = async (ipAddress) => {
  const addressBlock = ipAddress.substring(0, ipAddress.lastIndexOf('.'));

  const ipBlock = [...Array(254).keys()];

  const hosts = await Promise.all(ipBlock.map(async (i) => checkIpAndPrintInfo(`${addressBlock}.${i + 1}`)));

  return hosts.filter(Boolean);
};

module.exports = { localIps, lookupMacAddress, checkIpAndPrintInfo };
