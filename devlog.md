# Development Log for Shadowrun 6th World FoundryVTT System Module

Are systems modules? are they just systems? 

## 4.24.2020, nevenall

I want to create some packs for this, but not in a public repo. If I make the repo private then I'd have to do a local install right? 
Can I install the system from my local repo? that might be idea. Can try out stuff. Or, include the packs locally and gitignore them than we can keep the repo public. Have to careful not to include them in the public manifest though. if you have a missing pack in your system.json what happens when you update the system? 

Main changes for 6th world, 

- glitches and critical glitches
- remove limits
- changes to edge
  - include the various ways you can use it before and after a roll
  - attack rating and defense values
- simplified skills
- character sheet, cyberize it a bit, augmentedui might be great. colors and fonts. could use ghosting fonts/colors



lots of rolling related stuff. And some character stuff. 


### naming questions

Is there a reason to include the edition number in naming? how global is the game global?
Like will there be conflicts if we just name stuff shadowrun or SR? because when 7th ed comes around its going to be a pain to rename everything. I assume stuff is isolated to the game that is currently launched. 

I think games are isolated enough that we can drop the version from the system. 


## Local Development 

Also, the install system is pretty much just a copy of the repo, which means we could make the installed system folder the repo and even attach to the app for debugging. 


### 4.25.2020, nevenall

got the rename done. Tried to switch to TabsV2, but it didn't go real well. Switched back for now. 
going to try editing the template for 6th e

need defense rating and attack rating

  Close: 0-3 meters Every gun has this one, though some are actually less effective here because they’re so bulky.

  Near: 4-50 meters This is the sweet spot across the board. All ranged weapons can get into this range. How effective they are is a whole other question.

  Medium: 51-250 meters You need some barrel length to be effective
  here. Some smaller arms can get here, but hitting a target falls more into the realm of trickery and magic than skill.

  Far: 251-500 meters Welcome to the land of longarms. This is the place where size matters—well, at least the length of the barrel.

  Extreme: 500+ Sure, your tricked-out Colt M-23 can get here,
  barely, but that Ranger Arms revels in these ranges.

these are defined range categories and we can include them in the game. Maybe a rules config somewhere.

Also include conditions. Confused, Shocked, etc...

Ok, work backwards from the character sheet to the template, because editing the template will make all kinds of errors and such. 

Personal Data

Attributes (current, max, temp adjustments)
	all the attributes
	edge & edge points
	composure
	judge intentions
	…
	lift/carry
	awakened?
	? include stuff like drain and other shortcuts ?
	
Skills (rank, attribute, [Pool], specialty, expertise)
	There is a small enough list I think we can just show them all

Combat
	movement
	armor
		Defense rating
	ranged
		dv, mode, close, near, far, extreme, ammo
	close combat
		unarmed - dv, close ar
	
Condition Monitor

	Physical Damage
		Boxes 0-18, overflow damage, (just a number, I think)
	Stun Damage
		Boxes 0 -12
	
	Statuses
		Blinded I, II or III
		Burning #
		Chilled
		Confused #
		Corrosive #
		Cover I, II, III, or IV
		Dazed
		Deafened I, II, or III
		…and so on. Can we get these to update reactively to and from the token? that would be sweet

Qualities
	your karma qualities, good and bad
	
Ids/lifestyle/wealth ?social?
	Ids, lifestyle, money reputation, heat,…etc

Contacts
	list of contacts
	
	

Then there are all the more details sections about your specific kick. 
Equipment, matrix, magic, cyberware, adept powers…all that.

start simple, all we really need is the ability to track our attributes and skills and stuff and roll arbitrary dice with or without explodes. and track damage. 


## 4.26.2020

adding a testing folder with an index.html and a copy of foundry's style.css so that I can dev the sheets without starting foundry. 

just need handlebars and some fake data. The interacts probably won't work, but it will be a start. 

So, we need gulp to run sass and make a shadowrun.css we can copy to a dist directory
need to gather and compile the handlebar templates, need some test.json to load in probas
maybe even run the sheet.js? depends on wether that's more foundry or handlebars.

tried to setup a gulp watch version of the character sheet, but there are too many dependencies to be worth it. We'll just have to do it through the app. 

So, big question is what is the layout for the character? 
I don't like the book one, we have the power of tabs so might as well use them. 


There is totally a bug in the token association. dnd5e works just fine. 


## 4.28.2020

went back to basics with the simple system example. 

Do we need the shadowrun class for css? 
Also, I think we can set it up so there's one stylesheet per character sheet. 

- styling 
  - colors
    - replicate the 6th world colors? purple and white? 
    - can we find an svg background for character sheet? 

I would like to add a markdown editor for the rich text. Maybe the editor currently being used can be moddied to use markdown also with out special terms? 

foundry.js:4381

looks like tinymce can do some markdown like syntax helpers but that's it. 

can we find a workable md replacement?
https://github.com/sparksuite/simplemde-markdown-editor can implement our own markdown parser for this. 

https://easymde.tk/ which is a fork of the simple mde that adds autosave, which would be rocken for this.

oh, maybe that custom renderer is just for preview? Ah, preview is all there is. 

find out how foundry stores rich text, as html? I guess if we can keep both the markdown and the current html. 
And if this is just for one system, we should be able to do what we want.  Consider storing the preview html for performance. 

## 4.29.2020

Colors, can we steal the color scheme from https://github.com/arwes/arwes? dark background with neon blue? 

https://github.com/alpinejs/alpine might be helpful too. It's a lightweight declarative replacement for jquery. 

And fonts, abel is cool. lets see what else we have...

Abel
Advent Pro
Aldrich
Amiko
Anteb, lightish body font
Kongress

Shadowrun 1st ed uses the Friz Quadrata family. Bold caps for headers. reg for body text.

the charactersheets are pretty basic and done in those fonts. 



Personal Data
  Name/Alias


Attributes (current, max, temp adjustments)
	all the attributes
	edge & edge points
	composure
	judge intentions
	…
	lift/carry
  
	awakened?
	? include stuff like drain and other shortcuts ?
	
Skills (rank, attribute, [Pool], specialty, expertise)
	There is a small enough list I think we can just show them all

Combat
	movement
	armor
		Defense rating
	ranged
		dv, mode, close, near, far, extreme, ammo
	close combat
		unarmed - dv, close ar
	
Condition Monitor

	Physical Damage
		Boxes 0-18, overflow damage, (just a number, I think)
	Stun Damage
		Boxes 0 -12
	
	Statuses
		Blinded I, II or III
		Burning #
		Chilled
		Confused #
		Corrosive #
		Cover I, II, III, or IV
		Dazed
		Deafened I, II, or III
		…and so on. Can we get these to update reactively to and from the token? that would be sweet

Qualities
	your karma qualities, good and bad
	
Ids/lifestyle/wealth ?social?
	Ids, lifestyle, money reputation, heat,…etc

Contacts
	list of contacts


So, Name and image are the header. 


Image    Name/alias
         [awakened/mundane dropdown] [metatype dropdown] ethnicity age gender height weight

Favorites | Attributes & Skills | Qualities | Tab


figured out how to add alias to the character template and got the font changed

Got a bit of a layout in mind, but, I think I'll change the layout container from flex to grid. we're already using up to data browsers
so, grid will be good for layout. 

## 4.30.2020

image   name: alias:
image   _____ ______
image   nature: metatype: ethnicity: 
image   ______  _______   _________
image   age: gender: height: weight:
image   ____ ______  ______  _______  

3 grid rows
2 grid columns

## 5.1.2020

maybe consider placing attributes above the tabs and making the default tab skills. 
then the skills tab can be active and knowledge skills. 

I'm thinking each attribute is a box with a centered number for current. The base is in a small box in the lower left, then there are 2 adj boxes for cyberware and magic and stuff. Once centered the other lower right. 

Strength

   3

2  +1 adj

Want the attribute name to scale based on the length of the word? Naw each box has a fix size. 

### Packs

I was thinking that packs could also be local to the world. In fact, they could be a private repo that you can clone into your world. Except when I copied the world from one to the other, it didn't really take. There's some kind of config that needs including I believe. 

## 5.4.2020

working on sheet calculations. Looking at dnd5e it looks like they use the prepareData function in the 5e Actor to do dynamic calcs. Which, I believe means that they all run whenever the sheet is updated. That could cause some perf issues eventually. 

Can we do better? Seems like there is a loop that is based on the form? we get data from the actor sheet class and pass that to handlebars? If we don't include a form element can we stop the handlebars look and do something different? 

Take the data json and use alpine to bind the various inputs and calcs? can we programmatically give alpine data? the problem is how does the data for the character get saved as changes are made? I think that's what the update function does? 
mm...if we can programmatically give alpine the data object and if we can appropriately reflect data changes. 

Or we could leave it as-is and create helpers to do math. 

There is indeed a whole cycle of getdata from actor class whenever there's an update, so actor class, update fuction
Also, with the  data-dtype="Number" we can fix the saved as text issue. 

Added description to the character sheet so that we have something we can use until the character is more fleshed out. 

so two outstanding questions for today: 
1. can we use alpinejs or reactivejs to do the dynamic parts of the character sheet? can we get it work with the form based saving loop?
can we replace the form and do more of a targeted reactive update? maybe even fancy with redux and such? 
2. can we replace the tinymce with an embedded markdown version?

Need to document the stuff that we do for this. 

### 5.5.2020

the inline markdown editor seems like it will work. There's some foundy specific stuff that processes html. We can run it after we generate html. 

I would like the md editor to be the inline editor for the whole system. Not sure how to make that switch. 

for now lets get the character sheet done. 

We need to calc magic based on your current essence. 
perhaps we ought to setup actor sheet calcs in the code like the dnd sheet does. 

we can externalize a fair amount to a shadowrun rules module. 

We need to have the current value of attributes for other calcs and rules and such
Right click on an attribute box to adjust your min and max? 

should we calc the currents on get data or on update data? 


Let's calc on update data, we can create one function that does the updates. Might eventually move to a web worker

so, there is the actor data and the entity. where is that extra duplciate of data coming from and what can I do about it?

## 5.7.2020

got the character sheet calculation going. 
Need to do metatype maximums for attributes and then skills. and then a roll template.
