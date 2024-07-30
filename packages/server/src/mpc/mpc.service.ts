import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MpcService {
  async runMpc(data1: any, data2: any): Promise<string> {
    const filePath1 = path.join(process.cwd(), 'sample1.json');
    const filePath2 = path.join(process.cwd(), 'sample2.json');
    const jsonString1 = JSON.stringify({ data1 }, null, 2);
    const jsonString2 = JSON.stringify({ data2 }, null, 2);

    await fs.promises.writeFile(filePath1, jsonString1);
    await fs.promises.writeFile(filePath2, jsonString2);

    return new Promise((resolve, reject) => {
      const command = 'mpirun';
      const args = ['-np', '3', './test_join_sail', filePath1, filePath2];
      
      const mpcProcess = spawn(command, args);

      let output = '';

      mpcProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      mpcProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      mpcProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Process exited with code ${code}`);
        }
      });

      mpcProcess.on('error', (error) => {
        reject(`Error: ${error.message}`);
      });
    });
  }
}
