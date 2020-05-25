# Exemplo de aplicação em Typescript que gera uma CLI (Comand Line Interface) 

A descrição utilizada para esse estudo foi retirada do artigo [Criando sua CLI com Node.js](https://medium.com/henriquekuwai/criando-sua-cli-com-node-js-d6dee7d03110) que foi acessado em 18-05-2020.

O projeto original do artigo foi feito apenas no arquivo principal index.js e desenvolvido diretamente em JavaScript. E esse estudo tinha como objetivo, além de gerar uma aplicação CLI, desenvolvê-la em TypeScript, aplicar testes de unidade e gerar a cobertura dos testes de unidade do projeto.

Foram utilizadas as seguintes bibliotecas para o uso específico do projeto:

* **Commander.js**, que facilita a criação de comandos e manipulação de flags e options (https://github.com/tj/commander.js/)
* **Inquirer.js**, um agrupador de inputs no CLI (para inputar dados, checkboxes, etc) (https://github.com/SBoudrias/Inquirer.js/)
* **Shelljs**, para executar comandos shell via JavaScript (https://github.com/shelljs/shelljs)
* **Chalk**, para facilitar o log de informações coloridas (https://github.com/chalk/chalk)
* **Figletjs**, para logar textos em letras garrafais — e pode ser utilizado em conjunto com o chalk! (https://github.com/patorjk/figlet.js)
* **CLI Table**, para exibir tabelas no terminal (https://github.com/Automattic/cli-table)

Nesse projeto também foram implentados os mecanismos para execução dos testes de unidade e cobertura utilizando:

* **Mocha**, plataforma para testes de unidade em NodeJs utilizada tanto para JavaScript quanto para TypeScript.
* **Chai**, complemento do Mocha para exeução de Asserts.
* **Sinon**, para fazer os Mocks dos objetos e bibliotecas.
* **IstanbulJs**, para gerar o mapda da cobertura de código.
