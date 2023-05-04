const fs = require('fs');

fs.readFile('01-read-file/text.txt', 'utf8', (err, txt) => {
    if (err) throw err;
    console.log(txt);
});

