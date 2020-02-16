import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function reverseString(str) {
    return [...str].reverse().join('');
}

function run1() {
    rl.on('close', () => rl.close());
    rl.on('line', (input) => console.log(reverseString(input)));
}

// Alternative solution
function run2() {
    process.stdin.on('data', data => {
        let input = data.toString().replace('\n', '');
        process.stdout.write(reverseString(input) + '\n');
    });
}

run1();
// run2();
