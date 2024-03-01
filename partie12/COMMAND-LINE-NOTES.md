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
