# Navigation

This guide covers how to navigate the filesystem using commands and path structures.

## The Root directory (`/`)

The **root directory** is the starting point of the filesystem. It is represented by a single `/` and contains all other directories and files in the system.

## The Home directory (`/home`)

The **home directory** (`/home`) contains a separate folder for each user. A user's personal directory is typically located at:

- `/home/username` for standard users.
- `/root` for the root (administrator) user.

You can access your home directory using:

```bash
cd ~  # Moves to your home directory
```

## Absolute vs. Relative paths

When navigating the filesystem, you can use:

- **Absolute Paths**: Always start from the root `/` and specify the full path.

  ```bash
      cd /home/user/Documents  # Moves to Documents using an absolute path
  ```

- **Relative Paths**: Start from the current directory.
  ```bash
      cd Documents  # Moves into Documents if it's inside the current directory
  ```

## Basic commands

Below is a short list of basic usage of some commands. Refer to the manual (`man` or `help`) for more info about each command.

- `pwd` - Prints the current working directory (full path starting from `/`).
- `ls -a` - Lists all files in a directory, including hidden ones (files starting with `.`).
- `cd <directory>` - Changes to the specified directory.
  ```bash
     cd Downloads  # Moves into the Downloads folder (relative path)
  ```
- `cd ..` – Moves up one level to the parent directory.
- `xdg-open <directory>` - Opens a folder in the file manager (GUI mode, works in most desktop environments).
  ```bash
     xdg-open /  # Opens the root directory in the file explorer
  ```
