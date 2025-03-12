# Types of commands

Running `type <command>` in the terminal tells you what kind of command it is. There are several types of commands in Linux.

When you run:

```bash
type cd
```

You might get an output like _cd is a shell builtin_. It tells us that `cd` is a shell built-in command (explained below).

Here are the main types of commands in Linux:

| Type                  | Description                                                                                    | Example                      | Output                     |
| --------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------- |
| **Built-in Commands** | Commands that are part of the shell (e.g., `bash`). They don’t have separate executable files. | `cd`, `echo`, `exit`         | `cd is a shell builtin`    |
| **External Commands** | Commands stored as executable files in system directories (e.g., `/bin`, `/usr/bin`).          | `ls`, `grep`, `cp`           | `ls is /bin/ls`            |
| **Aliases**           | Custom shortcuts for commands.                                                                 | `alias ll='ls -l'`           | `ll is an alias for ls -l` |
| **Functions**         | User-defined shell functions (often in scripts).                                               | `myfunc() { echo "Hello"; }` | `myfunc is a function`     |
| **Keywords**          | Reserved words in the shell (not actual commands).                                             | `if`, `else`, `fi`           | `if is a shell keyword`    |

## Why does this matter?

- **Built-in commands** run faster since they don't require a separate process.
- **External commands** can be replaced or updated without changing the shell.
- **Aliases** help create shortcuts for long or complex commands.
- **Functions** allow scripting and automation

You can also use `command -V <command>` for similar results.
