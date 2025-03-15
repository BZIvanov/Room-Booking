# Shell Expansion & Wildcards

This guide covers wildcard patterns and shell expansion techniques that help automate command execution and file operations.

## Wildcards (Globbing)

Wildcards allow matching multiple files using pattern symbols.

- `*` - Matches any number of characters (including none).
  ```bash
  ls *.txt  # Lists all .txt files in the current directory
  ```
- `?` - Matches exactly one character.
  ```bash
  ls config.??  # Matches files like config.ab, config.xy
  ```
- `[]` - Matches a range or set of characters.
  ```bash
  ls pic[0-9].png  # Matches pic1.png, pic2.png, etc.
  ```

## Brace Expansion

Brace expansion generates multiple arguments from a single pattern.

- Expanding a list of values:
  ```bash
  touch file{1,2,3}.txt  # Creates file1.txt, file2.txt, file3.txt
  ```
- Expanding a sequence of numbers:
  ```bash
  echo {1..5}  # Outputs: 1 2 3 4 5
  ```

## Arithmetic Expansion

Arithmetic expansion allows evaluating mathematical expressions inside commands.

- Basic arithmetic operations:
  ```bash
  echo $((4+5))  # Outputs: 9
  ```
- Using variables:
  ```bash
  x=10
  echo $((x*2))  # Outputs: 20
  ```

## Command Substitution

Command substitution allows executing a command and using its output within another command.

- Using `$(command)`:
  ```bash
  echo "Today is $(date)"  # Outputs: Today is Sat Mar 15 12:00:00 UTC 2025
  ```
