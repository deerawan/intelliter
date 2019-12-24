import * as fs from 'fs';

const fileName = '.intelliterrc';

/**
 * Save config file contain formatter settings
 * @param ideBinPath
 * @param codeStylePath
 * @param targetDir
 */
export async function saveConfigFile(
  ideBinPath: string,
  codeStylePath: string,
  targetDir: string,
) {
  const content = JSON.stringify({ ideBinPath, codeStylePath }, null, 2);
  fs.writeFileSync(`${targetDir}/${fileName}`, content);
}

/**
 * Append config file to .gitignore because each local development
 * can have different IDE installation and path directory
 * @param targetDir
 */
export async function appendConfigFileToGitIgnore(targetDir: string) {
  fs.appendFileSync(`${targetDir}/.gitignore`, fileName);
}
