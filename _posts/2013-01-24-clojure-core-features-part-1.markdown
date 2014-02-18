---
layout: post
title:  "Clojure's Core Features, Part 1"
date:   2013-01-24 14:21:07
---

In the past few weeks, I've been tasked with implementing my tic-tac-toe program in Clojure. Since I'd already written a working game in Ruby, this was really more of an exercise to pick up Clojure and better understand the functional programming paradigm. Let's start with some of Clojure's core features.

<strong>Clojure is a <a href="http://en.wikipedia.org/wiki/Homoiconicity">homoiconic language</a></strong>, meaning that programs are represented by simple data structures. Rather than passing objects into functions and returning a modified version of that object, Clojure deals directly with the data.

<strong>Clojure core data structures are also immutable,</strong> making concurrency viable. In most programming languages, mutable state makes it very difficult to keep a program's behavior and data consistent due to memory volatility and <a href="http://en.wikipedia.org/wiki/Thread_(computing)">multithreading issues on modern systems</a>. <a href="http://clojure.org/concurrent_programming">Clojure's documentation</a> also touches on Clojure's ability to handle state and concurrency, generally a tough combination: <em>"[Clojure] allows state to change but provides mechanism to ensure that, when it does so, it remains consistent, while alleviating developers from having to avoid conflicts manually using locks etc."</em>

By taking the pressure off of developers, Clojure makes utilizing multithreading (or <a href="http://en.wikipedia.org/wiki/Multiprogramming">multiprogramming</a>) and multicore processors far easier than in other languages. This is extremely relevant today, in a time when we're <a href="http://en.wikipedia.org/wiki/Moore's_law">reaching the limits</a> of processor speeds and have to resort to multiple processors to increase processing bandwidth. Programs (and languages like Clojure) that can utilize these technologies are the future.

<strong>Clojure is fast</strong>. <a href="https://github.com/rylo/t3-ruby-v2/blob/master/lib/player.rb">My Ruby implementation for minimax</a> was far slower than <a href="https://github.com/rylo/t3-clojure/blob/master/src/tictactoe/minimax.clj">my Clojure version</a>, even without optimization like alpha-beta pruning or depth pruning! When I was first testing my Ruby minimax, it wasn't uncommon for a test to run for 10+ seconds before I optimized the code. Clojure ran through the game tree so quickly that I was sure something was wrong with my code.

Piqued your interest? <a href="http://tryclj.com/">Try Clojure in your browser now</a> or work through some <a href="http://clojurekoans.herokuapp.com/">Clojure Koans</a> as a primer!
