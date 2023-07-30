# BetterYTM

> [!WARNING]  
> At this point in time, everything within this extension is completely experimental, and cannot be
> guaranteed to work. There are no settings, nor adjustability for the modified portions of the
> Youtube Music website, nor content.

BetterYTM is a [Chromium](https://chromium.org) extension designed to enhance your experience on Youtube Music. 
As of now, it is an experimental project, driven by [my](https://github.com/acelikesghosts) personal preferences.

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
Updating your local version of the project is a uncomplicated process. Follow these steps:

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