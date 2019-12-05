---
layout: post
title:  "Updating to 1.9.2 - Linecache error"
date:   2012-04-03 16:46:21
---

I recently updated my development Ruby version to 1.9.2 and ran into an ultimately easy to fix error.

After running <strong>bundle install</strong>, I got this nice little message:  

```
Installing linecache (0.46) with native extensions
Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension./Users/wasabi/.rvm/rubies/ruby-1.9.2-p318/bin/ruby extconf.rb

Can't handle 1.9.x yet
#*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of
necessary libraries and/or headers. Check the mkmf.log file for more
details. You may need configuration options.

Provided configuration options:
--with-opt-dir
--with-opt-include
--without-opt-include=${opt-dir}/include
--with-opt-lib
--without-opt-lib=${opt-dir}/lib
--with-make-prog
--without-make-prog
--srcdir=.
--curdir
--ruby=/Users/wasabi/.rvm/rubies/ruby-1.9.2-p318/bin/ruby

Gem files will remain installed in /Users/wasabi/.bundler/tmp/63319/gems/linecache-0.46 for inspection.

Results logged to /Users/wasabi/.bundler/tmp/63319/gems/linecache0.46/ext/gem_make.out

An error occured while installing linecache (0.46), and Bundler cannot continue.
Make sure that `gem install linecache -v '0.46'` succeeds before bundling.
```

The fix? I found <a href="http://isitruby19.com/linecache" target="_blank">this page and its comments</a> and discovered that my Gemfile was including 'ruby-debug' which no longer works for 1.9.x. I edited the gem 'ruby-debug' line to look like gem 'ruby-debug19', ran
<code>bundle install</code>
and enjoyed my (minuscule) victory!

Hope this helps others.
