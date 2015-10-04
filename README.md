# Super Shotgun Launcher  
WAD Loader / Gamelauncher with Oblige mapbuild Integration for zdoom, gzDoom, Skulltag and Zandronum written in AngularMaterial on NWJS. 

![Demo](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/readme.gif)

##Just gimme the Binary Release:
[32 and 64bit Windows Releases](https://github.com/FreaKzero/ssgl-doom-launcher/releases)

##Features:  
- Painfree modern UI
- Easy Filtering through your WADs (directory-names and wad-names)
- Loadorder sorting for chosen WADs
- Creating/Saving wadlists for faster access
- Automatic using/creating Savefolders based on the name on used wadlist
- [zDoom](http://zdoom.org), [gzDoom](https://github.com/coelckers/gzdoom), [Skulltag](http://www.skulltag.com/) and [Zandronum](https://zandronum.com/) Support
- [Oblige](http://oblige.sourceforge.net/) "Build and Play" via Configfiles (Also able to resume last built map)
- Fast access to your favourite DoomSeeker Client and Oblige Frontend
- Automatic Update Notifier

##If you want to Help/Contribute  
Taiga: https://tree.taiga.io/project/freakzero-gzdoom-launcher  

##Howto Build:
Be sure that bower and npm is installed  
Clone this Repository with ```git clone https://github.com/FreaKzero/ssgl-doom-launcher```  
go into the rootfolder of ssgl-doom-launcher  
Install all dependencies with ```bower install``` (bower configuration handles npm automatically)  
```grunt build``` for building 32 and 64 bit Binaries (will be generated into ./build folder)  

##Development Environment  
After you've done ```bower install```, you can build your development environment with ```grunt build-devenv``` it will make a new folder in your root named ./nw (Version 0.12.0 of NodeWebkit will be fetched via curl(), that can take a while) - with all dependencies and configs installed for development use (so you dont have to build everytime).
