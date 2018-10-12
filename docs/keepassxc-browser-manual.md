---
layout: pages
title: KeePassXC-Browser Manual
---

This manual extends the [KeePassXC-Browser Migration](https://keepassxc.org/docs/keepassxc-browser-migration/) guide.

Table of contents:
- [1. Functionality](#1-functionality)
    - [1.1. Accessing credentials](#11-accessing-credentials)
        - [1.1.1. Popup](#111-popup)
        - [1.1.2. Autocomplete](#112-autocomplete)
        - [1.1.3. Context menu](#113-context-menu)
        - [1.1.4. Shortcuts](#114-shortcuts)
        - [1.2. Password generator](#12-password-generator)
        - [1.3. Detection of login fields](#13-detection-of-credential-fields)
        - [1.4. Choose custom login fields for a page](#14-choose-custom-login-fields-for-a-page)
        - [1.5. Create new or modify existing credentials](#15-create-new-or-modify-existing-credentials)
        - [1.6. Choose credentials for HTTP Basic Auth requests](#16-choose-credentials-for-http-basic-auth-requests)
        - [1.7. Fill additional values using String Fields](#17-fill-additional-values-using-string-fields)
        - [1.8. Fill TOTP](#18-fill-totp)
- [2. Configuration and settings](#2-configuration-and-settings)
    - [2.1. Settings: General](#21-general)
    - [2.2. Settings: Connected databases](#22-connected-databases)
    - [2.3. Settings: Custom login fields](#23-settings-custom-credential-fields)
    - [2.4. Settings: Site preferences](#24-settings-site-preferences)
- [3. KeePassXC browser integration settings](#3-keepassxc-browser-integration-settings)
    - [3.1. General](#31-general)
    - [3.2. Advanced](#32-advanced)
    - [3.3. Database settings](#33-atabase-settings)
- [4. Software packages and sandboxes](#4-software-packages-and-sandboxes)
    - [4.1. Snap](#41-snap)
    - [4.2. Flatpak](#42-flatpak)
    - [4.3. Sandboxie](#43-sandboxie)
- [5. Troubleshooting](#5-troubleshooting)


### 1. Functionality

This section explains the basic functionality of KeePassXC-Browser.

#### 1.1. Access the credentials
If KeePassXC-Browser detects an input field on a web page, a request is sent to KeePassXC to check if the page URL matches with any entry in the database.
The received credentials are accesible in multiple ways which are described in the following sections.

##### 1.1.1. Popup
The extension icon background is green and it is shown with a question mark. Clicking on the icon opens a popup where you can choose the credentials to use.

<div style="text-align: center;">
<img alt="KeePassXC-Browser credentials popup" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_credentials_popup.png">
</div>

##### 1.1.2. Autocomplete
Username fields support autocomplete for showing a list of received credentials. If there is only a password field visible on the page, autocomplete will be still available.
By clicking the input field, the autocomplete menu is visible and the correct username can be selected. The password field will be filled automatically.
This feature is activated by default and can be disabled on the *General* settings page.

<div style="text-align: center;">
<img alt="KeePassXC-Browser credentials autocomplete" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_credentials_autocomplete.png">
</div>

##### 1.1.3. Context menu
The context menu is accessible on any input field, even when no credentials are detected for the page.
The following options are available:

**Fill User & Pass** only works if KeePassXC-Browser received only one pair of credentials. Otherwise it shows you a notification and autocomplete or popup should be used instead.
**Fill Pass only** works similarly, but fills only the password of a single pair of credentials.
**Fill TOTP** works after input fields are already filled with credentials, and fills a Time-based One-time password from the selected credentials entry.
**Show Password Generator icons** restarts the detection of *visible* password fields on the page and adds the key-icon for the password generator to each of them.
**Save credentials** triggers the credential saving popup and allows user to create a new entry in the database or update an existing one.

<div style="text-align: center;">
<img alt="KeePassXC-Browser credentials autocomplete" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_context_menu.png">
</div>

##### 1.1.4. Shortcuts
KeePassXC-Browser supports three shortcuts:
**Alt+Shift+U** (**Ctrl+Shift+U** for macOS) is the shortcut for **Fill User + Pass**
**Alt+Shift+I** (**Ctrl+Shift+I** for macOS) is the shortcut for **Fill Pass Only**
**Alt+Shift+T** (**Ctrl+Shift+T** for macOS) is the shortcut for **Fill TOTP**

With Chromium based browsers the shortcuts can be configured on page `chrome://extensions/configureCommands`.

### 1.2. Password generator

KeePassXC-Browser has a password generator which receives passwords from KeePassXC itself.
This feature is activated by default and can be disabled on the *General* settings page.

When enabled, every password field contains a key icon on the right side. Click it to open the password generator:

<div style="text-align: center;">
<img alt="KeePassXC-Browser password generator" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_password_generator.png">
</div>

If the key icon does not appear, right-click on the input field and select *KeePassXC-Browser -> Show Password Generator Icons* in the context menu.

Once opened the generated password is visible in the field, except when the current web page is reloaded or a form is submitted.
If you close the password generator dialog and reopen it, the generated password will remain unchanged.

If a page contains multiple password fields and the password generator dialog is opened from the first password field, the option to fill the next
password field is enabled automatically.

If the password field has a limited length and the generated password is longer than the maximum, KeePassXC-Browser detects this automatically
and cuts the password. The user will be informed and the truncated password is copied to the clipboard.

To change the password generator settings, please open KeePassXC's password generator. After changing the settings, close the KeePassXC password generator.
After this, KeePassXC-Browser will be able to read the updated settings.

### 1.3. Detection of login fields

After a page is loaded KeePassXC-Browser starts to search all **visible** input fields.

The detection works for the following situations:
- A username field is followed with a password field. These are handled as a combination.
- Only a password field is visible. A username field was present in the previous page.
- Only a username field is visible. This needs the page to be added to the whitelist. See [2.4. Settings: Site preferences](#24-settings-site-preferences).

The automatic detection of input fields occurs each time the page is refreshed or changed dynamically and there are visible input fields present.
Any input field that is hidden, outside the page view or too small to be visible is ignored.

When username and/or password fields are not detected, you can click on the KeePassXC-Browser icon and press the button *Redetect login fields* from the popup.

### 1.4. Choose custom login fields for a page

Sometimes a page can contain other input fields between the username and password field. In these cases KeePassXC-Browser might not detect
the fields correctly.

It is possible to define the fields manually. Click the KeePassXC-Browser icon and select *Choose custom login fields for this page*:

<div style="text-align: center;">
<img alt="KeePassXC-Browser choose custom login fields" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_choose_custom_login_fields.png">
</div>

At first all input fields are highlighted. Click on the field you want to use as a username field or skip this step if no username field is required.
Next, choose a password field and in the last step confirm your selection.

<div style="text-align: center;">
<img alt="KeePassXC-Browser custom login fields" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_custom_login_fields.png">
</div>

Additional fields called *String Fields* can be selected before the confirmation. This functionality is explained in [1.7. Fill additional values using String Fields](#17-fill-additional-values-using-string-fields).

Next time you open the page KeePassXC-Browser will use the defined input fields and no longer auto detect them. The custom login fields can be
modified or removed from *Settings -> Custom login fields*, or by reopening the selection from the popup and selecting *Discard selection*.

### 1.5. Create new or modify existing credentials

KeePassXC-Browser is able to detect form submissions. If unsaved or modified credentials are detected, the KeePassXC-Browser icon starts blinking red.
When clicked, it remains red until you add, update or dismiss the detected changed. It is also possible to put the site to an ignore list so 
that no credential changes are detected in the future.

<div style="text-align: center;">
<img alt="KeePassXC-Browser remember credentials popup" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_remember_credentials_popup.png">
</div>

If you have multiple credentials for a page, clicking *Update* opens a list of all available entries from which you can select the outdated entry.
If the username matches with username(s) of the available credentials, this entry will be marked bold.

<div style="text-align: center;">
<img alt="KeePassXC-Browser remember multiple credentials" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_remember_multiple_credentials.png">
</div>

New entries are stored in a separate group *KeePassXC-Browser Passwords* in the database.

In *Settings -> General* the following settings are related to this feature:
- *Blink Time* (The maximum time the icon blinks after detecting a credential change)
- *Redirect Offset* (The time the icon blinks for after a page redirect)
- *Redirect Allowance* (How many redirects are allowed before deactivating the blinking icon) 
- *Show a notification when new credentials can be saved to the database.*
- *Save domain only.* (When saving new credentials save only the domain instead of full URL)

Please note that detecting the form changes might not work with AJAX requests.

### 1.6. Choose credentials for HTTP Basic Auth requests

KeePassXC-Browser can try to automatically fill HTTP Basic Auth dialogs. If only one set of credentials is available, the dialog will be filled automatically.
If the login attempt fails, the default login dialog will be displayed.

<div style="text-align: center;">
<img alt="KeePassXC-Browser remember multiple credentials" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_http_auth.png">
</div>

When multiple credentials are available, the KeePassXC-Browser popup icon can be used to select the correct one. This can be reverted by clicking
*Dismiss and show the default authentication dialog* from the popup.

<div style="text-align: center;">
<img alt="KeePassXC-Browser remember multiple credentials" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_http_auth_dismiss.png">
</div>

This feature is activated by default and can be disabled from the settings.

### 1.7. Fill additional values using String Fields

It is possible to fill additional information by defining String Fields on a page.

1. Use *Choose custom login fields for this page* from the popup. Username and password fields can be skipped if not needed.
2. Now additional fields called String Fields can be chosen. Dropdown elements can be choosed also. Remember the order they are selected.
3. After choosing the String Fields, attributes must be added to your database entry starting with `KPH: `. The attributes will be filled in that order.

An example using the page [https://meine.deutsche-bank.de/trxm/db/](https://meine.deutsche-bank.de/trxm/db/):
- *Choose custom login fields for this page* and select Branch, Account and Sub-account as String Fields after selecting or skipping username and password field.
- Go to your entry, Advanced and add the following attributes (in this order):
1. `KPH: Account`
2. `KPH: Branch`
3. `KPH: Sub-account`

Then add the values to those attributes.

<div style="text-align: center;">
<img alt="KeePassXC-Browser configuring String Fields" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_configuring_string_fields.png">
</div>

### 1.8. Fill TOTP

KeePassXC-Browser can return Time-based One-Time Passwords from the database entry. With KeePassXC 2.3.3 and newer no additional attributes are needed for the fill.
Before filling TOTP the correct credentials must be selected and filled to the page.

TOTP can be filled using:
- **Fill TOTP** from the context menu.
- Using shortcut **Alt+Shift+T** (**Ctrl+Shift+T** for macOS).

TOTP can be auto-filled using String Fields. In this case use `{TOTP}` as the value.

### 2. Configuration and settings

KeePassXC-Browser settings can be accessed by clicking the KeePassXC-Browser icon and selecting *Settings* from the popup.

#### 2.1. Settings: General

On the *General* settings page, key features – such as autocomplete, the password generator and auto-fill – can be enabled or disabled.
The changes are saved immediately.

<div style="text-align: center;">
<img alt="KeePassXC-Browser General settings page" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_general_settings_page.png">
</div>

#### 2.2. Settings: Connected databases

On the tab *Connected databases* KeePassXC-Browser shows you which databases are currently paired with KeePassXC.

Removing a connected database from KeePassXC-Browser **does not** remove the key from KeePassXC, but the connection will be restricted
and no credentials can be received. A new connection with key pairing is needed.

<div style="text-align: center;">
<img alt="KeePassXC-Browser Connected databases settings page" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_connected_databases_settings_page.png">
</div>

#### 2.3. Settings: Custom login fields

The login fields previously saved, as described in section [1.4. Choose custom login fields for a page](#14-choose-custom-login-fields-for-a-page),
are visible on this tab.

<div style="text-align: center;">
<img alt="KeePassXC-Browser Custom login fields settings page" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_custom_login_fields_settings_page.png">
</div>  

#### 2.4. Settings: Site preferences

This settings page contains a list of sites that have special handling methods associated with them.
Sites can be added manually or using the new credential detection popup described in section [1.5. Create new or modify existing credentials](#15-create-new-or-modify-existing-credentials).

URL's support wildcards based on the [match patterns](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns).

Each site can contain the following settings:
- Ignore
    - *Enable all features* does nothing, and allows KeePassXC-Browser to detect input fields and new/modified credentials normally.
    - *Disable new/modified credentials* ignores detected credential changes, and no blinking icon or notification is displayed. This is the default value.
    - *Disable all* disables input field detection and KeePassXC-Browser totally from the page.
- *Username-Only Detection* allows KeePassXC-Browser to fill-in pages on sites that do present a separated username and password input.

<div style="text-align: center;">
<img alt="KeePassXC-Browser configuring String Fields" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_site_preferences_settings_page.png">
</div>

### 3. KeePassXC browser integration settings

To access these global settings, open KeePassXC's settings and select *Browser Integration* from the left panel.

#### 3.1. General

The following settings are available on this tab:

##### Request to unlock the database if it is locked
If KeePassXC-Browser is requesting a database unlock from the popup's *Reopen database* button, KeePassXC is brought to the front. After the database is unlocked, KeePassXC will
be put to the background. This is enabled by default.

##### Match URL scheme (e.g., https://...)
Credentials are matched using the exact URL scheme. This is enabled by default.

##### Return only best-matching credentials
Only credentials with a full matching URL will be returned. This is disabled by default.

##### Sort matching credentials by title / username
Credentials seen in KeePassXC-Browser's autocomplete or popup login dialog are sorted by username as a default. When sorting by title, the credentials are first
sort by title, and then by username.

<div style="text-align: center;">
<img alt="KeePassXC Browser integration settings" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_keepassxc_settings.png">
</div>

#### 3.2. Advanced

The following settings are available on this tab:

##### Never ask before accessing credentials
Allow all credentials without prompting an access confirmation dialog.

##### Never ask before updating credentials
If a credential update is requested, the new username and/or password is updated automatically without a confirmation.

##### Search in all opened databases for matching credentials
If multiple databases are open at the same time, credentials will be searched from all of them. Databases not connected with
KeePassXC-Browser are ignored.

##### Return advanced string fields which start with "KPH: "
Allows KeePassXC to return additional attributes described in section [1.7. Fill additional values using String Fields](#17-fill-additional-values-using-string-fields).

##### Update native messaging manifest files at startup
The location of KeePassXC or keepassxc-proxy can change, for example when using a portable version of the application. This setting updates the application location to the native
messaging manifest files, which allows KeePassXC-Browser to find the correct executable path.

##### Use a proxy application between KeePassXC and browser extension
This has been explained in the [Migration guide](https://keepassxc.org/docs/keepassxc-browser-migration/).

##### Use a custom proxy location
This has been explained in the [Migration guide](https://keepassxc.org/docs/keepassxc-browser-migration/).

<div style="text-align: center;">
<img alt="KeePassXC browser integration advanced settings" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_keepassxc_advanced_settings.png">
</div>

#### 3.3 Database settings

To access these database specific settings, select Database -> Database settings from the menu.

##### Disconnect all browsers
Removes all keys connected with KeePassXC-Browser from KeePassXC.

##### Forget all site-specific settings on entries
Removes all permissions (Allow/Deny) from entries. When accessing a page with matching credentials, the permissions are asked for again.

##### Move KeePassHTTP attributes to KeePassXC-Browser custom data
Moves all attributes and permissions used with the legacy browser integration to the new browser integration.
This option will be asked automatically on database unlock if legacy data or keys are detected.

##### Stored Keys
A list of the stored keys which are connected to KeePassXC-Browser.

<div style="text-align: center;">
<img alt="KeePassXC Browser integration settings" style="max-width: 100%;"
src="{{ site.baseurl }}/images/browser-manual/manual_keepassxc_database_settings.png">
</div>

### 4. Software packages and sandboxes

#### 4.1. Snap

Currently Browser Integration doesn't work with Snap packages.

#### 4.2. Flatpak

To use KeePassXC-Browser properly with KeePassXC flatpak, make the following changes:
Create a wrapper script `/var/lib/flatpak/exports/bin/org.keepassxc.KeePassXC.proxy` with the following content:
`
#!/bin/sh
exec /usr/bin/flatpak run --command=keepassxc-proxy org.keepassxc.KeePassXC "$@"
`

Make the script executable with `chmod +x` and then change the `Use a custom proxy location` to point this script.

#### 4.3 Sandboxie

Use the following settings:
- In Settings > Restrictions > Start/RunAccess add `keypassxc-proxy.exe`
- In Settings > ResourceAccess > FileAccess > FullAccess add `\Device\NamedPipe\*\kpxc_server`, you can restrict usage of this pipe just to the `keypassxc-proxy.exe` application.

### 5. Troubleshooting
For troubleshooting connection issues, please use the official [Troubleshooting guide](https://github.com/keepassxreboot/keepassxc-browser/wiki/Troubleshooting-guide).
If the problem is still not solved, an issue can be filed at [https://github.com/keepassxreboot/keepassxc-browser/issues](https://github.com/keepassxreboot/keepassxc-browser/issues).
