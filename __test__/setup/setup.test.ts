// tslint:disable no-console

import { promisify } from 'es6-promisify';
import * as cpx from 'cpx';
import * as fs from 'fs';
import { removeFiles } from '../test-helper';

const editJsonFile = require('edit-json-file');
const inquirerTest = require('inquirer-test');
const copy = promisify(cpx.copy);

const timeout = 25000;
const currentDir = __dirname;
const targetDir = `${currentDir}/execution`;
const cliPath = `${currentDir}/../../src/setup.js`;

// NOTE: must set test folder as working directory
process.chdir(targetDir);
console.log('target directory', process.cwd());

describe('Configure Command', () => {
  let result: any;
  let packageFile: any;

  beforeAll(async () => {
    await prepareTest();
    result = await inquirerTest(
      [cliPath],
      [
        '/Application/mybin',
        inquirerTest.ENTER,
        'my-code-style',
        inquirerTest.ENTER,
        inquirerTest.ENTER,
      ],
    );
    console.log('inquirer result', result);
    packageFile = editJsonFile(`${targetDir}/package.json`);
  }, timeout);

  test('add lint-staged to run in precommit', () => {
    expect(packageFile.get('scripts.precommit')).toEqual('lint-staged');
  });

  test('add lint-staged configuration file', () => {
    const lintStagedFile = fs.statSync(`${targetDir}/.lintstagedrc`);
    expect(lintStagedFile.isFile()).toEqual(true);
  });

  test('add husky configuration file', () => {
    const lintStagedFile = fs.statSync(`${targetDir}/.huskyrc`);
    expect(lintStagedFile.isFile()).toEqual(true);
  });

  test('add format commands', () => {
    expect(packageFile.get('scripts.format')).toEqual(`intelliter`);
  });

  test('check .intelliterrc has correct content', () => {
    const content = fs.readFileSync(`${targetDir}/.intelliterrc`);
    expect(JSON.parse(content.toString())).toEqual({
      ideBinPath: '/Application/mybin',
      codeStylePath: `${targetDir}/my-code-style`,
    });
  });
});

function prepareTest() {
  removeFiles(targetDir);
  return Promise.all([copy(`${currentDir}/fixtures/*.json`, targetDir)]);
}
