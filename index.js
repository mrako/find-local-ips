const ping = require('ping');
const ip = require('ip');

const checkIp = async (host, port = 22) => {
  const res = await ping.promise.probe(host);

  if (res.alive) {
    console.log(`alive: ${host}`);
  }
}

(async () => {
  const localIp = ip.address();

  const addressBlock = localIp.substring(0, localIp.lastIndexOf('.'));

  const ipBlock = [...Array(254).keys()];

  ipBlock.map(i => checkIp(`${addressBlock}.${i + 1}`));
})();
