# Webcam Viewer

This is a simple application that lets you view the feed from any webcam, virtual webcam, or video capture device that presents as a webcam on your system.  You could use this for:

* Testing your webcam before a meeting
* Checking your hair
* Controlling a Raspberry Pi connected through a cheap HDMI capture device

## Running From Source

I'm still working on packaging executables for this, so if you would like to run it, please follow these instructions.

1. Install `node`
2. Install `yarn` by running `npm install --global yarn`
3. Clone the repository
4. Navigate to the directory in your terminal, and run `yarn install`.
5. run `yarn run start`

## Building on Windows or MacOS

Run `yarn run make`

## Building on Linux x64

1. Install `rpm`
   * On Ubuntu, run `sudo apt install rpm`
   * on Arch Linux, run `sudo pacman -S rpm-tools`
2. Run `yarn run make`

## Building on Raspberry Pi

Building for the Pi is a little weird, but here's what I've been doing so far:

1. Install 
   * `ruby`
   * `ruby-dev`
   * `fpm`
   * `electron-builder` 
2. Run `USE_SYSTEM_FPM=true yarn run electron-builder build --linux deb rpm --arm64 --armv7l`

The above does not successfully build an rpm, but you may be able to run `sudo apt install rpm`, then build again.


