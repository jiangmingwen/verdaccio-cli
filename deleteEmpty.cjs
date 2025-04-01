const fs = require('fs');
const path = require('path');
const os = require('os');

// 递归遍历目录并删除不符合条件的 package.json 文件
function cleanPackageJsonFiles(rootDir) {
  // 递归遍历目录
  function traverseDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);

    items.forEach((item) => {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // 如果是目录，递归处理
        traverseDirectory(itemPath);
      } else if (item === 'package.json') {
        // 如果是 package.json 文件，检查同级目录是否有 .tgz 文件
        const packageDir = path.dirname(itemPath);
        const tgzFiles = fs
          .readdirSync(packageDir)
          .filter((file) => file.endsWith('.tgz'));

        if (tgzFiles.length === 0) {
          // 如果没有 .tgz 文件，删除 package.json
          fs.unlinkSync(itemPath);
          console.log(`Deleted ${itemPath} because no .tgz file was found.`);
        }
      }
    });
  }
  // 开始递归遍历
  traverseDirectory(rootDir);
}



function DeleteEmpty(){
const rootDir = `${os.userInfo().homedir}/AppData/Roaming/verdaccio/storage`; 
try {
  cleanPackageJsonFiles(rootDir);
  console.log('Cleanup completed.');
} catch (error) {
  console.error('Error during cleanup:', error.message);
}
}

module.exports = DeleteEmpty;