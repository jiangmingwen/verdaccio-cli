#!/usr/bin/env node

const { Command } = require('commander')
const {Install,PreNew,Clean,DeleteEmpty,Zip} = require('./index')

const Program = new Command()
Program.version('verdaccio 1.0.0').description('verdaccio缓存包的脚本工具')

Program.command('install')
    .description('清理、下载当前包、下载最新包、删除空包、压缩zip包')
    .action(Install)

Program.command('latest')
    .description('下载最新的包')
    .action(PreNew)

Program.command('clean')
    .description('清除工作目录的包和缓存目录的包 ')
    .action(Clean)

Program.command('empty')
    .description('删除空包')
    .action(DeleteEmpty)

Program.command('zip')
    .description('压缩包')
    .action(Zip)

Program.parse(process.argv)