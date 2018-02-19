---
layout: pages
title: KeePassXC-Browser Migration
---

Starting with version 2.3, KeePassXC offers a new browser plugin called KeePassXC-Browser. It is compatible with Google Chrome, Chromium, Firefox and Vivaldi and available in the [Chrome Web Store](https://chrome.google.com/webstore/detail/keepassxc-browser/oboonakemofpalcgghocfoadofidjkkk?utm_source=chrome-ntp-icon)
and the [Mozilla Add-ons repository](https://addons.mozilla.org/en-US/firefox/addon/keepassxc-browser/).

The new add-on replaces the old KeePassHTTP add-ons (KeePassHttp-Connector,
chromeIPass, PassIFox etc.) and support for those will be removed in future KeePassXC versions.

### How to connect KeePassXC-Browser with KeePassXC 
After installing KeePassXC-Browser and KeePassXC, you must first start KeePassXC and tweak some settings that are not enabled by default.

#### Step 1 - Enable browser integration
Go to the KeePassXC settings and enable browser integration support under *Browser Integration / Enable KeePassXC Browser Integration*. Without this, the browser extension cannot communicate with KeePassXC:
![KeePassXC-Browser settings]({{ site.baseurl }}/images/browser-migration/settings.png)

If enabled, the old KeePassHTTP interface can be disabled by unticking the checkbox *Legacy Browser Integration / Enable KeePassHTTP server*. Any installed corresponding browser add-on (KeePassHttp-Connector etc.) can be uninstalled.

#### Step 2 - Enable browser support
To allow your browser to access KeePassXC, you need to tell it where to find the KeePassXC program file. Luckily, KeePassXC does this automatically for you. All you need to do is tick the checkbox under *Enable integration for these browsers* for any browser you want to use KeePassXC with.

#### Step 3 - Connect to the database
Open KeePassXC and unlock your database (this is important, the following steps won't work if your database is locked or KeePassXC isn't running).

Switch to your browser and click the KeePassXC icon next to your address bar. A popup appears telling you that KeePassXC-Browser has not been configured (if you see another error message, click *Refresh* and wait a few seconds).

![Connect KeePassXC-Browser to your database]({{ site.baseurl }}/images/browser-migration/connect.png)

Press the *Connect* button. A window appears asking you to enter a name and grant access:

![Give a name to your browser's key]({{ site.baseurl }}/images/browser-migration/connect-name.png)

Enter a name of your choice (ideally one that identifies your browser) and click *Save and allow access*. Congratulations! Your browser is now connected to KeePassXC.

![KeePassXC-Browser has been configured]({{ site.baseurl }}/images/browser-migration/browser-ready.png)


### Advanced configuration
If you followed the above steps, you should be good to go and in most cases there is no need for any further action. But if you are an advanced user and want some more control over how your browser connects to KeePassXC, read on.

By default, the browser connects to KeePassXC through a small application called `keepassxc-proxy`. This allows you to connect to KeePassXC on-the-fly instead of launching KeePassXC through the browser. The proxy application listens to the browser extension and transfers messages to KeePassXC through Unix sockets (or named pipes on Windows).

You can also use KeePassXC without the proxy. That way you have direct communication between KeePassXC and your browser. The disadvantage is that your browsers starts a new KeePassXC instance when you connect. For that to work, you need to close any running KeePassXC instance before you click *Connect*.

**Important!** If you are not using a proxy application, it is recommended that you enable the KeePassXC option *Automatically save after every change* or manually save every time you make a change to the database. In some environments (for example on macOS) closing the browser can close will also close KeePassXC without saving any settings, causing data loss.

#### Using a custom proxy application
KeePassXC comes with a proxy application written in C++ and Qt. There are also other working proxy applications, which you can use instead: [keepassxc-proxy](https://github.com/varjolintu/keepassxc-proxy) (Python, C++, Qt) and [keepassxc-proxy-rust](https://github.com/varjolintu/keepassxc-proxy-rust) (Rust) and you can also write and use your own proxy.

To configure KeePassXC for use with a custom proxy, go to *Browser Integration / Advanced*, check *Use a custom proxy location* and select your custom proxy application.

A handy setting is also *Update native messaging manifest files at startup* which automatically updates the browser manifest containing the list of browser extensions which are allowed to connect to KeePassXC and the configured proxy location on startup.

![KeePassXC browser integration advanced settings]({{ site.baseurl }}/images/browser-migration/advanced-settings.png)
