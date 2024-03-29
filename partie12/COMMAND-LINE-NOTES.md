# [The Command Line](https://tkt-lapio.github.io/command-line/)

  ### `mkdir` (make directory)
  ```bash
  mkdir -p test/example
  ```
  `-p` will recursively create any missing folders in the path you provide.

  ---
  
  ### `cp` (copy)
  ```bash
  cp example.txt example2.txt
  ```
  copies the file `example.txt` as a file called `example2.txt` in the current folder.

  ---

  ### `mv` (move)
  ```bash
  mv exmple.txt example.txt
  ```
  renames the file `exmple.txt` to `example.txt`.
  ```bash
  mv example.txt ~
  ```
  moves the file `example.txt` from the current folder to the home folder.
  ```bash
  mv exmple.txt ~/example.txt
  ```
  renames the file `exmple.txt` from the current folder to `example.txt` and moves it to the home folder.

  ---

  ### `rm` (remove)
  ```bash
  rm example.txt
  ```
  deletes `example.txt`

  ---

  ### Wild Cards
  ```bash
  mv *.txt example/
  ```
  moves all the files in the current directory ending with `.txt` to a folder caller example

  ---

  ### `du` (disk usage)
  ```sh
  du -h *
  ```
  displays the size of each file in the dir in a human readable way `-h`

  ---

  ### `cat`
  ```bash
  user@hal9000:~/esimerkki$ cat example.txt
  i am 
  inside
  the example file
  ```
  prints out the contents of a text file

  Using `head` or `tail` one can print only a specific amount of lines from the beginning or end of a file. The amount of lines printed is given to a parameter for the flag `-n`.
  ```bash  
  user@hal9000:~/example$ tail -n 1 example.txt
  the example file
  user@hal9000:~/example$ head -n 1 example.txt
  i am
  ```

  ---

  ### grep (search globally for a regular expression and print)
  filter out specific lines from a file based on some criteria. By default grep returns all the lines which contain the exact string given as an argument.
  ```bash
  user@hal9000:~/example$ cat diary.txt
  October 6th
  
  Dear diary,
  
  I can't wait to tell you all my secrets. 
  
  Today was a good day. I was appointed the secretary of my student association.
  
  I won't be secretive, I'm so happy!
  
  I'll write again soon.
  user@hal9000:~/example$ grep "secret" diary.txt 
  I can't wait to tell you all my secrets. 
  Today was a good day. I was appointed the secretary of my student association.
  I won't be secretive, I'm so happy!
  ```

  The true power of tools like `grep` comes out when it is paired with other commands. The output of another command can be passed on to another command with the operator `|`, usually called _the pipe_. With the pipe you can do more complicated operations which require several programs with just one line.
  ```bash
  user@hal9000:~/example$ ls
  example.txt note2.txt note.txt
  user@hal9000:~/example$ ls | grep note
  note2.txt
  note.txt
  ```

  Large outputs should be written to files in order to access them fully. This can be done with the operator >, which takes the name of the file to be written as an argument. For example ls > listing.txt moves the file listing to a file called “listing.txt”, creating the file if it doesn’t already exist.

  ```bash
  user@hal9000:~/example$ ls 
  Applications	Library		      Pictures	      kissakuvia
  Desktop		    Linus_Torvalds	Public          script.sh
  Documents	    Movies	        Downloads	Music
  user@hal9000:~/example$ ls | grep Do
  Documents
  Downloads
  user@hal9000:~/example$ ls > listing.txt
  user@hal9000:~/example$ grep Do listing.txt 
  Documents
  Downloads
  user@hal9000:~/example$
  ```
  The operator `>` overwrites the contents of the file with the given text and `>>` appends them to a new line, not affecting the old contents.

  ---

  ### Permissions

  The permissions and ownerships of a file can be seen with the flag `-l` of the command `ls`.
  ```
  user@hal9000:~/example$ ls -l
  total 8
  -rw-r--r-- 1 user user 16 Jun 31 21:41 example.txt
  -rwxr--r-- 1 user user 0 Jun 14 17:25 notes.txt
  -r--r--r-- 1 user user 0 Jun 3 23:13 article.txt
  drwx------ 2 user user 130 Jun 14 17:54 diart
  ```
  The first letter is either `-` or `d`, which tells if the resource is a file `-` or a directory `d`. There are also other types of files, but these are the most common. The following nine symbols are reserved for the permissions themselves. The permissions are always marked in the same order: read (r), write (w) and execute (x). The first three symbols describe the permissions of the owner. If there is a dash `-` at the place of a specific permission, the permission is missing, i.e. it has not been given.
  <div align="center">
    
  ![permission-exp](https://github.com/yousefelassal/fullstackopen/assets/76617202/8daabe7e-8194-427e-b4ae-83d673a4a614)

  </div>

  #### `chmod` (change mode).
  alter permissions.

  The symbols desribing the permissions is built using the following components:
  
  - `r` = read permission
  - `w` = write permission
  - `x` = execute permission
  - `u` = owner of the file
  - `g` = users belonging to the group of the file
  - `o` = all other users
  If the recipient of permissions is not defined, the permissions are given to all user groups (owner, group and others).
  
  The dash symbol `-` removes a permission and the plus sign `+` gives a permission.
  
  ```
  chmod u+x example.txt
  ```
  gives the owner of the file execute permission.
  
  ```
  chmod o-w example.txt
  ```
  removes other users the write permission.
  
  ```
  chmod go+r example.txt
  ```
  gives the group of the file and other users the permission to read the file.
  
  ```
  user@hal9000:~/example$ chmod -r example.txt
  user@hal9000:~/example$ cat example.txt
  cat: example.txt: Permission denied
  user@hal9000:~/example$ chmod +r example.txt
  user@hal9000:~/example$ cat example.txt
  paras
  example
  user@hal9000:~/example$ chmod o+w example.txt
  user@hal9000:~/example$ ls -l
  total 8
  -rw-r--rw- 1 user user 16 Jun 31 21:41 example.txt
  -rw-r--r-- 1 user user 0 Jun 14 17:25 note2.txt
  -rw-r--r-- 1 user user 0 Jun 3 23:13 note.txt
  drw-r--r-- 1 user user 130 Jun 14 17:54 diary
  ```

  ---

  - `watch`: repeat a command in certain intervals
  - `&&` tai `;`: chain several commands
  - `alias`: define an alias for a command. For example you can define a shorter version for a long and complicated command.
  - `&`: ending a command with this will make sure the command line will not be locked as the process will be moved to the background
  - `history`: view your command history
  - `Ctrl` + `r`: find commands you have run previously

  ---

  ### vim
  ```bash
  vim example.txt
  ```
  edit file with insert mode, 
  `:wq` write and quit

  #### Opening Multiple Windows
  launch Vim on split horizontal and vertical windows with the `-o` and `-O` options, respectively.
  ```
  vim -o2 example.txt example2.txt
  ```

  **Switching Focus**: Press `Ctrl` + `W` followed by either `h`, `j`, `k`, or `l` to switch focus between the split screens.

  ```
  vim -O *
  ```
  opens all files in the current dir in vertical screens.

  The most basic motion unit is moving one character left, down, up, and right.
  ```
  h   Left
  j   Down                  k
                          h   l
  k   Up                    j
  l   Right
  ```

  ```
  w     Move forward to the beginning of the next word
  e     Move forward one word to the end of the next word
  b     Move backward to beginning of the previous word
  ```
  #### Basic Find and Replace:
  The general form of the substitute command is as follows:
  ```vim
  :[range]s/{pattern}/{string}/[flags] [count]
  ```
  - `[range]`: Optional. Specifies the range of lines where the search and replace should occur. If omitted, it operates only on the current line.
  - `{pattern}`: The text you want to search for.
  - `{string}`: The replacement text.
  - `[flags]`: Optional. Flags modify the behavior (e.g., g for global replacement).
  - `[count]`: Optional. A positive integer that multiplies the command (useful for multiple replacements).

  #### selecting text
  - `v` (lower case v) begins regular Visual mode, and works similar to selecting text with a mouse. Use `h` and `l` to expand the selection left and right to include more words, and use `j` and `k` to expand the selection to the lines below and above.
  - `V` (upper case v) begins linewise visual mode. This selects entire lines of text at a time. Use `j` and `k` to expand the selection up and down.
  - `Ctrl`+`v`(lower case v) enters block visual mode. This selects text in a block format, allowing you to select parts of multiple lines without including the entire line. Use `hjkl` as usual.

  Once you have selected the text you want, you can use all sorts of commands on them. Some of the more useful ones are:
  
  - `Esc`ape visual mode
  - `d`elete the text
  - `y`ank (copy) the text
  - `p`aste your clipboard onto the text, replacing it
  - `c`hange the text, which deletes it and sets your cursor for typing
  - `r`eplace the text with the next character you type
