---
layout: blog
title: "Paper Backup"
date: 2020-09-17 19:00 +0200
category: "Features"
permalink: /:path/
author: Wolfram Rösler
excerpt_separator: <!--more-->
---

This article explains how to create a human-readable backup of your KeePassXC database on paper.

<!--more-->

### Why?

People use KeePassXC to store all kinds of confidential information, including data beyond simple access credentials for online accounts. Your database may contain bank account numbers, tax/insurance/social security information, your Bitcoin wallet private key, or any other data that's vital in the digital as well as in the real world. KeePassXC makes sure (provided that your master key is sufficiently complex) that nobody else gets access to that information, but what happens if you lose access yourselves?

Nobody knows what the future will bring. Your cloud provider might terminate your account, preventing you from accessing your database file. Your apartment might burn down, destroying your computer and all your backup media. Your operating system might refuse to run KeePassXC. The Internet might break down. Your government might make encryption illegal.

You might wake up with a head injury and no longer remember your master key. You might die, your spouse might need your data, but do they know your master key? Do they know the location of your database file? Do they know anything about KeePassXC or how to use it?

Keeping backups of your database file in different physical locations remedies some of these issues. Backing up your database to sheets of paper that are readable by humans is another link in your safety chain.

### How?

Paper backups are created with KeePassXC's "HTML Export" feature, which was introduced in KeePassXC 2.5.0. Although the name suggests a more general export facility (like CSV Export), HTML Export was implemented with the explicit intention of supplying paper backups. (Also, note that the result of HTML Export is designed to be human-readable, so there's no "HTML Import".)

In a nutshell: Use "HTML Export" to create an HTML file, print that file using your web browser, then delete the file.

In detail:

1. In KeePassXC, in the "Database" menu, click "Export", then click "HTML File ...".
2. A warning message appears that explains that you are going to create an unencrypted file that exposes all your passwords. Read the warning and click "Yes" if you agree to proceed.
3. A file selection box appears. Choose a file in a temporary location, e. g. your desktop, and name it something like `paperbackup.html`.
4. Open `paperbackup.html` in your web browser (for example, double-click it in Finder/Explorer/file manager).
5. Use the browser's "print" function to print the file to paper.
6. Delete `paperbackup.html`. Make sure to really destroy the file, rather than moving it to the trash.
7. Store the printed pages in a safe place.

![Screenshot]({{ site.baseurl }}/blog/images/paper-backup.png)

### How about security?

There's always a trade-off between safety (make sure you can access your data) and security (make sure nobody else can access your data). Paper backups improve safety but reduce security. There are several ways by which your passwords could be compromised when creating and keeping paper backups:

* A burglar might steal the paper backup from your home.
* The printer might keep a copy of the paper backup on its built-in hard disk.
* The operating system might keep a copy of the paper backup in its printer spooler.
* The browser might keep a copy of the paper backup in its cache.
* Someone might be eavesdropping on your network while you send the paper backup to a network printer.
* You might forget to delete the HTML export file, or move it to the trash rather than deleting it.
* Even if deleted, the contents of the HTML export file still exist physically on your hard disk for a certain time.
* Malware on your computer might have compromised the browser or printer driver, sending copies of all viewed or printed pages to some malicious host on the Internet.
* You print the paper backup. The printer jams or loses connection. You print again on a different printer, forgetting about the first one. Some time later, the first printer comes back to life and continues printing; someone else finds the pages before you do.

Be aware of all these (and more) possiblities before you create a paper backup, and decide for yourself if the risk is acceptable.

Even if everything works smoothly, you have to take precautions to keep your paper backups secure from unauthorized access. You might place them in a bank vault, or keep them along with your money/passport/important documents. Old paper backups should go straight into the shredder.
