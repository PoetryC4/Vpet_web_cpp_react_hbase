const fse = require('fs-extra')

async function copyAssets() {
  try {
    // 删除./dist/static文件夹
    await fse.remove('./dist/static');

    // 将./src/assets文件夹拷贝到./dist中
    await fse.copy('./src/assets', './dist/assets');

    console.log('Assets copied successfully!');
  } catch (error) {
    console.error('Error copying assets:', error);
  }
}

copyAssets();
