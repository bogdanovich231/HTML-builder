const fs = require('fs');
const path = require('path');

function copyDir(srcDir, destDir) {

    fs.mkdir(destDir, (err) => {
        if (err) throw err;
        console.log('Папка создана')
        fs.readdir(srcDir, (err, files) => {
            if (err) throw err;

            files.forEach(file => {
                const srcPath = path.join(srcDir, file);
                const destPath = path.join(destDir, file);

                if (fs.statSync(srcPath).isDirectory()) {
                    copyDir(srcPath, destPath);
                } else {
                    fs.copyFile(srcPath, destPath, (err) => {
                        if (err) throw err;
                    });
                }
            });
        });
    });
}

const srcDir = '04-copy-directory/files';
const destDir = '04-copy-directory/files-copy';

copyDir(srcDir, destDir)