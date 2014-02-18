---
layout: post
title:  "Programming a Legacy"
date:   2013-02-12 09:58:21
---

I was introduced to speed running this year during <a href="http://marathon.speeddemosarchive.com/">AGDQ 2013</a>, a marathon to raise funds for cancer research. Speed running is basically playing through old (and some not-so-old) games as quickly as possible, only using the game's mechanics.

As a current software apprentice, watching these speed runs made me realize a few things:
<ol>
  <li>Modern development is far less tricky</li>
  <li>Code is (pretty much) forever</li>
</ol>
Programming games isn't easy, but it had to have been much more difficult. The <a href="http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf">hardware for some of these early systems was so limiting</a> that it's impossible that it <em>wasn't</em> a huge challenge for the development teams. Take <a href="http://en.wikipedia.org/wiki/Pok%C3%A9mon">Pokémon</a>, for example, which ran on the original Gameboy hardware:

<em>In the early Pokémon video games, the programmers had to use variables to refer to different Pokémon by number. Variable sizes must be powers of two. The smallest variable they were able to use was the size of one byte -- that is, capable of holding any value from 0 to 256. ...Because 256 is greater than 151, this left several unused "slots". MISSINGNO. and other glitch Pokémon fill these empty slots...</em>

Or there was the issue of textures on the Nintendo 64:

<em>One of its technical drawbacks was a limited texture cache, which could only hold textures of small dimensions and reduced color depth, which had to be stretched to cover larger in-game surfaces.</em>

In fact, the hardware for some of these old consoles/handheld systems made it so challenging that many third party developers stopped making games on them altogether. Then take into account the fact that your code can never be patched, as older gaming consoles had neither internet connectivity nor the storage space for it; what was on the CD or cartridge before retail was the final product.

By comparison, we have it pretty easy these days, what with the advent of powerful computers of all sizes, <a href="http://en.wikipedia.org/wiki/Ruby_(programming_language)">programming languages catered to making "happy" programmers</a> and easy-to-use <a href="http://store.steampowered.com/">online distribution</a>. I credit the rise of indie game developers over the past couple of years with this lowered bar to entry. But respect will be given where it's due and I tip my hat to the designers and developers who persevered and proved that it's possible to create really high quality software even in extremely limiting environments.

Of course these games aren't <em>just</em> defined by their programming; the art, music, level design and storytelling also make it fantastic. But it's still a piece of software and programming is still at its heart. So did the programmers working on them really think people would be playing these games 15+ years later?

As an aspiring software craftsman, I love the idea that the people who worked on these games have left behind a legacy. People around the world still play these games because they are fun and <em>well-built</em>; something buggy or with godawful usability wouldn't have the same staying power. That gave me pause about the things I work on and build–I want to leave behind quality as well. After all, barring an asteroid impact or the collapse of civilization, my code repos will very likely outlive me.

So what kind of a coding legacy do you want to leave?
