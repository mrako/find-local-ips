jest.mock('mac-oui-lookup');

const arp = require('@network-utils/arp-lookup');
const ping = require('ping');

const { getVendor } = require('mac-oui-lookup');

const find = require('../src/find');


describe('lookupMacAddress', () => {
  it('should return empty hash if not an ip address', async () => {
    const mac = await find.lookupMacAddress('not.an.ip.address');

    expect(mac).toEqual({});
  });

  it('should return MAC address without lookup', async () => {
    const fakeMac = 'MA:CA:DD:RE:SS:00';
    arp.toMAC = jest.fn().mockReturnValue(fakeMac);

    const mac = await find.lookupMacAddress('192.168.0.1');

    expect(mac).toEqual({ mac: fakeMac });
  });

  it('should return lookup without MAC address', async () => {
    const fakeMac = 'MA:CA:DD:RE:SS:00';
    const fakeName = 'My Raspberry Pi';

    arp.toMAC = jest.fn().mockReturnValue(fakeMac);
    getVendor.mockReturnValue(fakeName);

    const mac = await find.lookupMacAddress('192.168.0.1');

    expect(mac).toEqual({ mac: fakeMac, name: fakeName });
  });
});


describe('checkIpAndPrintInfo', () => {
  it('should return empty if not an ip address', async () => {
    const mac = await find.checkIpAndPrintInfo('not.an.ip.address');

    expect(mac).toEqual(undefined);
  });

  it('should return empty for ip address that does not answer to ping', async () => {
    ping.promise.probe = jest.fn(() => Promise.resolve({ alive: false }));

    const ip = await find.checkIpAndPrintInfo('192.168.0.1');

    expect(ip).toBe(undefined);
  });

  it('should return ip and mac information if ip answers to ping', async () => {
    const fakeMac = 'MA:CA:DD:RE:SS:00';
    const fakeName = 'My Raspberry Pi';

    ping.promise.probe = jest.fn(() => Promise.resolve({ alive: true }));

    arp.toMAC = jest.fn().mockReturnValue(fakeMac);
    getVendor.mockReturnValue(fakeName);

    const ip = await find.checkIpAndPrintInfo('192.168.0.1');

    expect(ip).toEqual({ ip: '192.168.0.1', mac: 'MA:CA:DD:RE:SS:00', name: 'My Raspberry Pi' });
  });
});
