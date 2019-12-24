import * as process from 'process';
import * as fs from 'fs';

// TODO: support windows
const possibleIDEBinPaths: any = {
  darwin: ['/Applications/WebStorm.app/Contents/bin'],
};

export async function saveConfigurationFile(
  ideBinPath: string,
  codeStylePath: string,
  targetDir: string,
) {
  const content = JSON.stringify({ ideBinPath, codeStylePath }, null, 2);
  fs.writeFileSync(targetDir + '/.intelliterrc', content);
}

/**
 * Get Intellij IDEA bin path depends on operating system
 */
export async function getIDEBinPath() {
  const OS = process.platform;

  if (!possibleIDEBinPaths[OS]) {
    throw new Error('OS is not supported');
  }

  let validPath = '';
  for (const path of possibleIDEBinPaths[OS]) {
    const isExist = fs.existsSync(path);
    if (isExist) {
      validPath = path;
      break;
    }
  }

  return validPath;
}
