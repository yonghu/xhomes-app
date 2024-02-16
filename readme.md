## How to test a development build on a iOS device
register your Apple devices (iPhones, iPads and Macs) for internal distribution of your app.
Internal distribution means that you won't need to upload your app archive to App Store / Testflight.
Your app archive (.ipa) will be installable on your equipment as long as you sign your application with an adhoc provisioning profile.
The provisioning profile needs to contain the UDIDs (unique identifiers) of your iPhones, iPads and Macs.

<code>eas device:create</code>

1. This process will ask you your expo account and login to Apple Developer Account, at the end it will generate a QR code and a URL.
2. Scan QR code with your device and add the profile to your device
3. Open setting on your iPhone, the downloaded profile is right below your profile.
4. Click the downloaded profile and install it
5. To enable development app to be tested in your iOS device, you also need to enable Developer Mode in your device. Go to "Privacy & Security", enable Developer Mode. Developer Mode will reduce your security setting. Please turn if off, once you do not need it.
