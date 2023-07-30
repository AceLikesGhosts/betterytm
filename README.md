# BetterYTM

> [!WARNING]  
> At this point in time, everything within this extension is completely experimental, and cannot be
> guaranteed to work. There are no settings, nor adjustability for the modified portions of the
> Youtube Music website, nor content.

BetterYTM is a simple [Chromium](https://chromium.org) extension which provides a better [Youtube Music](https://music.youtube.com) experience.
At the moment, this is completely experimental and simply things [I](https://github.com/acelikesghosts) want.

### Features

| Feature                                                            | Status |
| ------------------------------------------------------------------ | ------ |
| Better Volume Control                                              | ✔️      |
| Volume Input Button                                                | ✔️      |
| [YTM RPC](https://github.com/AceLikesGhosts/ytm-rpc/) Intergration | ❌      |


### Installation
1. Clone the repository to your machine.
2. Build the repository
```sh
cd betterytm
npm ci
npm run build
```
1. Open your Chromium based browser and navigate to the respective extensions page.
2. Turn on the Developer Mode switch (usually located at the top-right corner of the extensions page).
3. Click on the "Load unpacked" button.
4. Browse to the project directory where you cloned the repository and select the folder named `dist`. The extension should now be installed and active in your Chromium browser.

### Updating
Updating your local version of the project is rather simple, and all you have to do is:

1. Navigate to where it is installed and update the Git repo
```sh
git pull
```
2. Update the required dependencies using npm:
```sh
npm install
```
3. Navigate to the browser's extension manager and press `Update`
![graphic of update button](https://github.com/AceLikesGhosts/ytm-rpc/blob/master/images/update.png)