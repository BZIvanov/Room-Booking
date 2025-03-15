# Working with files

## Basic commands

Below is a list of essential commands for working with files. Refer to the manual (`man <command>` or `<command> --help`) for more details.

### Viewing file contents

- `cat test.txt` – Prints the content of **test.txt** (also used for concatenating files).
- `tac test.txt` – Prints the content of **test.txt** in reverse order (last line first).
- `less test.txt` - Allows viewing large files one page at a time with navigation controls.

💡 Tip: Use **less** instead of **cat** for large files to prevent excessive scrolling.

### Printing specific parts of a file

- `head test.txt` - Prints the first 10 lines of a file (default behavior).
- `tail test.txt` - Prints the last 10 lines of a file (default behavior).
- `tail -f logs` - Follows the file and displays new content as it is added (useful for monitoring log files).

### Analyzing and sorting files

- `wc test.txt` - Displays the number of **lines**, **words**, and **bytes** in the file.
- `sort test.txt` - Sorts the lines in **test.txt** alphabetically.
