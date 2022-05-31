# react-workflow-cli

- Create component files structure quickly and easily with the CLI.
- Add custom templates to make whatever structure best suits your repo.

## Setup

To setup react-workflow-cli, you need to run:

```bash
# with npm
npm i -g react-workflow-cli

# with yarn
yard global add react-workflow-cli
```

This command will install the CLI globally allowing you to run it in any repo. (Though it is called react-workflow-cli, you can take advantage of the template system to use it for any project)

## Usage

### Initialize a new project

If you need a more advanced experience with the CLI, you will probably want to instantiate the CLI for your current project, so that you will be able to customize your settings and templates.

In order to do that, simply run

```bash
react-workflow-cli init
# or
rwf init
```

This will create a folder `.react-templates` in the path where you run the command.
During the setup, you will be asked a few questions required to create the configuration file.

You will be able to customize the file by editing it directly (`.react-templates/config.json`).

### Manage templates

You can manage the templates by adding/removing/editing the files and folders inside the `.react-templates` directory.
Use `$name` inside of the template directory as a placeholder for the component name. Each `$name` will be replaced with the actual name of the component provided when you run the `add` command.

### Create a new component

To create a new react component, you just need to run:

```bash
react-workflow-cli add <ComponentName>
# or
rwf add <ComponentName>
```

This will create a new component and all of its default dependencies in the default directory **(src/components)**.

### New component with a custom path

In case you don't want to use the default directory, you can pass a custom path as a parameter. This will create the Component in the provided directory.

```bash
react-workflow-cli add <ComponentName> --path my/custom/path
# or
rwf add <ComponentName> -p my/custom/path
```

If you want to have a look at all the functionalities of the the CLI, just run `rwf info`, and all the functionalities will be explained.

## Contribution

Please, feel free to contribute to the project!

Here are some things to be done:

- Add a ability for custom cases (kebab-case, camelCase, etc...)
- Add tests
- Save custom paths to config.json to be used with --path

### Author

Justin Wallace (https://github.com/jpwallace22)

### Contributors

Gabriele Venturi (https://github.com/gventuri)
Valentino Gagliardi (https://github.com/valentinogagliardi/)
