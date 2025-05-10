/**
 * Script to perform cleanup after webpack dev server is stopped
 * This runs after npm start is terminated
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Performing cleanup after webpack dev server...');

// Function to check and kill processes on a specific port
function checkAndKillProcessOnPort(port) {
  console.log(`Checking for any remaining processes on port ${port}...`);
  
  // Different commands for different operating systems
  let checkCommand;
  if (process.platform === 'win32') {
    // Windows
    checkCommand = `netstat -ano | findstr :${port}`;
  } else {
    // macOS, Linux
    checkCommand = `lsof -i :${port} | grep LISTEN`;
  }
  
  try {
    const result = execSync(checkCommand, { encoding: 'utf8' });
    
    if (result && result.trim()) {
      console.log(`Found processes still using port ${port}. Attempting to kill...`);
      
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
      
      console.log(`Process killed. Port ${port} is now available.`);
    } else {
      console.log(`No processes found using port ${port}.`);
    }
  } catch (error) {
    // If the command fails, it likely means no process is using the port
    console.log(`No processes found using port ${port}.`);
  }
}

// Check if there's a port temp file
const portTempPath = path.resolve(__dirname, '.port-temp');
if (fs.existsSync(portTempPath)) {
  try {
    // Read the port from the temp file
    const port = fs.readFileSync(portTempPath, 'utf8').trim();
    
    // Check the main port
    checkAndKillProcessOnPort(port);
    
    // Also check port 9000 which is commonly used by webpack
    if (port !== '9000') {
      checkAndKillProcessOnPort('9000');
    }
    
    // Delete the temp file
    fs.unlinkSync(portTempPath);
    console.log('Temporary port file removed.');
  } catch (error) {
    console.error(`Error during cleanup: ${error.message}`);
  }
} else {
  console.log('No temporary port file found. Skipping cleanup.');
}

// Check for any zombie Node.js processes related to webpack
try {
  console.log('Checking for any zombie webpack processes...');
  
  let command;
  if (process.platform === 'win32') {
    // Windows - find Node.js processes with webpack in the command line
    command = `wmic process where "commandline like '%webpack%'" get processid`;
  } else {
    // macOS, Linux
    command = `ps aux | grep webpack | grep -v grep`;
  }
  
  const result = execSync(command, { encoding: 'utf8' });
  
  if (result && result.trim() && !result.includes('No Instance(s) Available')) {
    console.log('Found webpack processes that might need cleanup:');
    console.log(result);
    
    // Note: We don't automatically kill these as they might be legitimate
    console.log('If these are zombie processes, you may need to kill them manually.');
  } else {
    console.log('No zombie webpack processes found.');
  }
} catch (error) {
  // If the command fails, it likely means no webpack processes are running
  console.log('No zombie webpack processes found.');
}

console.log('Cleanup completed.');
