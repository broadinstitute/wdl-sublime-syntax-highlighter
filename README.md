## [WDL](https://software.broadinstitute.org/wdl/) syntax for Sublime Text Editor and VS Code

This repo provides support for the [Workflow Description Language (WDL)](https://software.broadinstitute.org/wdl/) in [Sublime Text Editor](https://www.sublimetext.com/), 
[Visual Studio Code](https://code.visualstudio.com/), and [GitHub Linguist](https://github.com/github/linguist).

 ### Installation:
 #### Sublime Text:
  * Install [Package Control](https://packagecontrol.io/) package manager for Sublime via [these instructions](https://packagecontrol.io/installation).
  * Use <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on OSX or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Linux to open Command Palette, then select `Package Control: Install Package`.
  * Search for "WDL Syntax" and hit <kbd>Enter</kbd>. 
 
 #### Visual Studio Code:
 * Go to Extensions, search for WDL Syntax Highlighter and install!
 
### Converting WDL.tmLanguage (TextMate) to ACE Editor
Follow steps here [Importing .tmltheme and .tmlanguage Files into Ace](https://github.com/ajaxorg/ace/wiki/Importing-.tmtheme-and-.tmlanguage-Files-into-Ace#importing-textmatesublime-languages)

Note that the conversion is not always perfect. For example, TextMate uses Javascript which does not support look behinds. This must be fixed for the builtin_types lookbehind.
