# e-commerce

In this project, you will see APIs, implementation of caching, logging, monitoring, searching, authentication, authorization, etc.
This is the project made using:
>NodeJS | ExpressJS | JWT | Sequelize | Winston-logging | Bcrypt | JOI | Sentry-alert

## Official website of Turing e-commerce website:

[![API(data:image/png;base64,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)](https://backendapi.turing.com/docs/#/)

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows/ Ubuntu

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


## Install

    $ git clone https://github.com/rajpriyarj/e-commerce
    $ cd e-commerce
    $ npm install

## Running the project

    $ npm start
