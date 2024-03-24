const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, 'public/images');

const res = {}

// 递归读取文件夹中的所有图片文件
function readImagesInDirectory(dir, relativePath = '') {
    let imageList = [];
    // 获取文件夹中的所有文件和子文件夹
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativeFilePath = path.join(relativePath, file);

        // 检查文件的状态
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // 如果是子文件夹，则递归调用readImagesInDirectory函数
            readImagesInDirectory(filePath, relativeFilePath);
        } else if (/\.(jpg|jpeg|png|gif)$/.test(file)) {
            // 如果是图片文件，则将文件名添加到imageList中
            imageList.push(file);
        }
    });
    if (imageList.length > 0) {
        res[relativePath] = imageList
    }
}

// 递归读取目录中的所有图片文件
readImagesInDirectory(directoryPath);

// 将结果写入到一个.json文件中
fs.writeFile("public/imageList.ts", JSON.stringify(res), (err) => {
    if (err) {
        console.log(err);
    }
})
