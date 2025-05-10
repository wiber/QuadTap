/**
 * Script to check if the webpack dev server port is in use and kill the process if needed
 * This runs before npm start to ensure a clean start
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Default webpack dev server port
const DEFAULT_PORT = 8080;

// Read webpack config to get the actual port if configured
let port = DEFAULT_PORT;
try {
  const webpackConfigPath = path.resolve(__dirname, '../webpack.config.js');
  if (fs.existsSync(webpackConfigPath)) {
    const webpackConfig = require(webpackConfigPath);
    
    // Handle case where webpack config exports a function
    const config = typeof webpackConfig === 'function' 
      ? webpackConfig({}, { mode: 'development' }) 
      : webpackConfig;
    
    if (config.devServer && config.devServer.port) {
      port = config.devServer.port;
    }
  }
} catch (error) {
  console.log(`Could not read webpack config: ${error.message}`);
  console.log(`Using default port: ${DEFAULT_PORT}`);
}

// Also check port 9000 which is commonly used
const ADDITIONAL_PORTS = [9000];

console.log(`Checking if port ${port} is in use...`);

// Function to check if port is in use and kill the process if needed
function checkPortAndKillProcess(portToCheck) {
  try {
    // Different commands for different operating systems
    let command;
    if (process.platform === 'win32') {
      // Windows
      command = `netstat -ano | findstr :${portToCheck}`;
    } else {
      // macOS, Linux
      command = `lsof -i :${portToCheck} | grep LISTEN`;
    }

    const result = execSync(command, { encoding: 'utf8' });
    
    if (result && result.trim()) {
      console.log(`Port ${portToCheck} is in use. Attempting to kill the process...`);
      
      if (process.platform === 'win32') {
        // Extract PID from Windows netstat output
        const pidMatch = result.match(/\s+(\d+)$/m);
        if (pidMatch && pidMatch[1]) {
          const pid = pidMatch[1];
          console.log(`Killing process with PID: ${pid}`);
          execSync(`taskkill /F /PID ${pid}`);
        }
      } else {
        // Extract PID from lsof output
        const pidMatch = result.match(/\S+\s+(\d+)/);
        if (pidMatch && pidMatch[1]) {
          const pid = pidMatch[1];
          console.log(`Killing process with PID: ${pid}`);
          execSync(`kill -9 ${pid}`);
        }
      }
      
      console.log(`Process killed. Port ${portToCheck} is now available.`);
    } else {
      console.log(`Port ${portToCheck} is available.`);
    }
  } catch (error) {
    // If the command fails, it likely means the port is not in use
    console.log(`Port ${portToCheck} is available.`);
  }
}

// Run the check for the main port
checkPortAndKillProcess(port);

// Also check additional ports
ADDITIONAL_PORTS.forEach(additionalPort => {
  console.log(`Checking if port ${additionalPort} is in use...`);
  checkPortAndKillProcess(additionalPort);
});

// Save the port to a temporary file for cleanup script
fs.writeFileSync(path.resolve(__dirname, '.port-temp'), port.toString());

console.log('Port check completed. Starting webpack dev server...');
