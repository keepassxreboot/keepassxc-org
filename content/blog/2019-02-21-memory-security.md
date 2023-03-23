---
title: "KeePassXC Memory Security"
date: 2019-02-21T17:00:00-05:00
category: "Security"
author: Jonathan White
---

Some of you may have seen the [recent vulnerability report from ISE](https://www.securityevaluators.com/casestudies/password-manager-hacking/) that details various memory attacks against 1Password and KeePass, among others. Although KeePassXC was not mentioned, we have thoroughly reviewed the report and address some questions it raises below.

#### How does KeePassXC protect my data?
Similar to KeePass, we protect all data "at rest" (that is, when it is saved in the password database file *.kdbx). Aside from non-sensitive header data (such as initialization information for the encryption algorithms), your entire database (usernames, passwords, notes, etc) is encrypted using industry standard methods.

However, unlike KeePass, KeePassXC is a cross-platform application written in C++ using the Qt framework. We have worked very hard to be consistent across Windows, Linux, and MacOS platforms in terms of user experience and security. Each of these operating systems have different methods of handling memory that must be taken into account. This is a very complex topic with a lot of nuance. The following is a succinct breakdown of our security across the three platforms.

<!--more-->

Please Note: memory attacks are generally not possible unless an attacker has (physical) access to your machine or a malicious application is running. If your computer is compromised in this way, then there is very little a program can do to protect its data. Your best defense against this threat is to follow general digital hygiene, keeping your computer physically secure, and (maybe) having an up-to-date virus scanner. Nonetheless, here are the techniques KeePassXC uses to protect your data:

##### Windows Memory Protection
KeePassXC uses modern Windows memory security techniques available to all processes. None of the other password managers featured in the ISE report have implemented this security. If they had, the ISE attacks would have failed outright! We specifically disable reading the memory of KeePassXC. (Note: it is not possible to prevent an administrator from accessing memory) We also disable "core dumps" which can expose secrets if the application crashes. Our memory protections can be readily tested by using [Process Hacker](https://processhacker.sourceforge.io/) as shown in the following screenshots comparing KeePassXC to KeePass:

![Process Hacker KeePassXC]({{ site.baseurl }}/blog/images/process_hacker_kpxc.png)

![Process Hacker KeePass]({{ site.baseurl }}/blog/images/process_hacker_keepass.png)

KeePassXC currently does not encrypt data in memory, but we do explicitly clear sensitive data from deleted data structures (so far as the operating system's memory management allows). KeePassXC also cannot prevent data extraction from a hibernation file which stores your computer's memory to disk when going to sleep.

##### Linux Memory Protection
KeePassXC prevents the use of ptrace and generation of core dumps. This prevents anyone, except the root user, from accessing the memory of the process. Due to the significant variety in different Linux distributions, we encourage you to ensure their kernel is compiled and run with sufficient protections to process memory.

The [Snap](https://snapcraft.io/keepassxc) and [Flatpak](https://flathub.org/apps/details/org.keepassxc.KeePassXC) distributions of KeePassXC run in their own sandbox (on Ubuntu) which significantly increases their memory security. The AppImage distribution can be further secured by running it in [FireJail](https://firejail.wordpress.com/). If you are concerned with memory attacks, we recommend using these distributions.

##### MacOS Memory Protection
MacOS has similar protections to Linux: disabling the use of ptrace and core dumps. MacOS does have support for sandboxed applications, but KeePassXC currently does not take advantage of this. We are looking into this possibility for the future.

#### How can we be more secure?
We are currently exploring these methods to enhance memory security:

* Use sandboxing on platforms where supported
* Investigate Trusted Platform Module (TPM) to encrypt/decrypt sensitive memory
* Investigate Intel SGX (encrypted memory enclaves); only available for Windows and Linux (unofficial)

#### Details for the curious
Since KeePassXC is an open source application, we encourage everyone with the appropriate knowledge to review our code. The above memory protection techniques are all applied during the initial Bootstrap process before any data is loaded in to the application. You can see the code for this here: [src/core/Bootstrap.cpp#L45](https://github.com/keepassxreboot/keepassxc/blob/develop/src/core/Bootstrap.cpp#L45)
