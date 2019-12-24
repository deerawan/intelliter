#!/usr/bin/env node

import * as fs from 'fs';
import * as process from 'process';
import * as childProces from 'child_process';

const [, , ...args] = process.argv;

const fileContent = fs.readFileSync(`${process.cwd()}/.intelliterrc`);
const { ideBinPath, codeStylePath } = JSON.parse(fileContent.toString());

childProces.execSync(`${ideBinPath}/format.sh -s ${codeStylePath} ${args}`);
