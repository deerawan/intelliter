import * as cpx from 'cpx';
const editJsonFile = require('edit-json-file');
const npmInstallPackage = require('npm-install-package');

export function installDevPackages(packages: string[], name: string) {
  return new Promise((resolve, reject) => {
    npmInstallPackage(
      packages,
      {
        saveDev: true,
      },
      (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      },
    );
  });
}

export function addPackageScripts(entries: ScriptEntry[]) {
  const packageFile = editJsonFile(`${process.cwd()}/package.json`);

  for (const { name, command } of entries) {
    packageFile.set(`scripts.${name}`, command);
  }

  // TODO: add checking if script command exist

  return new Promise((resolve, reject) => {
    packageFile.save((err: Error) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

export function copyPackageTemplate(targetDir: string) {
  const templateDir = `${__dirname}/templates`;

  return new Promise((resolve, reject) => {
    cpx.copy(`${templateDir}/.*`, targetDir, () => resolve());
  });
}

export interface ScriptEntry {
  name: string;
  command: string;
}
