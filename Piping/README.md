# Piping

Piping (`|`) is used to pass the output of one command as input to another, enabling powerful command chaining in the terminal.

## Basic syntax

Here, `command1` generates output, which becomes the input for `command2`.

```bash
command1 | command2
```

💡 **Tip**: You can combine pipes with redirection for even more control, e.g., `command1 | command2 > output.txt`.

## Examples of Piping

Below, we will introduce some unknown yet commands, but just focus on how pipes are working, not so much on the exact commands we are using.

**Viewing Large Files Efficiently**

Instead of displaying an entire file at once, you can paginate the output:

```bash
cat largefile.txt | less
```

This allows scrolling through the file page by page.

---

**Filtering Output**

Use `grep` to filter specific content from a command’s output:

```bash
ls -l | grep "txt"
```

This lists only files containing "txt" in their name.

---

**Counting Lines, Words, or Characters**

```bash
cat file.txt | wc -l  # Counts lines
cat file.txt | wc -w  # Counts words
cat file.txt | wc -c  # Counts characters
```

---

**Sorting and removing duplicates**

This sorts the file and removes duplicate lines:

```bash
cat names.txt | sort | uniq
```

---

**Chaining Multiple Commands**

This extracts the disk usage percentage for `/dev/sda`:

```bash
df -h | grep '/dev/sda' | awk '{print $5}'
```

## Using `tee` for output duplication

The `tee` command is useful when you want to both display output in the terminal and save it to a file simultaneously.

**Basic Usage of `tee`**

This lists directory contents while also saving them to **output.txt**:

```bash
ls -l | tee output.txt
```

---

**Appending output instead of overwriting**

This appends "New entry" to log.txt without overwriting existing content:

```bash
echo "New entry" | tee -a log.txt
```

---

**Using `tee` in complex pipelines**

This saves the disk usage report to **disk_usage.txt** while also filtering for `/dev/sda`:

```bash
df -h | tee disk_usage.txt | grep '/dev/sda'
```

## Why use pipes?

- **Efficient Data Processing** – No need for temporary files.
- **Command Composition** – Chain multiple commands to refine results.
- **Readable & Concise** – Improves script readability.
- **Duplication with `tee`** – Allows saving output while still passing it down the pipeline.
