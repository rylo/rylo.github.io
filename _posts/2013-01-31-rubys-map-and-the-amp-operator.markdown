---
layout: post
title:  "Ruby's Map and The & Operator"
date:   2013-01-31 10:42:42
---

My mentor mentioned Ruby's map and &amp; operator during a quick lunchtime chat today, so I decided to revisit this helpful and yet <a href="http://stackoverflow.com/questions/14260149/what-is-the-idiomatic-way-to-yield-to-the-block-of-the-callers-caller">often unknown</a> combination.

Let's start with a simple example–a map that iterates through an array of items and returns an array with modified values:
<pre><code>[1, 2, 3].map{ |number| number.to_s }
=&gt; ["1", "2", "3"]</code></pre>
Works as I was intending! Each element is converted to a string using <a href="http://www.ruby-doc.org/core-1.9.3/Fixnum.html#method-i-to_s">to_s</a>. But there's another way to write this by combining map and the &amp; operator:
<pre><code>[1, 2, 3].map(&amp;:to_s)
=&gt; ["1", "2", "3"]</code></pre>
However, I found I broke it if I tried to describe a custom method after the &amp;:
<pre><code>[1, 2, 3].map(&amp;+=1)
=&gt; SyntaxError: (irb):23: syntax error, unexpected tOP_ASGN</code></pre>
Well, that's clearly not what I was hoping for. The reason this doesn't work is because Ruby is expecting a block of code or a <a href="http://www.ruby-doc.org/core-1.9.3/Proc.html">Proc</a> (in which case it will turn the Proc into a block of code). So, I could just pass in a new, custom proc to return what I want and it will work:
<pre><code>[1, 2, 3].map(&amp;Proc.new{|x| x + 1})
=&gt; [2, 3, 4]</code></pre>
Unfortunately, this is just making this line of code longer without any real benefits so I'd never write it like this. 

So why was I passing in a <a href="http://www.ruby-doc.org/core-1.9.3/Symbol.html">symbol</a> (<code>:to_s</code>) in the first example? The symbol (<code>:to_s</code>) is simply referring to the method (<code>.to_s</code>). You can use any available methods, or define your own to pass into the map:
<pre><code>1.9.3p362 :001 > def foo
1.9.3p362 :002?>   self + 1
1.9.3p362 :003?> end
 => nil 
1.9.3p362 :004 > [1, 2, 3].map(&amp;:foo)
=&gt; [2, 3, 4]</code></pre>

One thing to remember, however, is that <strong>if your function requires any argument(s), then your map won't work</strong>:
<pre><code>1.9.3p362 :005 > def foobar(x)
1.9.3p362 :006?>   self + x
1.9.3p362 :007?> end
 => nil 
1.9.3p362 :008 > [1, 2, 3].map(&:foobar)
ArgumentError: wrong number of arguments (0 for 1)
  from (irb):5:in `foobar'
  from (irb):8:in `map'
  from (irb):8
  from /Users/rylan/.rvm/rubies/ruby-1.9.3-p362/bin/irb:16:in `<main>'
1.9.3p362 :009 > [1, 2, 3].map(&:foobar(1))
SyntaxError: (irb):9: syntax error, unexpected '(', expecting ')'</code></pre>

Happy <em>mampersanding</em>! And yeah, I totally made that word up.

Sources:
<ul>
  <li><a href="http://cirw.in/blog/ampex">ampex — a practical use of Ruby's &amp; operator</a></li>
  <li><a href="http://ablogaboutcode.com/2012/01/04/the-ampersand-operator-in-ruby/">The &amp; Operator in Ruby</a></li>
  <li><a href="http://www.ruby-doc.org/core-1.9.3/Array.html#method-i-map">Class: Array (Ruby 1.9.3) - #map</a></li>
</ul>
