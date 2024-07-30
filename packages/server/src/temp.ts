import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

// Function to write JSON files
const writeJsonFile = async (filePath, data) => {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(filePath, jsonString);
};

const runMpc = async () => {
    const r1 = [[1, 421], [2, 422], [3, 422], [4, 423], [7, 427]];
    const data1 = { r1 };
    const filePath1 = path.join("./", 'sample1.json');
    const r2 = [[1, 991], [3, 991], [5, 991], [7, 991]];
    const data2 = { r2 };
    const filePath2 = path.join('./', 'sample2.json');

    // Write the JSON files
    await writeJsonFile(filePath1, data1);
    await writeJsonFile(filePath2, data2);

    // Define the command and arguments
    const command = 'mpirun';
    const args = ['-np', '3', '/Users/hishii/Desktop/MT/Secrecy/build/test_join_sail', filePath1, filePath2];
    // Spawn the process
    const process = spawn(command, args);

    // Handle stdout
    process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    // Handle stderr
    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // Handle process exit
    process.on('close', (code) => {
        console.log(`Process exited with code ${code}`);
    });

    // Handle process errors
    process.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
};

// Run the MPC process
runMpc().catch((error) => {
    console.error(`Error running MPC process: ${error.message}`);
});
