#!/usr/bin/env node
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .commandDir("cmds")
  .help('h')
  .alias('h', 'help')
  .argv