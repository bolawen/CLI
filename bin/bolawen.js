#!/usr/bin/env node
const program = require("commander");
const command = require("../lib/core/command");
const option=require('../lib/core/option');
const version=require('../lib/core/version');
option();
command();
version();
program.parse(process.argv);

