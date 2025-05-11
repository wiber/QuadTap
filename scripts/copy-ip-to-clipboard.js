#!/usr/bin/env node

/**
 * Script to capture the external WiFi IP address from the server output
 * and copy it to the clipboard when npm start runs.
 */

const { spawn } = require('child_process');
const { networkInterfaces } = require('os');
const clipboardy = require('clipboardy');

// Get local IP addresses (non-internal)
const getLocalIpAddresses = () => {
  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over internal, non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push({
          name: name,
          address: net.address
        });
      }
    }
  }

  return results;
};

// Get the IP address we want to copy (typically the WiFi connection)
const getTargetIpAddress = () => {
  const ipAddresses = getLocalIpAddresses();
  
  // Debug: Print all available interfaces
  console.log('Available network interfaces:');
  ipAddresses.forEach(ip => {
    console.log(`- ${ip.name}: ${ip.address}`);
  });
  
  // Filter for likely WiFi adapters by name pattern
  // On macOS, en0 is usually WiFi
  const wifiIp = ipAddresses.find(ip => 
    ip.name === 'en0' || // macOS WiFi
    ip.name.toLowerCase().includes('wi') || 
    ip.name.toLowerCase().includes('wl') || 
    ip.name.toLowerCase().includes('en') ||
    ip.name.toLowerCase().includes('wireless')
  );

  // If we found one that looks like WiFi, use it
  if (wifiIp) {
    console.log(`Selected network interface: ${wifiIp.name} (${wifiIp.address})`);
    return wifiIp.address;
  }
  
  // Look for common IP patterns
  const externalIp = ipAddresses.find(ip => 
    ip.address.startsWith('10.') || 
    ip.address.startsWith('192.168.') || 
    ip.address.startsWith('172.')
  );
  
  if (externalIp) {
    console.log(`Selected network interface by IP pattern: ${externalIp.name} (${externalIp.address})`);
    return externalIp.address;
  }
  
  // Otherwise return the second IP if available (often the external interface after loopback)
  if (ipAddresses.length > 1) {
    console.log(`Selected second network interface: ${ipAddresses[1].name} (${ipAddresses[1].address})`);
    return ipAddresses[1].address;
  }
  
  // Fallback to the first non-internal IP
  if (ipAddresses.length > 0) {
    console.log(`Selected first available network interface: ${ipAddresses[0].name} (${ipAddresses[0].address})`);
    return ipAddresses[0].address;
  }
  
  return null;
};

// Main function
async function main() {
  try {
    const ipAddress = getTargetIpAddress();
    
    if (!ipAddress) {
      console.error('Could not detect an external IP address');
      return;
    }
    
    const url = `http://${ipAddress}:8080`;
    
    // Copy the URL to clipboard - fix for the clipboardy v2.3.0 API
    clipboardy.writeSync(url);
    
    console.log(`\n✓ External IP URL copied to clipboard: ${url}\n`);
  } catch (error) {
    console.error('Error copying IP to clipboard:', error);
  }
}

// Run the main function
main(); 