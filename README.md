# Super Shotgun Launcher  
Doom Frontend with Oblige mapbuild integration for zdoom, gzDoom, Skulltag, Doom64EX and Zandronum written in AngularMaterial on NWJS for Windows and Linux.  

##Just gimme the Binary Releases:
[32 and 64bit Windows/Linux Releases](https://github.com/FreaKzero/ssgl-doom-launcher/releases)

![Demo](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/readme.gif)
![Demo2](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/readme-2.gif)

##Features:  
- Painfree modern UI
- Easy Filtering through your WADs (directory-names and wad-names)
- Loadorder sorting for chosen WADs
- Creating/Saving wadlists for faster access
- Using/Creating Savefolders based on the name on used wadlist
- [zDoom](http://zdoom.org), [gzDoom](https://github.com/coelckers/gzdoom), [Skulltag](http://www.skulltag.com/), [Doom64EX](https://doom64ex.wordpress.com) and [Zandronum](https://zandronum.com/) Support
- [Oblige](http://oblige.sourceforge.net/) "Build and Play" via Configfiles (Also able to resume last built map)
- Fast access to your favourite DoomSeeker Client and Oblige Frontend
- Automatic Update Notifier

##Retro Reskin Version  
[scar45](https://github.com/scar45) made an own fork with an "retro-reskin" [here](https://github.com/scar45/ssgl-doom-launcher)

##If you want to Help/Contribute  
Taiga: https://tree.taiga.io/project/freakzero-gzdoom-launcher  
Gitter: [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/FreaKzero/ssgl-doom-launcher?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

##Howto Build:
Be sure that ```bower``` and ```grunt-cli``` is installed.  
Clone this Repository with ```git clone https://github.com/FreaKzero/ssgl-doom-launcher```  
go into the rootfolder of ssgl-doom-launcher  
Install all dependencies with ```bower install``` (bower configuration handles npm automatically)  
```grunt build-win``` for building 32 and 64 bit Windows Binaries (will be generated into ./build folder)  
```grunt build-linux``` for building 32 and 64 bit Linux Binaries (will be generated into ./build folder)  

##Development Environment  
After you've done ```bower install```, you can build your development environment with:

```grunt build-devenv-win``` for Windows 64Bit  
```grunt build-devenv-linux32``` for Linux 32Bit  
```grunt build-devenv-linux64``` for Linux 64Bit  

It will make a new folder in your root named ./nw (Version 0.12.0 of NodeWebkit will be fetched via curl(), that can take a while) - with all dependencies and configs installed for development use (so you dont have to build everytime).

When you dont use Sublime Text (see projectfile - buildsystems) use the commandline argument ```--devtools``` or ```-d``` to get an "Open Devtools" Icon in the Toolbar. In Development mode you can press F5 to reload the App.  

##Building Docs  
```grunt yuidoc``` generates Code documentation into ./docs (its in .gitignore)  
*Not all Documented yet*  
    
![Thx4BetaTest](https://github.com/FreaKzero/ssgl-doom-launcher/blob/master/readme/beta.jpg)  
[Serasar](https://github.com/Serasar)  
[axed](https://github.com/axed)  
