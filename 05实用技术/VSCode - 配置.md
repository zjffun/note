# 软件设置

```json
{
  "workbench.colorTheme": "Solarized Dark",
  "editor.fontSize": 15,

  // terminal
  // WSL 用 Remote Development 更好
  // "terminal.integrated.shell.windows": "C:\\WINDOWS\\Sysnative\\bash.exe",
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
 
  // git
  "git.rebaseWhenSync": true,

  // debug
  "debug.allowBreakpointsEverywhere": true,

  // emmet
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "emmet.syntaxProfiles": {
    "javascript": "javascriptreact"
  },
  "emmet.triggerExpansionOnTab": true,

  // eslint
  "eslint.validate": ["javascript", "javascriptreact", "html", "vue"],

  // format
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

# 快捷键

```json
// Place your key bindings in this file to override the defaultsauto[]
[
    // suggest
    {
        "key": "alt+j",
        "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
    },
    {
        "key": "alt+j",
        "command": "toggleSuggestionDetails",
        "when": "suggestWidgetVisible && textInputFocus"
    },
    // view & go
    {
        "key": "alt+up",
        "command": "workbench.action.navigateBack"
    },
    {
        "key": "alt+down",
        "command": "workbench.action.navigateForward"
    },
    {
        "key": "alt+right",
        "command": "workbench.action.nextEditor"
    },
    {
        "key": "alt+right",
        "command": "-workbench.action.navigateForward"
    },
    {
        "key": "alt+left",
        "command": "workbench.action.previousEditor"
    },
    {
        "key": "alt+left",
        "command": "-workbench.action.navigateBack"
    },
    // file & edit
    {
        "key": "alt+s",
        "command": "workbench.action.files.save"
    },
    {
        "key": "alt+q",
        "command": "workbench.action.closeActiveEditor"
    },
    {
        "key": "alt+c",
        "command": "editor.action.clipboardCopyAction",
        "when": "textInputFocus"
    },
    {
        "key": "alt+v",
        "command": "editor.action.clipboardPasteAction",
        "when": "textInputFocus && !editorReadonly"
    },
    {
        "key": "alt+z",
        "command": "undo",
        "when": "textInputFocus && !editorReadonly"
    },
    {
        "key": "shift+alt+z",
        "command": "redo",
        "when": "textInputFocus && !editorReadonly"
    },
    {
        "key": "alt+a",
        "command": "editor.action.selectAll",
        "when": "textInputFocus"
    },
    {
        "key": "alt+f",
        "command": "actions.find"
    },
    {
        "key": "alt+h",
        "command": "editor.action.startFindReplaceAction"
    },
    {
        "key": "alt+n",
        "command": "workbench.action.files.newUntitledFile"
    },
]
```
