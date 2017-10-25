---
layout: blog
title:  "KeePassXC Ubuntu PPA Launched"
date:   2017-10-25 14:51 +0200
category: "Packages"
permalink: /:path/
author: Janek Bevendorff
---

<div style="float: left; margin: 0 4rem 4rem 0;">
<img src="/blog/images/ubuntu-logo.png" alt="Ubuntu logo">
</div>

With our AppImage and Snap release, KeePassXC runs on almost any desktop Linux platform
today. While especially the AppImage is extremely versatile and portable, we
fully understand if users prefer a package that integrates better with their
desktop system. Many Linux distributions already ship KeePassXC as a native package,
but the largest player, Ubuntu, is still left out in the rain.
While [a Debian package has been submitted](https://ftp-master.debian.org/new/keepassxc_2.2.0-1.html),
it is still hanging in the review queue and will possibly continue to do so for
a while.

Meanwhile to fill the gap, there were excellent
[third-party DEB builds](https://github.com/magkopian/keepassxc-debian/releases) by
magkopian (thanks al lot!), but nothing official. This changes now.

We are very excited to announce our own
**[official Ubuntu PPA](https://launchpad.net/~phoerious/+archive/ubuntu/keepassxc)**!

We support all Ubuntu versions which still receive updates from Canonical. These are:

 - Artful Aardvark (17.10)
 - Zesty Zapus (17.04)
 - Xenial Xerus (16.04 LTS)
 - Trusty Tahr (14.04 LTS)

To install the PPA, install the `software-properties-common` package and then run:

<pre><code>add-apt-repository ppa:phoerious/keepassxc
apt update
apt install keepassxc
</code></pre>

From now on, you will always get the latest KeePassXC version directly through
your package manager, whenever you do an `apt upgrade`.

Please be aware that at the moment, YubiKeys don't work with 14.04 Trusty Tahr,
because of its outdated YubiKey libraries. We will address this issue soon
by providing more recent versions of the required libraries through the Trusty
PPA (the same which we are already bundling with our AppImage, which is also
build on Trusty Tahr).
