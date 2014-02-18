---
layout: post
title:  "Java's Static Keyword"
date:   2013-03-12 11:23:44
---

How well do you understand Java's <code>static</code> keyword? I was surprised by its range of uses!

<strong>Class Methods</strong>

Methods using the <code>static</code> keyword are basically class methods, or methods that the class can utilize without being initialized. In Ruby, a class method is defined by using <code>self</code> before defining the name of the method:
<pre><code>class CoffeeMaker
  def self.make_coffee
    # Make me coffee!
  end
end</code></pre>
In this case, the <code>self.make_coffee</code> method can be called without <a href="http://ruby-doc.org/core-2.0/Class.html#method-i-new">creating a new instance</a> of CoffeeMaker.

Java is similar in that all you need to do to make a method a class method is to prepend <code>static</code> to its definition:
<pre><code>public class CoffeeMaker {
  static void make_coffee() {
    // Make me coffee!
  }
}</code></pre>
<strong>Class Variables</strong>

Similar to class methods in Java, class variables (again, variables accessible without instantiating a new instance of a class) only require a prepended <code>static</code> keyword:
<pre><code>public class CoffeeMaker {
  static int modelNumber = 2013;
  public int unitNumber;
}</code></pre>
I included the instance variable <code>unitNumber</code> to the above code to show how a class variable might be useful. A coffee maker's <code>modelNumber</code> could be the same for all the reproductions, regardless of how many times it's instantiated. The <code>unitNumber</code>, however, would be unique to each coffee maker, and would therefore warrant being an instance variable, only available after a coffee maker object has been instantiated.

In Ruby, class variables are denoted by two <code>@</code> symbols before the variable name and instance variables with one <code>@</code> symbol:
<pre><code>class CoffeeMaker
  @@model_number = 2013_XTREME_COFFEMAKER

  def initialize
    @unit_number = 00001
  end
end</code></pre>
<em>Note: I've never seen Ruby class variables used in the wild. My understanding is that they are <a href="http://stackoverflow.com/questions/10594444/class-variables-in-ruby">just confusing</a> and that there can be unintended side-effects involved with shared state. In short, use sparingly or not at all!</em>

<strong>Constants</strong>

You can also combine the <code>static</code> and <code>final</code> keywords to make constants, or values that never change once set:
<pre><code>public class CoffeeMaker {
  static final String BRAND = "CoffeMaestro";
  // Coffee-making code here
}</code></pre>
In Ruby, constants can be defined outside of a class:
<pre><code>BRAND = "CoffeMaestro"

class CoffeeMaker
  # I can use the BRAND constant here!
end</code></pre>
In an IRB session, you will get errors when you redefine a constant, though it does let you do it:
<pre><code>1.9.3p362 :001 &gt; BRAND = "CoffeMaestro"
 =&gt; "CoffeMaestro" 
1.9.3p362 :002 &gt; BRAND = "CoffeeMaestro"
(irb):2: warning: already initialized constant BRAND
 =&gt; "CoffeeMaestro"
1.9.3p362 :003 &gt;   BRAND
 =&gt; "CoffeeMaestro" </code></pre>
<em>Note: It's convention in both Ruby and Java to write out constant names in all caps!</em>
