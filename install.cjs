const { execSync, exec } = require('child_process');
const Clean = require('./clean.cjs').Clean
const PreNew = require('./preNew.cjs')
const DeleteEmpty = require('./deleteEmpty.cjs')
const Zip = require('./zip.cjs');

function Install() {
    Clean();//清理安装包
    try {
        console.log('exec: npm cache clean --force')
        execSync('npm cache clean --force'); //清理缓存
    } catch (e) {
        console.log(e)
    }
    try {
        console.log('exec: npm install --force , 时间较长,请等待...')
        exec('npm install --force', (err, stdout, stderr) => {
            if (err) {
                console.log('executing npm install error:', err)
            }
            if (stdout) {
                console.log(stdout)
                PreNew();// 下载最新包
                DeleteEmpty()//删除空包
                Zip()//压缩包
            }
            if (stderr) {
                console.error(stderr)
            }
        })
        // execSync('npm install --force'); // 执行命令（异步）
    } catch (e) {
        console.log(e)
    }

}

module.exports = Install;