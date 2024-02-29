### a Introduction to Containers

- [The Command Line](https://tkt-lapio.github.io/command-line/) | FSO

  #### `cp` (copy)
  ```bash
  cp example.txt example2.txt
  ```
  copies the file `example.txt` as a file called `example2.txt` in the current folder.

  ---

  #### `mv` (move)
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

  #### `rm` (remove)
  ```bash
  rm example.txt
  ```
  deletes `example.txt`

  ---

  #### Wild Cards
  ```bash
  mv *.txt example/
  ```
  moves all the files in the current directory ending with `.txt` to a folder caller example

  ---

  #### `cat`
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

  #### grep (search globally for a regular expression and print)
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
