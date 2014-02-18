---
layout: post
title:  "Rindlets and Tuple Spaces"
date:   2013-02-12 11:06:59
---

Over the past few weeks, the apprentices at <a href="http://www.8thlight.com/">8th Light</a> have been working on a side project involving distributed Ruby. I'm a sucker for competition and trying new things, so it's been a really fun problem to tackle.

Our task was to create a brokerage <a href="http://blog.8thlight.com/paul-pagel/2008/04/16/rinda-and-setting-up-rindlets.html">rindlet</a> that would watch for stock tuples in a <a href="http://en.wikipedia.org/wiki/Tuple_space">tuple space</a>, make buy and sell requests to a separate bank rindlet and, ultimately, try to make the most money by the end of an hour. The problem centers around the idea of a tuple space, or a central repository for objects that clients can <strong>read</strong>, <strong>write</strong> to and <strong>take</strong> (delete) from.

My brokerage ended up looking fairly straightforward:

<pre><code>class BrokerageRindlet < Rinda::Rindlet
  attr_reader :brokerage
    
  def initialize(name)
    @brokerage = Brokerage.new(name)
    brokerage.register
  end
  
  def run
    tuples = rinda_client.read_all(["stock"], 1)
    if tuples
      brokerage.update_archive(tuples)
      brokerage.process_responses
      brokerage.sell_stocks 
      sleep 3
      brokerage.buy_volatile_stocks(0.8)
    end
    brokerage.end_game if brokerage.game_over?
    sleep 3
  end
  
end</code></pre>

Our brokerage rindlet initializes by registering with the bank rindlet (a totally separate client, much like our brokerage) by writing a very simple tuple to the shared tuple space:

<pre><code>["bank", "request", "register", "Rylan's Brokerage"]</code></pre>

On the other end of the tuple space, the bank rindlet is constantly watching (reading) for any tuples that begin with "bank" and process any "register" requests by setting up an account for that brokerage and initializing it with $100,000 in cash and an empty stock portfolio. The bank would then issue a response to let my brokerage know that the account has been successfully created:

<pre><code>["bank", "response", "confirmation","Rylan's Brokerage", "register"]</code></pre>

My brokerage rindlet would, in turn, take this response off of the tuple space and begin trading by telling the bank that it wants to purchase a 30 AAPL stocks:

<pre><code>["bank", "request", "buy", "Rylan's Brokerage", "AAPL", "30"]</code></pre>

Again, the bank watches for this request, takes it off of the tuple space and issues a confirmation response:

<pre><code>["bank", "response", "confirmation", "Rylan's Brokerage", "buy", "448.23", [request_tuple]]</code></pre>

And now my brokerage owns 30 AAPL stocks! This process continued over the course of an hour, and finally ends when the bank issues a <code>["game_over"]</code> tuple. Since the winner is determined by each brokerage's final liquid cash amount, my brokerage issues a sell request for all of the stocks in my portfolio.

We'll be iterating on our brokerages over the coming weeks and I'll share more, including my super secret and not-so-fancy buying/selling algorithm.
