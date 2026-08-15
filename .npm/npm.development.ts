// This file is responsible for defining development specific dependencies. See: https://github.com/mainframenzo/ts-npm
const npmPackage: any = {
  dependencies: {},
  devDependencies: {
    //'shx': '0.3.4', // Used to invoke cross-platform build commands. @deprecated - used by legacy makefile.
    //'cross-env': '5.2.1', // Used to set cross-platform env variables. @deprecated - used by legacy makefile.
    'vite': '8.0.14', // Used as dev server and build tool.
    '@vitejs/plugin-basic-ssl': '2.3.0', // Used for local development on host OS to keep URL same for when on guest OS with nginx
    'concurrently': '7.5.0', // Used to invoke multiple watch commands concurrently.
    'onchange': '7.1.0', // Used to watch for source changes.
    'ts-command-line-args': '2.5.1', // Used to process CLI args.
  }
}

export default { npmPackage }
