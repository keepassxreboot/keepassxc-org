---
title: "How KeePassXC's Password Health Check Feature Works"
date: 2020-08-15T15:00:00+02:00
category: "Features"
author: Wolfram Rösler
---

KeePassXC 2.6.0 comes with a new and long-awaited feature: The Health Check report lists weak, multiply used, and expired passwords with a severity (red, orange, or yellow) and a score (the lower the score, the worse the password). This article explains how the password assessment works in detail.

<!--more-->

## How To Invoke Health Check

You invoke Health Check with "Database → Database Reports". It looks like this:

![Screenshot]({{< baseurl >}}blog/images/password-healthcheck.png)

By the way, if you've been using the "Statistics" panel in KeePassXC 2.5.x, please note that it's been moved from the "Database Settings" dialog to the "Reports" pane, just below Health Check.

Health Check analyzes all passwords of your database and computes a "score" for each (details below). Based on the score, the password is assessed as follows:

* Score ≤ 0: Bad
* Score < 40: Poor
* Score < 65: Weak
* Score < 100: Good
* Score ≥ 100: Excellent

Passwords that are "bad", "poor", or "weak" are reported in Health Check, marked red, orange and yellow, respectively. "Good" and "excellent" passwords aren't reported in order to prevent clutter. Passwords appear in increasing order of their score so the worst passwords appear at the beginning of the list (but you may sort the list manually by clicking the column titles).

Note that it's possible to exclude entries from Health Check by right-clicking them and selecting "Exclude from reports" (e. g. if the entry's password is a four-digit ATM PIN).

### How The Score Is Computed

The general idea of password score is to begin with a "strengh index" based on the complexity of the password, and then to reduce it in case of certain issues. There are no conditions under which the score would go up. There's no limit for how low the score can get (scores less than zero are possible).

#### Password Entropy

The password score starts with the password's entropy (in bits), computed using the [zxcvbn](https://blogs.dropbox.com/tech/2012/04/zxcvbn-realistic-password-strength-estimation/) algorithm. This is the same algorithm used for the "password quality" in KeePassXC's password generator, with identical assessment as stated above (< 40 is poor, < 65 is weak, etc.)

#### Password Re-use

Whenever a password is re-used in another entry of the database, its score is reduced by 15 points. For example, if the entropy is 68 ("good" password) but the same password is used in two other entries (=it's used a total of three times), the score goes down by 2 × 15 = 30 points, so the resulting score is 38 (making the password "poor").

A password that's used more than once is never allowed to be "good". If, after reducing the score as described above, the result is still in the "good" or "excellent" range (greater than 64), the score is set to 64 and thus brought down into the "weak" range. For example, if a password with entropy 110 is used twice in the database (and thus 15 points are removed from the score), the resulting score is not 95 but 64.

#### Password Expiry

A password that has expired (=reached the expiry date set for the entry) is always considered "bad", and its score is reduced to 0. The reason for this is that you always have a good reason to set an expiry date: Maybe the password is no longer considered secure, or the service may force you to change it, or you may get locked out after that date.

If the expiry date hasn't been reached yet but is less than 30 days away, the score is gradually reduced. First, the score is reduced to 60 if it's greater than 60 (to force passwords that are about to expire into the "weak" range); then, for every day we get closer to expiry, 2 points are removed.

For example, if (after computing entropy and checking for re-use) the score is 70 and the expiry date is 20 days in the future, the score is first reduced to 60, and then 2 points are removed for each of the ten days that have passed, so the resulting score is 60 - 10 × 2 = 40.

Note that expiry is a property not of a password but of the entry it's used in. If you use the same password in two entries, of which one has expired and the other has not, different scores will be computed for each entry. That's why Health Check lists entries individually.

#### For Developers

If you're a software developer looking into the [KeePassXC source code](https://github.com/keepassxreboot/keepassxc), you 'll find the computation of an entry's password score in the `evaluate` function in class `HealthChecker`, defined in `src/core/PasswordHealth.cpp`.
