# Exemplo de aplicação em Typescript que gera uma CLI (Comand Line Interface) 

Trata-se de um projeto de estudos utilizando NodeJs e TypeScript para criar uma aplicação de linha de comando.

A descrição utilizada para esse estudo foi retirada do artigo [Criando sua CLI com Node.js](https://medium.com/henriquekuwai/criando-sua-cli-com-node-js-d6dee7d03110) que foi acessado em 18-05-2020.

Foram utilizadas as seguintes bibliotecas para o uso específico do projeto:

* **Commander.js**, que facilita a criação de comandos e manipulação de flags e options (https://github.com/tj/commander.js/)
* **Inquirer.js**, um agrupador de inputs no CLI (para inputar dados, checkboxes, etc) (https://github.com/SBoudrias/Inquirer.js/)
* **Shelljs**, para executar comandos shell via JavaScript (https://github.com/shelljs/shelljs)
* **Chalk**, para facilitar o log de informações coloridas (https://github.com/chalk/chalk)
* **Figletjs**, para logar textos em letras garrafais — e pode ser utilizado em conjunto com o chalk! (https://github.com/patorjk/figlet.js)
* **CLI Table**, para exibir tabelas no terminal (https://github.com/Automattic/cli-table)