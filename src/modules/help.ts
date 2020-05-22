import chalk from 'chalk';
import figlet from 'figlet';

export function help(): void {
    console.log('');
    console.log(chalk.cyan(figlet.textSync('To-Do CLI')));
    console.log('');
}
