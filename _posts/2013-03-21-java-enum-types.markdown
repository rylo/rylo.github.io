---
layout: post
title:  "Java Enum Types"
date:   2013-03-21 13:00:07
---

This week, I had to implement a logger for my Java HTTP server. I struggled with this at first, as I wanted the logger object to be a <a href="http://en.wikipedia.org/wiki/Singleton_pattern">singleton</a> available to my entire application and report information on a response's thread. After some Googling, I discovered that the <code>enum</code> type gives me much of the functionality I was looking for.

<a href="http://docs.oracle.com/javase/tutorial/java/javaOO/enum.html">Enum</a> "...is a special data type that enables for a variable to be a set of predefined constants." Basically, it's a collection of constants of a specific type. An example <code>enum</code> might hold all the CTA el lines:

<pre><code>public enum Lines {
  RED, BROWN, BLUE, ORANGE, YELLOW, GREEN, PINK, PURPLE
}
</code></pre>

The first thing you should notice is that each constant is in all caps–a practice used in many programming languages to signify a constant. You're also probably wondering why this is useful. To start, you can access this list of constants anywhere in the application it's defined in by simply invoking the <code>values()</code> method:

<pre><code>Lines.values();</code></pre>

But it doesn't end there; enums can also have methods and constant constructors! Let's say we want each <code>line</code> constant to also contain the number of trains on that line: 

<pre><code>public enum Lines {
  RED(25), 
  BROWN(20), 
  BLUE(25), 
  ORANGE(15), 
  YELLOW(5), 
  GREEN(20), 
  PINK(20), 
  PURPLE(15)
  
  public static int trainCount;

  Lines(int trainCount) {
    this.trainCount = trainCount;
  }
  
  void printInformation() {
    System.out.println(this + " Line has " + trainCount + " operating trains.");
  }
}
</code></pre>

<i>Note: You cannot invoke enum constructors outside of the enum!</i>

We could then iterate through our lines and print out the number of trains operating on that line:

<pre><code>public class LinePrinter {
  public static void main(String[] args) {
    for(Line line : Lines.values()) {
      line.printInformation();
    }
  }
}
</code></pre>

This would print all the available line information out to console:

<pre><code>RED Line has 25 operating trains.
BROWN Line has 20 operating trains.
BLUE Line has 25 operating trains.
ORANGE Line has 15 operating trains.
YELLOW Line has 5 operating trains.
GREEN Line has 20 operating trains.
PINK Line has 20 operating trains.
PURPLE Line has 15 operating trains.
</code></pre>

Because <code>enum</code> objects have methods and are available as a constant throughout an application, it made it the perfect choice for my server's logger module. Rather than passing around a logger object between the different parts of my application, I'm able to simply call <code>Logger.message("Some logging text here!");</code> at any point in the application.
