---
layout: post
title:  "Java HTTP Server - BufferedReaders & BufferedWriters"
date:   2013-02-20 10:55:45
---

This past week I was tasked with writing an HTTP server in Java, in the process learning a ton about Sockets, ServerSockets, InputStreams, OutputStreams, <a href="http://docs.oracle.com/javase/6/docs/api/java/io/BufferedWriter.html">BufferedWriters</a> and <a href="http://docs.oracle.com/javase/6/docs/api/java/io/BufferedReader.html">BufferedReaders</a>.

<a href="http://docs.oracle.com/javase/6/docs/api/java/io/BufferedReader.html">BufferedReaders</a> and <a href="http://docs.oracle.com/javase/6/docs/api/java/io/BufferedWriter.html">BufferedWriters</a> will read or write using memory to hold information temporarily, avoiding unnecessary (and costly) system calls. Let's look at some code that doesn't use either of these buffered classes:
<pre><code>File newFile = new File("foobar.txt");
FileWriter fileWriter = new fileWriter(newFile);
for(int i  = 0; i &lt; 20; i++) {
  fileWriter.write("Some text");
}
fileWriter.close();
</code></pre>
So what is this code <em>really</em> doing? <a href="http://docs.oracle.com/javase/6/docs/api/java/io/FileWriter.html">FileWriter</a> does exactly what the name implies; writing some data to a file. The problem is that this code will make a system call every time we <em>write();</em> something to the file. In this case, our code would make 20 system calls. Then imagine you had a file that had a thousand lines of text. You'd then have to make 1000 system calls. That's not really very scalable, especially for an HTTP server which should be able to communicate with multiple clients simultaneously.

Let's wrap our original FileWriter with a BufferedWriter:
<pre><code>File newFile = new File("foobar.txt");
FileWriter fileWriter = new FileWriter(newFile);
BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
for(int i  = 0; i &lt; 20; i++) {
  bufferedWriter.write("Some text");
}
bufferedWriter.flush();
bufferedWriter.close();
</code></pre>
Our BufferedWriter will now only write to the file when the buffer fills (or <em>flush();</em> is called), thus increasing efficiency by eliminating unnecessary system calls. I've found the default buffer size is large enough for most purposes, but you can set a custom buffer size when you construct a new BufferdWriter/BufferedReader object by simply adding a second integer argument to your constructor:
<pre><code>File newFile = new File("foobar.txt");
FileWriter fileWriter = new FileWriter(newFile);
BufferedWriter bufferedWriter = new BufferedWriter(fileWriter, 9001);
</code></pre>
And just like that, your buffer size is now <a href="http://www.youtube.com/watch?v=SiMHTK15Pik">over 9000</a>.

BufferedReaders behave in the exact same way as BufferedWriters, just in reverse:
<pre><code>File existingFile = new File("foobar.txt");
FileReader fileReader = new FileReader(existingFile);
BufferedReader bufferedReader = new BufferedReader(fileReader);
String line;
while( (line = bufferedReader.read()) != null ) {
  System.out.println(line);
}
</code></pre>
Again, we're avoiding unnecessary system calls by simply buffering our file reading.

The takeaway here is not to be afraid to use BufferedReaders and BufferedWriters. If anything, it will your program will run more efficiently and scale gracefully.
