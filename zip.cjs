const { execSync } = require('child_process');
const os = require('os');

function Zip() {

  try {
    const target = `${os.userInfo().homedir}/AppData/Roaming/verdaccio/storage/*`;

    const outputName =  './storage.zip'

    execSync(`7z a "${outputName}" "${target}"`, { stdio: 'inherit' });
    console.log('压缩成功！输出文件:', outputName);
  } catch (error) {
    console.error('压缩失败:', error.message,'请配置7ZIP环境变量');
  }
}

module.exports = Zip;