const readline = require('readline');
const fs = require('fs');

const fileStream = fs.createWriteStream('text.txt');

console.log('Введите текст или "exit" для выхода:');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {

    if (input.toLowerCase() === 'exit') {

        fileStream.end();
        console.log('Спасибо за информацию!');
        process.exit();
    } else {

        fileStream.write(input + '\n');
    }
});

