---
layout: post
title:  "Tic. Tac. Toe."
date:   2012-05-21 23:03:55
---
<strong>Mission: Create a tic tac toe game that will always beat me.</strong>

<strong>Which language?</strong>
Easy! Ruby, because I want to understand it better and become more comfortable with it.

<strong>Where do I store the data?</strong>
It might sound stupid, but I wrestled with this. In the end, I realized that this project was far too small for something like a database and I really only needed to store data in memory.

<strong>Computer Player's Logic</strong>
I started by playing a bunch of tic-tac-toe games–because, frankly, I hadn't played it in ages and I wanted to get a sense for some of the game's strategy. I quickly discovered that there are essentially 3 starting spots (since you can rotate the board), 2 of which are viable if you want to win or draw. For me, these 3 types of spaces became "zones.

But… that's getting ahead of myself. There are two moves that the computer must always make: a winning move or a move to block the opponents' win. These were easy enough to produce in Ruby, so on to the next issue.

With everything I had learned in mind, I modified my program to create a scoreboard and give each spot a score, depending on how many blank rows it is a member of and how many opponent rows it blocks. This took care of most of the computer's play spot selection, but there were still two critical diagonal row arrangements that I needed to address: the lightsaber (XOO or OXX) and the sandwich (XOX or OXO). (Yes, I just made those names up... but I thought they were fun and make sense!)

I noticed that I always came across the same two combinations for these rows when filled and they both required different moves if the computer was to hold its own. Basically, whoever was in control of the middle space changed the required response move. If the player with 2 squares had the middle, the other player had to play an open corner space. If the player with 2 squares didn't have the middle, the other player had to play an empty edge space.

And it worked–horay! But did I really do any of it efficiently or even correctly at all? There's no way I could play every single combination of the game myself.

So, I pinged my Rubyist friend Mike and asked him for thoughts. He suggested I visit a few sites and compare my code to <a href="http://www.sarathlakshman.com/2011/04/30/writing-a-tic-tac/">what others had done</a> (without stealing!) just to see where I was at. Honestly, the code I looked at didn't help me much in terms of logic. Instead, it made me realize that I needed to use more readable code when I refactor.

I also looked at a few <a href="http://www.chessandpoker.com/tic_tac_toe_strategy.html">strategy sites</a> and found that my lightsabers and sandwiches <a href="http://www.wikihow.com/Win-at-Tic-Tac-Toe">weren't all that far off after all</a>...

<strong>On to refactoring!</strong>
During my first pass I realized that a lot of my code was dealing with value locations in hashes and arrays (not sure what they're called, but they're ugly.) After ridding myself of most of those, I took the time to <a href="http://en.wikipedia.org/wiki/Don't_repeat_yourself">DRY up</a> my code–mostly in places where my gnarly .each blocks were rendered useless by simply naming my hashes in a way that made sense.

I got some great final feedback when I did a quick code review over the phone with my friend Mike. He first pointed out that <a href="http://devblog.avdi.org/2010/08/02/using-and-and-or-in-ruby/">there is a difference</a> between "&amp;&amp;" and "and" and "||" and "or." Good to know! I'm sure operator precedence would have frustrated me somewhere down the line.

He then suggested things like creating a Computer class or Human class to deal with their respective moves more elegantly. Wonderful advice, though I'll keep that in mind for future projects.

<strong>Reflection</strong>
Overall, building this program was a challenge for me as I hadn't written anything similar in Ruby before. After a ton of online documentation digging and a bit of trial and error to get it all done, I feel my understanding of Ruby has grown immensely–including understanding that I have a lot to learn. :)
