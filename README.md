# language-powershell

PowerShell language support.

## Features

- **Grammars**: provides Tree-sitter grammars, built from [tree-sitter-powershell](https://github.com/airbus-cert/tree-sitter-powershell).
- **Syntax highlighting**: cmdlets, parameters, variables and the word operators, with types and automatic variables recognised by name.
- **Folding**: folds script blocks and hashtables.
- **Auto-indentation**: indents inside braces, parentheses and hashtable literals.
- **Symbol navigation**: functions and classes.

## Installation

To install `language-powershell` search for _language-powershell_ in the Install pane of the Lumine settings or run `lumine --install lumine-code/language-powershell`.

## Services

- **hyperlink.injection** (`^1.0.0`): consumed to highlight URLs inside PowerShell files as clickable links.
- **todo.injection** (`^1.0.0`): consumed to highlight `TODO`-style markers inside comments.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
