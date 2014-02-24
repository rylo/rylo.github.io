---
layout: post
title:  "Java Threadpools"
date:   2013-03-21 15:20:02
---

Fixed thread pools in Java are a simple way to both group threads and set a limit on the maximum number of threads of that type. Think of a thread pool as a predefined bucket of a set number of threads. When a new thread is created, the application polls the thread pool and takes an available thread. If none are available, it will wait until one finishes whatever it is doing.

The simplest way to make a fixed thread pool in a Java application is to create an instance of an ExecutorService by calling <code>newFixedThreadPool()</code> on the <a href="http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Executors.html">Executors class</a>:

{% highlight java %}
ExecutorService threadPool = Executors.newFixedThreadPool(5);
{% endhighlight %}

You can see in the previous example that we initialized the thread pool to have a maximum size of 5 total threads. If you were to use newCachedThreadPool (the <i>other</i> type of standard thread pool in Java) instead of <a href="http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Executors.html#newFixedThreadPool%28int%29">newFixedThreadPool</a>, you wouldn't need this number. That's because a fixed thread pool creates all the threads it needs and then reuses those threads as needed. The cached thread pool instead creates the threads as they're needed, deleting threads that have been inactive for 60 seconds.

From <a href="http://stackoverflow.com/questions/949355/newcachedthreadpool-v-s-newfixedthreadpool">what I've read</a>, you should use <a href="http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Executors.html#newFixedThreadPool%28int%29">newFixedThreadPool</a> for long-running processes and <a href="http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Executors.html#newCachedThreadPool%28%29">newCachedThreadPool</a> for short-running, asynchronous processes.

So we've made a thread pool, but how do we use its threads? It's as simple as invoking <code>execute()</code> with a Runnable argument. I create a new <a href="http://docs.oracle.com/javase/6/docs/api/java/lang/Runnable.html">Runnable</a> object for the threads I've used, simply overriding the <code>run()</code> method with whatever it is I want to be threaded:

{% highlight java %}
public class ThreadedPrinter() {
  private ExecutorService threadPool = Executors.newFixedThreadPool(5);

  public void printStuff(String stuffToPrint) {
    threadPool.execute(new Runnable() {
      @Override
      public void run() {
        System.out.println(stuffToPrint);
      }
    });
  }
}
{% endhighlight %}

Granted, this is a pretty weak use case for threading, as writing a string to console is a pretty fast operation. But imagine this for processes that take longer... Pretty sweet for performance.

Let's use this new class to spin up a thread and print "O hai dere!" to console:

{% highlight java %}
ThreadPrinter threadPrinter = new ThreadPrinter();
threadPrinter.printStuff("O hai dere!");
{% endhighlight %}

Not bad, right? The threading is hidden to you at this level, making it both readable and performant!
