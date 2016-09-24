# Super Shotgun Launcher  
Doom Frontend with Oblige mapbuild integration for zdoom, gzDoom, Zandronum, Doom64EX and DoomRPG written in AngularMaterial on NWJS for Windows, Linux and OSX.

##Just gimme the Binary Releases:
[OSX, Windows, Linux Releases](https://github.com/FreaKzero/ssgl-doom-launcher/releases)

![Demo](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/ssgl1.gif)
![Demo2](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/ssgl2.gif)
![Demo3](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/ssgl3.gif)

##Features:  
- Painfree modern UI
- Support for WAD, PK3, BEX and DEH
- Easy Filtering through your Files (directory-names, mod-names, file extensions)
- Loadorder sorting for chosen Files
- Creating/Saving Modlists for faster access
- Using/Creating Savefolders based on the name on used wadlist
- [zDoom](http://zdoom.org), [gzDoom](https://github.com/coelckers/gzdoom), [DoomRPG](https://github.com/Kyle873/DoomRPG), [Doom64EX](https://doom64ex.wordpress.com) and [Zandronum](https://zandronum.com/) Support
- SSGL automatically manages your savefolders via engine and Modlist Selection
- [Oblige](http://oblige.sourceforge.net/) "Build and Play" via configfiles (Also able to resume last built map)
- Fast access to your favourite DoomSeeker Client and Oblige Frontend
- Automatic Update Notifier
- Screenshot Lookup for your WADs and PK3s via [WadArchive](http://www.wad-archive.com) or local directory

##Retro Reskin Version  
[scar45](https://github.com/scar45) made an own fork with an "retro-reskin" [here](https://github.com/scar45/ssgl-doom-launcher)

##If you want to Help/Contribute  
Gitter: [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/FreaKzero/ssgl-doom-launcher?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

##Howto Build:
Be sure that ```bower``` and ```grunt-cli``` is installed.  
Clone this Repository with ```git clone https://github.com/FreaKzero/ssgl-doom-launcher```  
go into the rootfolder of ssgl-doom-launcher  
Install all dependencies with ```bower install``` (bower configuration handles npm automatically)  
For Windows builds i highly recommend to use [cmder](http://cmder.net/)

##Development Environment  
After you've done ```bower install```, you can build your development environment with:

```grunt build-devenv-win``` for Windows 64Bit  
```grunt build-devenv-osx``` for OSX 64Bit  
```grunt build-devenv-linux32``` for Linux 32Bit  
```grunt build-devenv-linux64``` for Linux 64Bit  

It will make a new folder in your root named ./nw (Version 0.12.0 of NodeWebkit will be fetched via curl(), that can take a while) - with all dependencies and configs installed for development use (so you dont have to build everytime).

When you dont use Sublime Text (see projectfile - buildsystems) use the commandline argument ```--devtools``` or ```-d``` to get an "Open Devtools" Icon in the Toolbar. In Development mode you can press F5 to reload the App.

###Command line switches for development version:###

- ```--devtools or -d```
Enable Open Devtools icon in the toolbar (use F5 to reload the app) (not needed with Sublime Text -- see projectfile - buildsystems)  
   
- ```--livereload or -r```   
Enable Live Reloading on HTML/CSS/JS changes in the /src folder

- __Example Mac:__  
```open -n ./nw/nwjs.app --args -d -r```  

- __Example Windows:__  
```nw\nw.exe -d -r```

###Builds###
- ```grunt build-win``` to build Windows 32 and 64bit Binaries (When you want to build this on a Mac you need WINE)
- ```grunt build-linux``` to build Linux 32 and 64bit Binaries
- ```grunt build-osx``` to build MacOS 64bit Binaries

##Building Docs  
```grunt yuidoc``` generates Code documentation into ./docs (its in .gitignore)  
*Not all Documented yet*  
    
![Thx4BetaTest](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/beta.jpg)  
[Serasar](https://github.com/Serasar)  
[axed](https://github.com/axed)  
[scar45](https://github.com/scar45)  
The [DooMWorld](www.doomworld.com/) Community