# intelliter

CLI command to setup intellij IDEA formatter for your project [link](https://www.jetbrains.com/help/idea/command-line-formatter.html).

So, you have a choice to use any code editor but still using intellij formatter. 😜

## Install

Go into your project

With `npx`:

```shellsession
npx intelliter-setup
```

The command will ask you some questions such as:

1. Intellij IDEA bin folder path
2. Code style, default is `code-style.xml`
3. Choice to setup precommit hook

Make sure you put intellij code style file to your project.

precommit hook will be configured using:

- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)

## Usage

If you setup precommit hook, it will automatically format your code for staging files when you committing.

Otherwise, you could still run it with

```shellsession
npm run format
```

## License

MIT © [Budi Irawan](https://budiirawan.com)
