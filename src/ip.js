const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

const getEn0IPv4 = async () => {
  try {
    const { stdout } = await execAsync('ipconfig getifaddr en0');
    return stdout.trim();
  } catch (error) {
    throw new Error(`Error fetching IP address: ${error.message}`);
  }
}

module.exports = { getEn0IPv4 };
