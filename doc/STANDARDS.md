Coding standards and conventions
================================

**Still to come ... This documentation is incomplete.**

 

General file standards are managed through .editorconfig

Typescript code standards are managed through TSLint (in the tslint.json file)

Files and folders are always camelCase except for markdown documentation files
which are CAPITALS.md

Follow function-oriented programming patterns - avoid classes.

Naming standards
----------------

### Classes and Interfaces

Use PascalCase for class and interface names. Do not prefix interfaces with ‘I’

### Variables and functions

Use camelCase for variables and functions.

### Files and folders

Use kebab-case for files and folders.

See the ‘Documentation files’ below for an exception to this rule.

### Unit tests

Unit tests for a module are in the same directory as the module file and with
the same name but with a ".test" suffix before the file extension. For example
the unit tests for the module `sample.ts` has a the filename `sample.test.ts`.

### Documentation Files

Documentation files in markdown are name as all-capitals with the extension in
lowercase. For example `README.md`.

 
