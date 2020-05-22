import shelljs from 'shelljs';

export function clear(nomeArquivo: string): void {
    shelljs.rm(nomeArquivo);
}