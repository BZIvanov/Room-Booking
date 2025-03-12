# Command basics

Here, we will learn some basic terminal commands, how to navigate the terminal, and how to use command options and arguments effectively.

## Using keyboard arrows

- The **Left** and **Right** arrow keys move the cursor within a command, allowing you to edit it.
- The **Up** and **Down** arrow keys let you scroll through your command history, making it easy to reuse previous commands.

## Basic commands

Here are some simple commands to help you get started:

- `date` - Displays the current date and time.
- `clear` - Clears the terminal screen.
- `help` - Provides a list of built-in shell commands.

💡 To get detailed information about a specific command, you can use:

- `man <command>` – Opens the manual page for the command (e.g., `man date`).
- `<command> --help` – Displays a quick usage guide for the command (e.g., `date --help`).

## Command Arguments

Some commands require arguments (extra input) to perform a specific action.

Example:

- `echo hello` – Prints `hello` to the terminal.
- `ls /home` – Lists the contents of the `/home` directory.

## Command Options (Flags)

Options modify how a command behaves. They are usually preceded by a `-` (short form) or `--` (long form).

Examples:

- `date -u` – Displays the current date and time in Universal Time Coordinated (UTC).
- `date --universal` – The same as `-u`, but using the long form.

### Short vs. Long form options

Many commands support both short and long forms of options:

- `ls -l` – Lists files in a detailed (long) format.
- `ls --long` – Equivalent to `-l` but using the long form (not all commands have a long version).

### Combining multiple options

You can use multiple options together:

- `ls -lh` – Combines `-l` (long format) and `-h` (human-readable sizes, like KB, MB, GB).
- `date -u -R` – Provides the options separately: `-u` (UTC time) and `-R` (RFC 2822 format), resulting in a UTC timestamp in RFC 2822 format.

## Useful terminal features

### Tab Completion

Pressing the Tab key while typing a command or filename will auto-complete it if possible. If multiple completions exist, pressing Tab twice will show all possibilities.

### Command Chaining

You can execute multiple commands in one line:

- `command1 && command2` – Runs `command2` only if `command1` succeeds.
- `command1 || command2` – Runs `command2` only if `command1` fails.
- `command1 ; command2` – Runs both commands regardless of success or failure.
