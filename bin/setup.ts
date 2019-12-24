#!/usr/bin/env node

import * as process from 'process';
import * as inquirer from 'inquirer';
import * as ide from '../src/ide';
import * as dependency from '../src/dependency';

const targetDir = process.cwd();

(async () => {
  const binPath = await ide.getIDEBinPath();

  const questions: inquirer.Questions = [
    {
      type: 'input',
      name: 'ide_bin_path',
      message: 'Is this correct Intellij IDE bin path?',
      default: binPath,
    },
    {
      type: 'input',
      name: 'code_style_path',
      message:
        'What is your intellij code style file (must be put in root project folder)?',
      default: 'code-style.xml',
    },
    {
      type: 'confirm',
      name: 'precommit',
      message:
        'Are you going to setup precommit hook using husky and lint-staged?',
      default: true,
    },
  ];

  const answers = await inquirer.prompt(questions);

  let ideBinPath: string;
  if (answers.ide_bin_path) {
    ideBinPath = answers.ide_bin_path;
  }

  let codeStylePath: string;
  if (answers.code_style_path) {
    const scriptEntries = [
      {
        name: 'format',
        command: `intelliter`,
      },
    ];

    codeStylePath = `${process.cwd()}/${answers.code_style_path}`;

    console.log('⚙️ adding `format` commands to package.json scripts');
    await dependency.addPackageScripts(scriptEntries);
  }

  console.log('🗂 saving configuration to .intelliterrc file');
  ide.saveConfigurationFile(ideBinPath, codeStylePath, targetDir);

  if (answers.precommit) {
    const packages = ['lint-staged', 'husky'];
    console.log('📦 installing lint-staged and husky as dev dependencies');
    await dependency.installDevPackages(packages);

    console.log('📑 copying .lintstagedrc and .huskyrc');
    await dependency.copyPackageTemplate(targetDir);
  }

  console.log('✅ finished!');
})();
