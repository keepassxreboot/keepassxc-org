---
layout: pages
title: KeePassXC-Browser Migration
---

### How to connect KeePassXC-Browser with KeePassXC 
After installing KeePassXC-Browser and KeePassXC you must first start the KeePassXC and tweak some settings that are not enabled by default.

#### Step 1 - Enable browser integration support
Goto KeePassXC settings and enable the browser integration support. Without this the browser extension cannot communicate with KeePassXC:
![](https://i.imgur.com/Bg3M51p.png)

#### Step 2 - Enable browser support
Browser extensions with native messaging can only launch binaries that are found in a manifest file installed to the current browser. This disables the possibility to launch any other binary and ensured the traffic is transferred only between the browser extension and selected binary. See more info about these manifest files [here](https://developer.chrome.com/extensions/nativeMessaging). Without installing the browser support there is not manifest file found and the browser extension cannot find any binary to launch.

##### Proxy application
A separate binary application called keepassxc-proxy is enabled by default. It allows the browser to connect KeePassXC "on-the-fly" and not launch the process through the browser. The proxy application listens the browser extension and then transfers the messages through Unix sockets (named pipes under Windows) to KeePassXC. As an alternative you can use KeePassXC-Browser without the proxy. This means the connection is direct between KeePassXC and the browser extension. Direct connection requires KeePassXC to be closed before opening a new connection because native messaging requires the browser process to be able to start the external application.

Currently keepassxc-proxy's Qt version is compiled with the application and packaged inside the .app in macOS. There's also three other working proxy applications you can use if you want to use them as a custom proxy or make your own: [keepassxc-proxy](https://github.com/varjolintu/keepassxc-proxy) (Python, C++, Qt) and [keepassxc-proxy-rust](https://github.com/varjolintu/keepassxc-proxy-rust) (Rust). 

There's few important extra options available:
- `Update native messaging manifest files at startup`: Updates KeePassXC or keepassxc-proxy binary path automatically to native messaging manifest files on startup. Does exactly that. If you have a proxy or custom proxy enabled, the path to it will be updated also.
- `Use a custom proxy location`: This is essential for developers who want to run KeePassXC from the build folder, or run a custom proxy. For Linux users the keepassxc-proxy binary is found under `src/proxy/keepassxc-proxy`. macOS users will need to use the location inside the built .app package (see screenshot). Windows developers must copy the compiled keepassxc-proxy to the application folder because of the library dependencies.

You can enable the settings from Advanced tab:
![](https://i.imgur.com/QCdSgJ4.png)

#### Step 3 - Connect to the database
Start your browser and click the browser extension icon. Open your database by entering your password (there's an error under the icon `Database not opened` if the connection is successful but database is still closed or locked by a timer). After you have opened your database you should see a following message under the icon:

![](https://i.imgur.com/gLmyxMs.png)

Press the connect button and that should launch a following popup in KeePassXC:
![](https://i.imgur.com/LcKpfax.png)

Give your database a name and it should appear to the browser extension's Settings -> Connected databases list. After this you can click the icon again and check if the database is really connected with KeePassXC-Browser:

![](https://i.imgur.com/0QnWpkV.png)

Now you should be able to use the browser extension.

##### Important
If you are not using a proxy application it is recommended that KeePassXC has an option `Automatically save after every change` enabled or you manually save every time you have made a change to the database. In some cases (for example under macOS) closing the browser can close the database without saving any settings. This can cause lost entries and password. To be sure how it works under your OS I recommend you test the behaviour.

#### How to use TOTP (Time-Based One-time Passwords) with KeePassXC-Browser
After you have ran the TOTP setup in KeePassXC you can add TOTP support to an entry by doing the following:
- Edit your entry and to go Advanced tab
- Add a new attribute named `KPH: {TOTP}`
![](https://i.imgur.com/9oFZMNO.png)
- Put `{TOTP}` to its value
- After that go to a site where has a TOTP field and select `Fill TOTP` from the KeePassXC-Browser context menu
![](https://i.imgur.com/d5aBw1a.png)