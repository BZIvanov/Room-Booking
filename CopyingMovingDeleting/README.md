# Copying, Moving and Deleting files and directories

## Basic commands

Below is a list of essential commands for managing files and directories. Refer to the manual (`man <command>` or `<command> --help`) for more details.

### Moving and renaming files

- `mv index.js src/app/` – Moves the file **index.js** to the specified destination **src/app/**.
- `mv index.ts server.ts` – Renames **index.ts** to **server.ts**, as long as **server.ts** does not already exist.

### Copying files

- `cp Component.tsx ~/Project/src/` – Copies **Component.tsx** to the **Project/src/** directory inside the home folder.
- `cp -r assets ~/Backup/` – Recursively copies the **assets** directory and its contents to **~/Backup/**.

### Deleting files and directories

- `rm test.txt` – Permanently deletes the file **test.txt**.
- `rm -r demo-project/` – Deletes the **demo-project/** directory along with its contents.
- `rmdir empty-folder/` – Removes an empty directory named **empty-folder/** (fails if the directory is not empty).

💡 Tip: Use `rm -i <filename>` for interactive deletion to confirm before removing a file.
