const fs = require('fs');
const path = require('path');

const stylesDir = '05-merge-styles/styles';
const projectDir = '05-merge-styles/project-dist';
const projectFile = 'bundle.css';

const styles = [];

fs.readdir(stylesDir, (err, files) => {

    files.forEach(file => {
        const filePath = path.join(stylesDir, file);
        if (path.extname(file) === '.css') {
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error(err);
                    return;
                }

                styles.push(content);
                if (styles.length === files.filter(file => path.extname(file) === '.css').length) {
                    const projectPath = path.join(projectDir, projectFile);
                    fs.writeFile(projectPath, styles.join('\n'), err => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Файл ${projectFile} создан.`);
                    });
                }
            });
        }
    });
});

