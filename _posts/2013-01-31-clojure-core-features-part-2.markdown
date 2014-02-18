---
layout: post
title:  "Clojure's Core Features, Part 2"
date:   2013-01-24 11:57:07
---

Let's talk more about some of Clojure's features.

<strong>Clojure is interoperable with Java.</strong> Clojure runs on the <a href="http://en.wikipedia.org/wiki/Java_virtual_machine">JVM</a>, so Java libraries are accessible in your programs, allowing for easy extension through plugins or external libraries. Jay Fields has <a href="http://blog.jayfields.com/2011/12/clojure-java-interop.html">a wonderful post</a> explaining this interoperability, complete with examples.

<strong>Clojure is dynamic.</strong> At any point, you can open a <a href="http://clojure.org/repl_and_main">REPL</a> (Read-Eval-Print-Loop) in a terminal to interact with your program or just the Clojure language. This gives you more flexibility during development, freeing you from the "compile &gt; run &gt; examine &gt; repeat" cycle. As <a href="http://clojure.org/dynamic">the official documentation</a> puts it, "Clojure is not a language abstraction, but an environment, where almost all of the language constructs are reified, and thus can be examined and changed."

<strong>Clojure <a href="http://clojure.org/runtime_polymorphism">utilizes runtime polymorphism</a>,</strong> accomplished through Clojure's <a href="http://clojure.org/multimethods">multimethod</a>. Multimethod is "free of the trappings of OO, types and inheritance", allowing you to independently define functions that behave differently depending on the values supplied to it.

Overall, my experience with Clojure has been a positive one. Speclj made testing a breeze (especially for me, coming from Ruby's RSpec) and Leiningen made it trivial to create and run applications and fire up REPLs. The only real trouble I had was training myself to write and read its Lisp-like syntax,  but after a few hours of tinkering I found this problem alleviated itself!

I'd encourage you to <a href="http://tryclj.com/">try out Clojure</a> if you haven't used it yet!
