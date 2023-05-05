const fs = require('fs');
const path = require('path');

const templatePath = '06-build-page/template.html';
const componentsPath = '06-build-page/components';
const stylesDir = '06-build-page/styles';
const assetsDir = '06-build-page/assets';
const distDir = '06-build-page/project-dist';
const htmlDist = path.join(distDir, 'index.html');
const cssDist = path.join(distDir, 'style.css');
const assetsDist = path.join(distDir, 'assets');

fs.mkdir(distDir, (err) => {
    if (err) {
        console.error(`Failed to create ${distDir}: ${err}`);
        return;
    }
    console.log(`${distDir} created`);

    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            console.error(`Failed to read ${templatePath}: ${err}`);
            return;
        }

        fs.readdir(componentsPath, (err, files) => {
            if (err) {
                console.error(`Failed to read ${componentsPath}: ${err}`);
                return;
            }

            files.forEach((file) => {
                const filePath = path.join(componentsPath, file);
                const componentName = path.basename(file, '.html');
                const componentTag = `{{${componentName}}}`;

                fs.readFile(filePath, 'utf8', (err, component) => {
                    if (err) {
                        console.error(`Failed to read ${filePath}: ${err}`);
                        return;
                    }

                    template = template.replace(componentTag, component);

                    if (!template.includes(componentTag)) {
                        fs.writeFile(htmlDist, template, (err) => {
                            if (err) {
                                console.error(`Failed to write ${htmlDist}: ${err}`);
                                return;
                            }
                            console.log(`${htmlDist} created`);
                        });
                    }
                });
            });
        });
    });

    const cssFiles = [];

    fs.readdir(stylesDir, (err, files) => {
        if (err) {
            console.error(`Failed to read ${stylesDir}: ${err}`);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(stylesDir, file);

            fs.readFile(filePath, 'utf8', (err, css) => {
                if (err) {
                    console.error(`Failed to read ${filePath}: ${err}`);
                    return;
                }

                cssFiles.push(css);

                if (cssFiles.length === files.length) {
                    const cssContent = cssFiles.join('\n');

                    fs.writeFile(cssDist, cssContent, (err) => {
                        if (err) {
                            console.error(`Failed to write ${cssDist}: ${err}`);
                            return;
                        }
                        console.log(`${cssDist} created`);
                    });
                }
            });
        });


    });
    function copyDir(srcDir, destDir) {

        fs.mkdir(destDir, (err) => {
            if (err) throw err;

            fs.readdir(srcDir, (err, files) => {
                if (err) throw err;

                files.forEach(file => {
                    const srcPath = path.join(srcDir, file);
                    const destPath = path.join(destDir, file);

                    fs.stat(srcPath, (err, stats) => {
                        if (err) throw err;

                        if (stats.isDirectory()) {
                            copyDir(srcPath, destPath);
                        } else {
                            fs.copyFile(srcPath, destPath, (err) => {
                                if (err) throw err;
                            });
                        }
                    });
                });
            });
        });
    }
    copyDir(assetsDir, assetsDist)
    console.log("The directory has been copied")
})

