# Man Pages (Manual Pages)

Man pages (short for **manual pages**) are built-in documentation for Unix/Linux commands, system calls, configuration files, and more. They provide detailed explanations of how commands work, their options, and usage examples.

Man pages are a great way to learn Linux commands in-depth.

## How to use Man pages

To access a man page, use the `man` command followed by the command name:

```bash
man ls
```

This will open the manual for the `ls` command.

## Man Page Sections

Man pages are categorized into different sections:

1. **User Commands** (e.g., `ls`, `cd`, `mkdir`)
2. **System Calls** (e.g., `open`, `read`, `write`)
3. **Library Functions** (e.g., `printf`, `malloc`)
4. **Special Files** (Device files in `/dev/`)
5. **File Formats and Configurations** (e.g., `/etc/passwd`)
6. **Games** (e.g., `fortune`)
7. **Miscellaneous** (e.g., macro packages, conventions)
8. **System Administration Commands** (e.g., `iptables`, `mount`)
9. **Kernel Routines** (for developers)

You can specify a section if a command has multiple entries. For example:

```bash
man 2 open
```

This opens the section 2 manual for the `open` system call instead of the `open` user command.

You could run `man man` to take a look at the sections and more `man` info.

## Navigating a Man Page

- **Arrow keys / Page Up / Page Down** – Scroll through the text
- **q** – Quit the man page
- **/keyword** – Search for a term
- **n / N** – Jump to the next/previous search match

## Alternative commands for documentation

- `apropos <keyword>` – Searches man pages for a related keyword
- `<command> --help` – Displays a brief usage guide for many commands

## Synopsis

The SYNOPSIS section in a man page provides a structured way to describe how a command should be used. It typically looks like this:

```bash
command [OPTIONS] ARGUMENTS
```

Each part has a meaning:

1. **command** → The name of the command you run.
2. **[OPTIONS]** → Options (or flags) modify how the command behaves. Options are usually optional and enclosed in **square brackets** `[]`.
3. **ARGUMENTS** → Inputs required by the command, such as filenames or directories. If they are required, they are **not in brackets**.

### Common syntax conventions

| **Symbol** | **Meaning**                    |
| ---------- | ------------------------------ |
| `[ ]`      | Optional items                 |
| `{ }`      | Required items (less common)   |
| `...`      | Can be repeated multiple times |
| `-o`       | Short option (single `-`)      |
| `--option` | Long option (double `--`)      |

### Example SYNOPSIS Breakdown

📌 `ls` **command** (`man ls`)

```bash
ls [OPTION]... [FILE]...
```

**Explanation:**

- `ls` → The command itself.
- `[OPTION]...` → You can provide one or more optional options (e.g., `-l`, `-a`).
- `[FILE]...` → You can list one or more files/directories (optional).

**Example Usage:**

Lists the `/home` directory in long format.

```bash
ls -l /home
```

---

📌 `cp` **command** (`man cp`)

```bash
cp [OPTION]... SOURCE DEST
```

**Explanation:**

- `cp` → The command name.
- `[OPTION]...` → Optional flags (e.g., `-r` for recursive copy).
- `SOURCE` → Required; the file/directory you want to copy.
- `DEST` → Required; the destination where you copy the file/directory.

**Example Usage:**

Copies `file.txt` to `/home/user/`.

```bash
cp file.txt /home/user/
```

---

📌 `tar` **command** (`man tar`)

```bash
tar [OPTION...] [FILE]...
```

**Explanation:**

- `[OPTION...]` → One or more options, like `-c` (create archive) or `-x` (extract).
- `[FILE]...` → One or more files to archive.

**Example Usage:**

Creates a compressed archive of `file1` and `file2`.

```bash
tar -czf archive.tar.gz file1 file2
```

## How to practice?

1. Run `man <command>` and check the **SYNOPSIS** section.
2. Try to break it down using the rules above.
3. Test different commands in your terminal to see how they work.
