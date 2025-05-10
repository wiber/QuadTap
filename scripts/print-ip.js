/**
 * Print IP Addresses Script
 * Prints available IP addresses for accessing the server, similar to http-server
 */

const os = require('os');
const chalk = require('chalk') || { greenBright: text => `\x1b[32m${text}\x1b[0m`, blueBright: text => `\x1b[34m${text}\x1b[0m` };
const DEFAULT_PORT = 8080;

// Get IP addresses
function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  Object.keys(interfaces).forEach(interfaceName => {
    interfaces[interfaceName].forEach(iface => {
      // Skip internal/non-IPv4 addresses
      if (iface.internal || iface.family !== 'IPv4') return;
      addresses.push(iface.address);
    });
  });

  return addresses;
}

// Print server URLs
function printServerURLs(port = DEFAULT_PORT) {
  const addresses = getNetworkAddresses();
  
  console.log('\n');
  console.log('Available on:');
  console.log(chalk.greenBright(`  http://localhost:${port}`));
  
  addresses.forEach(address => {
    console.log(chalk.greenBright(`  http://${address}:${port}`));
  });
  
  console.log('\n');
  console.log(chalk.blueBright('Starting webpack-dev-server...'));
  console.log('\n');
}

printServerURLs(); 