const fs = require("fs");
const path = require("path");
const os = require('os');
const fsExtra = require('fs-extra');
/**
 * 递归删除文件夹及其内容
 * @param {string} dirPath - 要删除的文件夹路径
 */
function deleteFolderRecursive(dirPath, isDeleteFolder) {
  if (fs.existsSync(dirPath)) {
    // 删除空文件夹
    if (isDeleteFolder) {
      fsExtra.removeSync(dirPath);
    } else {
      // 读取文件夹内容
      fs.readdirSync(dirPath).forEach((file) => {
        const curPath = path.join(dirPath, file);

        // 如果是文件夹，递归删除
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath, true);
        } else {
          // 如果是文件，直接删除
          fs.unlinkSync(curPath);
          console.log(`Deleted file: ${curPath}`);
        }
      });
    }
    console.log(`Deleted folder: ${dirPath}`);
  } else {
    console.warn(`Warning: Folder does not exist: ${dirPath}`);
  }
}

/**
 * 删除指定文件
 * @param {string} filePath - 要删除的文件路径
 */
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    // 删除文件
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${filePath}`);
  } else {
    console.warn(`Warning: File does not exist: ${filePath}`);
  }
}


function Clean() {
  // 调用函数删除文件夹
  const folderPath = "./node_modules"; // 替换为你要删除的文件夹路径
  deleteFolderRecursive(folderPath, true);

  const startDirectory = `${os.userInfo().homedir}/AppData/Roaming/verdaccio/storage`;
  deleteFolderRecursive(startDirectory, false);

  // 调用函数删除文件
  const filePath = `./package-lock.json`; // 替换为你要删除的文件路径
  deleteFile(filePath);
  const pnpmLockFile = `./pnpm-lock.yaml`; // 替换为你要删除的文件路径
  deleteFile(pnpmLockFile);
}


module.exports = {
  Clean,
  deleteFolderRecursive
};