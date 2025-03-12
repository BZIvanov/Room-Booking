# Creating files and directories

This guide covers how to create files and directories.

## Basic commands

Below is a list of essential commands for creating files and directories. Refer to the manual (`man <command>` or `<command> --help`) for more details.

- `touch <filename>` - Creates an empty file or updates the timestamp of an existing file.
  ```bash
     touch test.txt  # Creates a file named test.txt
  ```
- `file <filename>` - Displays information about a file's type.
  ```bash
     file test.txt  # Outputs file type, e.g., "ASCII text"
  ```
- `mkdir <directoryname>` - Creates a new directory.
  ```bash
     mkdir App  # Creates a directory named App
  ```
- `mkdir -p <parent/child>` - Creates a directory along with its parent directories if they don't exist.
  ```bash
     mkdir -p Projects/Code  # Creates 'Projects' and 'Code' inside it
  ```
