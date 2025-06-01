---
title: "Vim and CoC"
date: "2020-05-20"
tags: []
status: "published"
---

Vim is my editor of choice.
I've tried to switch, and although Vim-mode plugins for editors like Visual Studio Code allow you to use your well-earned muscle memory, nothing quite matches the snappiness of Vim in the terminal.

CoC comes pretty close to providing a nice IDE-like experience in Vim. Here are some handy commands...


---

## Handy commands for COC

-   gd - go to definition
-   ctrl-o - return (:help jumplist)
-   :CocConfig - will bring up the coc json config file
-   :CocList snippets - list snippets for current file type

## Getting python linting working:

We need to make sure it picks the right interpreter. To do this, do:

```
:CocCommand python.setInterpreter
```

And pick the interpreter.

It also needs to pick the correct workspace file. You can do it manually like:

-   Run :CocList folders.
-   Press `<cr>` and edit the path to correct folder.
-   Run :CocRestart to restart service.
-   Save a session file to persist workspaceFolders.
-   (https://github.com/neoclide/coc-python/issues/26)

But that’s a pain because you need to manually do it each time.
Instead, we have set our coc-config to look for Pipfile and package.json since they will work well in our monorepo.

More info [here](https://github.com/neoclide/coc.nvim/wiki/Using-workspaceFolders).

## CoC Config

We can always do :CocLocalConfig and put a settings file in each project if we need to.

## Terminal escape key

Ctrl-w

## Relative line numbers

https://www.google.com.au/amp/s/jeffkreeftmeijer.com/vim-number/amp.html

```vim
:set number relativenumber

:augroup numbertoggle
:  autocmd!
:  autocmd BufEnter,FocusGained,InsertLeave * set relativenumber
:  autocmd BufLeave,FocusLost,InsertEnter   * set norelativenumber
:augroup END
```

