---
title: "KeePassXC Audit Report"
date: 2023-04-15T10:20:00-04:00
category: "Security"
author: Jonathan White
---

An audit of KeePassXC has been on the wish list since we started this project over six years ago. Today we are happy to announce the release
of an audit conducted by Zaur Molotnikov, an independent security consultant, that was completed on January 19, 2023 against KeePassXC 2.7.4.
This audit was conducted free of charge to the KeePassXC Team and the findings and writeup were reviewed for correctness.

**[Read the Audit Report](/assets/pdf/KeePassXC-Review-V1-Molotnikov.pdf)**

<!--more-->

Overall, Zaur provides a detailed review of the KeePassXC application and its underlying code base. He also provides several recommendations
for users to follow to improve their own security while using KeePassXC.

Here are excerpts from the report:

> KeePassXC provides sufficient cryptographic protection (confidentiality, integrity and authenticity) to the confidential information
the user is storing in the database, given that the user selects a strong authentication method, e.g. a strong passphrase and a
confidential random key file, and that the user will use KeePassXC with its latest secure file format.

> KeePassXC is written well and exercises defensive coding sufficiently. The memory deallocation could be improved to not to contain
secrets after the database is locked though.

> I have reviewed the core features of KeePassXC focusing mainly on its database reading and writing features and the cryptography use.
I could discover no major problems. To the best of my knowledge, disclaiming warranties and/or liability, I can recommend the use of core 
KeePassXC 2.7.4 functionality as of December 2022: reading and writing the database files with confidential user information.

Keep in mind that:

* An audit is not 100% proof that software is safe and secure. Some flaws can be overlooked even by the best auditors.
* An audit is valid only for a “snapshot” of the code. If new code is added, new vulnerabilities can be introduced.
* Audits are expensive and time consuming, you can consult with [OSTIF](https://ostif.org/) or [OTF](https://www.opentech.fund/) for funding additional KeePassXC audits.
