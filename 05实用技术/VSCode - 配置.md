```json
{
  "workbench.colorTheme": "Solarized Dark",
  "editor.fontSize": 15,

  // terminal
  // 目前 WSL 的 git 的 hooks 还是有 bug
  "terminal.integrated.shell.windows": "C:\\WINDOWS\\Sysnative\\bash.exe",
  // "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
 
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
