---
layout: post
title:  "Clojure's Java Interoperability"
date:   2013-03-28 16:44:50
---

As part of my residency here at <a href="http://www.8thlight.com/">8th Light</a>, I was tasked with connecting my <a href="http://github.com/rylo/t3-clojure">Clojure tic-tac-toe library</a> to my <a href="http://github.com/rylo/Homestake">Java HTTP server</a>. I had to learn how to use Clojure's Java interoperability features before I could work on this project--here's a bit of what I learned:

## Instantiating Classes

Initializing a new instance of a Java class is dead simple. Consider initializing a new String, for example, in Java:

{% highlight java %}
String myName = new String("Rylan");
{% endhighlight %}

Let's try the same exact thing in Clojure:

{% highlight clojure %}
(java.lang.String. "Rylan")
  => "Rylan"
{% endhighlight %}

See? That wasn't so hard. The key thing to notice is the period after <code>java.lang.String</code>. This period tells the compiler to create a new instance of the class of whatever was before it; in this case, <code>java.lang.String</code>. You could do the same thing with Java's Integer class:

{% highlight clojure %}
(java.lang.Integer. 1337)
  => 1337
{% endhighlight %}

## Calling Methods

Let's say we want to use some of <a href="http://docs.oracle.com/javase/6/docs/api/java/lang/String.html#method_detail">Java's String functions</a>. This, too, is quite simple:

{% highlight clojure %}
(.(java.lang.String. "Rylan") length)
  => 5
{% endhighlight %}

Notice the period before we instantiate my name as a String; <a href="http://clojure.org/java_interop#Java Interop-The Dot special form">this tells Clojure</a> to treat this statement as Java code and run a Java method named <code>length</code> on the String instance provided.

We can even call multiple methods on an instance of a Java class by using Clojure's <a href="http://clojuredocs.org/clojure_core/clojure.core/doto"><code>doto</code> function</a>:

{% highlight clojure %}
(doto (java.util.ArrayList.) 
  (.add "Candy")
  (.add "Cookies")
  (.add "Ice Cream"))
  => ["Candy" "Cookies" "Ice Cream"]
{% endhighlight %}

## Accessing Fields

The syntax for getting a Java field is similar to calling methods. Let's imagine we have a very simple Sushi class with a field containing the type of fish in the roll:

{% highlight java %}
class Sushi {
  public String fishType;

  public Sushi(String fishType) {
    this.fishType = fishType;
  }
}
{% endhighlight %}

Now let's access the <code>fishType</code> field from Clojure:

{% highlight clojure %}
(. (Sushi. "Tuna") fishType)
  => "Tuna"
{% endhighlight %}

The first period (within the parentheses) again tells us to evaluate this bit of code as Java, then we provide an instance of the Sushi class and finally provide the field name we're looking for.

## Creating New Classes

Creating new Java classes in Clojure is, however, a bit more involved. To start, we'll need to create a new namespace for our class and then give it a class name and a method prefix by using the <code>:gen-class</code> namespace clause:

{% highlight clojure %}
(ns examples.sushi
  (:gen-class
   :name examples.Sushi
   :prefix method-))
{% endhighlight %}

<code>:name</code> simply sets a name for the class that we'll use when we want to construct a new object, in this case, we've set it to examples.Sushi:

{% highlight clojure %}
(examples.Sushi.)
{% endhighlight %}

<code>:prefix</code> is a string or symbol essentially used to namespace methods. Something to note is that if you don't provide a <code>:prefix</code> in the <code>:gen-class</code> namespace clause, <strong>the default prefix is -</strong>. This tripped me up more than a few times!

Since we used "method-" as our prefix, all of our methods must be prefixed with "method-" in order to use them:

{% highlight clojure %}
(ns examples.sushi
  (:gen-class
    :name examples.Sushi
    :prefix method-))

(defn method-explain-this-roll [this]
  "This is a generic roll of sushi.")
{% endhighlight %}

<h2>Extending Classes</h2>

Imagine you've written a pretty sweet Java class that you'd like to extend in Clojure. First, you must <code>import</code> the Java class you'd like to extend, then add an <code>:extend</code> statement to your namespace's <code>:gen-class</code> clause:

{% highlight clojure %}
(ns examples.sushi
  (import org.myapp.SpicyTunaMaki)
  (:gen-class
    :name examples.SuperSpicyTunaMaki
    :prefix method-
    :extends org.myapp.SpicyTunaMaki))

(defn method-explain-this-roll [this]
  "This is the spiciest tuna maki IN THE WORLD.")
{% endhighlight %}

So what if we wanted to override a method defined in our <code>SpicyTunaMaki</code> Java class? Use <code>:exposes-methods</code>:

{% highlight clojure %}
(ns examples.sushi
  (import org.myapp.SpicyTunaMaki)
  (:gen-class
    :name examples.SuperSpicyTunaMaki
    :prefix method-
    :extends org.myapp.SpicyTunaMaki
    :exposes-methods {roll exposed-roll
                      serve exposed-serve}))

(defn method-explain-this-roll [this]
  "This is the spiciest tuna maki IN THE WORLD.")

(defn method-exposed-roll [this]
  "Rolling some spicy goodness")

(defn method-exposed-serve [this]
  "You're going to need some water for this one")
{% endhighlight %}

Notice we used the <code>method-</code> prefix on each method name and that we specified each method's superclass name and override name in the <code>:exposes-methods</code> statement.

<h2>Conclusion</h2>

Overall, I was pleased with the straightforwardness of most of this interop stuff. I used <a href="http://leiningen.org/">Leiningen</a> for my project (I <strong>highly</strong> recommend it!) and ran into an issue where my Clojure module containing my Java interop code wasn't compiling before my <a href="http://speclj.com/">Speclj</a> tests ran. All I had to do was run <code>lein compile</code> and everything worked fine.

I hope this brief overview helps you in your Clojure interop adventures!
