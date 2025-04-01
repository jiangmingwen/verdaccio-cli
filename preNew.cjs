const fs = require("fs");
const deleteFolderRecursive = require('./clean.cjs').deleteFolderRecursive

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


function PreNew() {
  console.log('Start to update dependencies to "latest"')
  // 调用函数删除文件夹
  const folderPath = "./node_modules"; // 替换为你要删除的文件夹路径
  deleteFolderRecursive(folderPath, true);

  // 调用函数删除文件
  const filePath = "./package-lock.json"; // 替换为你要删除的文件路径
  deleteFile(filePath);

  // 读取 package.json 文件
  const packageJsonPath = "./package.json"
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  // 更新 dependencies 中的版本号为 latest
  if (packageJson.dependencies) {
    for (const dependency in packageJson.dependencies) {
      packageJson.dependencies[dependency] = "latest";
    }
  }

  // 将更新后的内容写回 package.json 文件
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('All dependencies have been updated to "latest".');
}

module.exports = PreNew;