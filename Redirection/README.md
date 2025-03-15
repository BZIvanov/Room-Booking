# Redirection

## Standard streams

Standard streams are communication channels between a computer program and its environment.

## Types of Standard Streams

- **Standard Input (stdin)** - Code `0`, receives input from the user or a file.
- **Standard Ouput (stdout)** - Code `1`, prints normal command output.
- **Standard Error (stderr)** - Code `2`, prints error messages.

## How redirection works

Commands receive input from **stdin** and produce output to **stdout** or **stderr**. Redirection allows controlling where this output goes.

## Redirecting Standard Output

- `date > calendar.txt` – Redirects the output of `date` to **calendar.txt**, overwriting its content.
- `date >> calendar.txt` – Appends the output of `date` to **calendar.txt** instead of overwriting.

🔹 **Shortcut:** `>` is actually shorthand for `1>`, meaning standard output redirection. Explicitly, `date 1> calendar.txt` is equivalent to `date > calendar.txt`.

## Redirecting Standard Input

- `cat < input.txt` – Reads from **input.txt** instead of standard input.

🔹 **Shortcut:** `<` is actually shorthand for `0<`, meaning standard input redirection. Explicitly, `cat 0< input.txt` is the same as `cat < input.txt`.

## Redirecting Standard Input and Output

- `cat < input.txt > output.txt` – Reads from **input.txt** and writes the output to **output.txt**.

## Redirecting Standard Error

- `command 2> error.log` – Redirects error messages to **error.log**.
- `command 2>> error.log` – Appends error messages to **error.log**.
- `command > output.txt 2>&1` – Redirects both stdout and stderr to **output.txt**.

## Combining Redirections

- `command &> file.txt` – Shorthand for redirecting both `stdout` and `stderr` to **file.txt** (equivalent to `command > file.txt 2>&1`).
- `command 1> output.log 2> error.log` – Separates `stdout` and `stderr` into different files.
