---
layout: blog
title:  "Funding an Authenticode code signing certificate"
date:   2017-03-04 17:00 +0100
category: "Fund-Raising"
permalink: /:path/
author: Janek Bevendorff
---

To further ensure that you can really trust our Windows installer and avoid false positives in anti virus scanners,
we [would like to acquire](https://github.com/keepassxreboot/keepassxc/issues/372) a 4-year
[Authenticode code signing certificate](https://msdn.microsoft.com/en-us/library/ms537359(v=vs.85).aspx)
and for that we need your help.
Without a code signing certificate, Windows will always warn users that they are about to install software from
an unknown (and possibly untrustworthy) vendor:

![Windows UAC, no trusted certificate]({{ site.baseurl }}/blog/images/windows-uac-no-cert.png)

Unfortunately, code signing certificates aren't fee and to collect the needed funds for such a certificate, we need
your financial support. We need to raise **$265** in order to be able to buy the certificate. The certificate
will be used to sign our Windows binaries and binaries on other platforms that support Authenticode (primarily Mac OS X).

To allow you to help, we started a [Pledgie campaign](https://pledgie.com/campaigns/33487) where you can back us via PayPal.
We would really appreciate if you would be willing to support us with a few dollars and spread the word, so others
can support us, too.

<a href="https://pledgie.com/campaigns/33487">
<img alt="Click here to lend your support to: KeePassXC Authenticode Certificate and make a donation at pledgie.com !"
src="https://pledgie.com/campaigns/33487.png?skin_name=chrome"></a>

Thank you very much!

Sincerely, your KeePassXC team