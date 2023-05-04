const fs = require('fs')
const path = require('path');

fs.readdir('03-files-in-folder/secret-folder', (err, data) => {
    data.forEach(file => {
        const filePath = path.join('03-files-in-folder/secret-folder', file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            if (stats.isFile()) {
                console.log(file, '\t\t' + path.extname(file) + '\t\t' + (stats.size / 1024).toFixed(2) + 'Kb');
            }
        });
    });
});


