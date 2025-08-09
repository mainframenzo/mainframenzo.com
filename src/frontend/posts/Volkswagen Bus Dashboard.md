<!-- 
{ 
  "draft": false,
  "type": "#thingsivemade",
  "publishedOn": "July 5, 2025", 
  "tagline": "\"It's not the fastest bus, but it's the fastest bus around.\"",
  "resourceDirName": "volkswagen_bus_dashboard",
  "boms": [
    { "templateKey": "{v1Bom}", "name": "volkswagen_bus_dashboard_v1.csv" },
    { "templateKey": "{v2Bom}", "name": "volkswagen_bus_dashboard_v2.csv" }
  ],
  "buildSlideshows": [
    { "templateKey": "{v1BuildSlideshow}", "name": "volkswagen_bus_dashboard_v1.yaml" },
    { "templateKey": "{v2BuildSlideshow}", "name": "volkswagen_bus_dashboard_v2.yaml" }
  ],
  "threedSlideshows": [
    { "templateKey": "{v13dSlideshow}", "name": "volkswagen_bus_dashboard_v1.yaml" },
    { "templateKey": "{v23dSlideshow}", "name": "volkswagen_bus_dashboard_v2.yaml" }
  ]
}
-->
# Introduction 
This post is about making a _custom dashboard_ for a 1973 Volkswagen Bus named Frances. Anthony Bourdain died the summer I made the first version, Pope Francis the spring I made the second.

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/v1.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'><p>v1</p></div>
    </div>
    <div class='column photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/v2.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'><p>v2</p></div>
    </div>
  </div>
</div>

# Listen
<div class='audio'>
  <audio controls='controls' src='/audio/posts/volkswagen_bus_dashboard/audio-normalized.ogg'>Your browser does not support audio.</audio>
</div>

Apologies for the disparate audio quality - I've got a lot to learn about audio production.

# Table of Contents 
Feel free to skip reading the background if you just want to read the recipe.

* [Background](#background)
* [Design](#design)
* [Design Files](#designfiles)
* [Bill of Materials](#billofmaterials)
* [Build Walk-through](#buildwalkthrough)
* [Retrospective](#retrospective)
* [V2](#v2)
* [V2 / Design](#v2design)
* [V2 / Design / Acceptance Criteria](#v2designacceptancecriteria)
* [V2 / Design Files](#v2designfiles)
* [V2 / Bill of Materials](#v2billofmaterials)
* [V2 / Build Walk-through](#v2buildwalkthrough)
* [Closing Thoughts](#closingthoughts)

# Background 
[🔙](#tableofcontents)
I describe driving my 1973 Volkswagen Bus as sitting on the head of a dragon in flight, but flying Falkor the luckdragon _also_ works as an analogy. Lots of power at the rear with its Subaru "boxer" engine conversion makes it thrilling to drive and terrifying to steer - it's _way_ too much ass. On a windy day, _tire tacking_ replaces driving <del>straight</del> gaily forward. 

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/falkor.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>Falkor<br/>
        <a href='https://images2.minutemediacdn.com/image/upload/c_fill,w_2160,ar_16:9,f_auto,q_auto,g_auto/shape%2Fcover%2Fsport%2F67303-warner-home-video-323dd8016a0726fe5248b08e1cd7aaae.jpg'>Source</a>
        </p>
      </div>
    </div>
  </div>
</div>

Teenage Mutant Ninja Turtles _the film_ was released to theatres in 1990. Honest Movie Trailers [said](https://www.youtube.com/watch?v=DOpk11r3Luo), "it's still the best one they ever made", which is a hill I would die on (if the studios could get their act together and bring [The Last Ronin](https://en.wikipedia.org/wiki/Teenage_Mutant_Ninja_Turtles:_The_Last_Ronin) to fruition on-screen with animatronics of this caliber, I would be pleasantly surprised).

The Teenage Mutant Ninja Turtles world is where my first memory of a Volkswagen Bus comes from. While I do not remember if it was the "newer" [Type 2](https://en.wikipedia.org/wiki/Volkswagen_Type_2) Casey Jones drove in the first film, or the earlier [Type 1](https://en.wikipedia.org/wiki/Volkswagen_Type_2#First_generation_(T1;_1950)) the Turtles drove in the [1990's animated series](https://www.retroheadz.com/classic-tv/eleven-awesome-cartoon-vehicles-of-the-80s-and-90s/5/), an early association formed with the Volkswagen Bus that made it synonymous with "turtle power" rather than "flower power".

<div class='container'>
  <div class='row'>
    <div class='column photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/tmnt-partywagon.webp' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>TMNT Party Wagon<br/>
        <a href='https://cdn.retroheadz.com/wp-content/uploads/2016/09/tmnt_partywagon.jpg.webp'>Source</a>
        </p>
      </div>
    </div>
  </div>
</div>

A Volkswagen Bus was added to a mental list of vehicles my younger self wished my older self to own _one day_ on account of the _Cowabunga_ (dude), and at some point I became my older self, and my older self had room for another vehicle, and so I bought one. 

----

I purchased the bus off Craigslist in a nearby state. It. Was. A. Production. I had a one-way train ticket to the seller with no backup plan - I was to purchase the bus _or bust_. In the price range I was looking for, vintage vehicles were bondo _all the way down_; so long as it moved, I would move it home. The seller picked me up in a different vehicle then the bus, and for twenty minutes we chit-chatted about small things on the way to his house: the bus was made in Germany and somehow had made its way to South America before he imported it, he was a work-from-home car dealer, oh-and-by-the-way he had enough speeding tickets to be on the verge of losing his license yet was _still_ driving 10 miles-per-hour _over_ the speed limit. I will skip the rest.

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/frances.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>Frances, purchase day</p>
      </div>
    </div>
  </div>
</div>

When I finally saw the bus in person, I could tell the "fresh" paint job was done quickly because you could see both the untreated rust spots and average body work the paint went on top of. Bodywork should not be visible. But, it looked good from three feet away, and that was all that counted. And anyways, I wanted _something_ with a bit of rust because _I had plans_, and even though I am not a purist, I would have felt some guilt frankensteining a vehicle in more pristine condition: it takes more effort to create than to destroy.

----

The seller, of course, neglected to tell me the bus did _not_ come with seat belts, so before the drive home, I headed to an auto parts store to pick up a seat belt and some basic tools to install it. The drive back went smoothly, mostly. The pouring rain was not a good time to find out the wipers were not working, and the old headlights did not live up to their appelation, but who needs to see the road?

The bus got its name, Frances, on this inaugral trip. Sometimes names come right away, sometimes they never do (call me by your name - I don't have one!)

The air-cooled engine died a couple of highway trips later. While I had the money, I hired a local shop specializing in Busarus to do an engine conversion instead of just rebuilding or replacing the air-cooled one. This work also included a re-build and re-gearing of the transmission to allow for modern highway speeds. From then on it became a daily driver.

----

I gutted a 1995 Honda Civic in search of _miles-per-gallon_ in my youth. The car had been _free_: free as in tow-it-back-from-where-it-died-and-you-can-have-it.

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/1995-honda-civic-1.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>1995 "MPG" Honda Civic</p>
      </div>
    </div>
  </div>
</div>

After a new head gasket and a de-fast-and-furiousing, I drove it around for years. This was the Toto period.

The CD player had gotten stuck playing a burned CD that came with the car. Eventually it got stuck playing a single song on that CD, and no amount of button pressing would change the behavior. If the CD player was on, there was only the "doo do do do do do dooo" of Toto's Africa. Rather than replace the CD player, I went **toto**ally insane and cut a giant notch in the dashboard, installing a touch screen laptop loaded with music. Screens in cars were a novelty at the time ¯\_(ツ)_/¯, but hindsight something something.

The Civic died again a few years later, and I turned into a donor car for experimenting with efficiency (an interest of mine at the time). I put to use the weight reduction tricks that did not take away from its "look" on the exterior, but I went _ham_ on the inside. There was not much left in there: a steering wheel, an aluminium bomber seat, a poorly crafted custom fiberglass dashboard (because the dashboard had needed to be replaced), two screens connected to cameras functioning as mirrors, and an MPGuino (a tiny computer providing a display of instantaneous and average miles-per-gallon). The loss in unsprung weight, a JDM engine and transmission swap (which was done for not for speed but for efficiency), and a slimming of the "accessory pulley" allowed me to achieve about 45 miles per gallon at 60-65 miles-per-hour, which was _roughly_ ten more miles-per-gallon than the car was rated for at that speed, a ~28% increase! Who needed power steering? 

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/1995-honda-civic-2.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'><p>1995 "MPG" Honda Civic, exterior</p></div>
    </div>
    <div class='column photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/1995-honda-civic-3.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'><p>1995 "MPG" Honda Civic, exterior</p></div>
    </div>
  </div>
</div>

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/1995-honda-civic-4.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'><p>1995 "MPG" Honda Civic, interior</p></div>
    </div>
    <div class='column photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/1995-honda-civic-5.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'><p>1995 "MPG" Honda Civic, interior</p></div>
    </div>
  </div>
</div>

The custom fiberglass dashboard got the best of me, though - it required more work and patience than I had at the time, and you could tell.

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/1995-honda-civic-6.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>1995 "MPG" Honda Civic, dashboard</p>
      </div>
    </div>
  </div>
</div>

Since then, I have wanted to try my hand in making a custom dashboard again, albeit not with fiberglass - that shit is disgusting.

----

The Type 2's dashboard is not nearly as interesting to look at as the Type 1's.

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/t1-vw-bus-dashboard.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>Type 1 Dashboard<br/>
        <a href='https://www.cnet.com/a/img/resize/96f535654c7b8171aa42f7c0c9737a32016431e7/hub/2020/08/21/651ebddb-180e-419b-876e-305ae3650a41/1967-volkswagen-type-2-bus-vw-50.jpg?auto=webp&width=1920v'>Source</a>
        </p>
      </div>
    </div>
    <div class='column photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/t2-vw-bus-dashboard.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>Type 2 Dashboard<br/>
        <a href='https://www.aircooledshop.com/images/product_images/popup_images/ablage-t2-vw-bus-t2a.jpg'>Source</a>
        </p>
      </div>
    </div>
  </div>
</div>

My assumption regarding aesthetic gravity - things we are drawn to - is that positive memories of experiences and/or physical things during formative years extend its reach, but I know diddly about that topic. What I do know is that old cars (old is possibly calculated in a 17 magazine-esque way, by taking the year you were born and subtracting five, giving you the old demarcation point) have always been in my life on account of my pops and the culture he surrounded himself with, both in person and in media (another hill I would die on is that Tokyo Drift is the best of the **Fast** franchise). All that to say, I am probably drawn to the Type 1's dashboard more because its design is minimal _and_ ornate, and the one depicted above is painted in a color I associate with softness and cleanliness, which is contrary to how I view the material of the dashboard and vehicles themselves.

----

France's dashboard had some issues: the lights were too dim and some lamps had burnt out, it was missing some glovebox pieces, the heater switch from the Subaru engine conversion had been mounted underneath to a bracket but regularly popped out, there were some aftermarket switches installed that no longer worked, the airbox toggles for hot/cold didn't work as expected, the wiring was a mess and could easily be kicked and ungrounded, and the OBDII reader I came to rely on for accurate temperature and speed readings needed a home that wasn't loosely strewn about and hanging from its harness.

<div class='container'>
  <div class='row'>
    <div class='column photo first-photo'>
      <image loading='lazy' src='/images/posts/volkswagen_bus_dashboard/frances-2.jpg' ondblclick='this.requestFullscreen()'>
      <div class='description'>
        <p>Frances' wiring</p>
      </div>
    </div>
  </div>
</div>

Let's not overcomplicate things, though; even with those problems, I could have easily neglected them. My reasons for installing a custom dashboard in the [mobe](https://www.anathem.dlma.com/data/Mobe.html) amounted to me having an itch to scratch. So I scratched.

# Design
[🔙](#tableofcontents)
I try to get away with doing as little design work as possible when working on a prototype. The final design turns into the _final_ final design only after you build it _at least once_. Don't over-think things initially - we're not sending the JWT into space ;) 

The exposed portion of a Type 2's dashboard is a curved surface, and the easiest way to both model that, _and_ build something without way more effort than I wanted to extend, was to drop a dimension.

# Design Files
{v13dSlideshow}

# Bill of Materials
{v1Bom}

# Build Walk-through
{v1BuildSlideshow}

# Retrospective
[🔙](#tableofcontents)
If I had to do it again, what would I change?
* I would drop down to two gauges - speedometer and fuel - because I really liked the OBDII reader as a replacement for most of my gauges: it shows four gauges at a time, and its temperature reading was more accurate than the temperature gauge on the old dashboard.
* I would also install new gauges.
* I would remove the airbox controls. There is no air conditioning, and the bus only ever needs heat blowing on the front windshield.
* I would adjust the design to be slightly taller to account for the curve in original dashboard, which would allow me to remove the bottom aluminium t-bar hiding the too-short design.
* I would have the dashboard [powder-coated](https://en.wikipedia.org/wiki/Powder_coating) in a color close to [Pastel White](https://www.type2.com/m-codes/t2colors.html) (the color of the interior metal). While the raw aluminium _was_ shiny, I never had any issues of glare interfering with driving, so this would be mostly an aesthetic change.

# V2
[🔙](#tableofcontents)
It had been a number of years since I built the prototype. It is normal for me to circle back to a project many years later; I just need time to _feel_ things out. I had been getting that itch again, and so eventually, I scratched - again.

# V2 / Design
[🔙](#tableofcontents)
When thinking about a dashboard design - if form _does_ follow function - perhaps we should first ask ourselves, what is the purpose of this _thing_? [The etymology of "dashboard"](https://www.etymonline.com/word/dashboard):
> "board or leather apron in front of a carriage to stop mud from being splashed ('dashed') into the vehicle by the horse's hoofs". Of motor vehicles, "panel under the windshield, on which control panels and gauges are mounted".

# V2 / Design / Acceptance Criteria
[🔙](#tableofcontents)
I figured the dashboard design _must_ meet this criteria to work for me:
1. Hold gauges
1. Allow for swappable "new tech"
1. Hold radio
1. Hold speakers
1. Nods to OG

The acceptance criteria require some elaboration, so let's jump into each criterion.

## V2 / Design / Acceptance Criteria / Hold gauges
[🔙](#tableofcontents)
Gauge bodies are threaded and there's a nut that screws onto the rear of each to allow them to be clamped to a dashboard. So, the dashboard should have holes large enough to allow the gauge bodies to pass through, but not large enough to allow gauge faces to. 

## V2 / Design / Acceptance Criteria / Allow for swappable "new tech"
[🔙](#tableofcontents) 
The dashboard should have a swappable panel that allows for the substitution of "new tech". While the current tech is an OBDII reader's LCD display, if the technology is supplanted (or far more likely: the OBDII reader dies, the model is no longer manufactured, and something needs to replace it), then swapping the panel / display out should be a breeze. 

## V2 / Design / Acceptance Criteria / Hold radio
[🔙](#tableofcontents) 
Vintage radios are usually held in place by nuts threaded onto their controls, and hidden behind the volume and tuning knobs which affix to them. So, the dashboard should have holes for the controls to pass through, as well as a larger cut-out for the radio face.

## V2 / Design / Acceptance Criteria / Hold speakers
[🔙](#tableofcontents) 
The dashboard should have a way to hold speakers so passengers can listen to the radio. Because Frances no longer had any _other_ speakers - I removed the ones placed in the doors - the dashboard is a decent place to put small speakers in close proximity aimed directly at passengers.

## V2 / Design / Acceptance Criteria / Nods to OG
[🔙](#tableofcontents) 
Aside: I heard an interview on NPR with a doctor who was introduced as "the OG of [something or other]" by the host. He asked what "OG" meant, and the NPR host replied quickly with, "original gangster - it's a good thing!" Dr. OG was non-plussed by the response, but managed to get on with it. I no longer hear OG the same.

I wanted the design to embody what I liked about the Type 1's dashboard. [Flair](https://clip.cafe/office-space-1999/we-need-talk-about-flair-s1/) was certainly lost along the way, and probably for some good reasons. I do not care about those reasons because there are no airbags either way (who needs them when your [fate](https://youtu.be/hNVqCbup2ag?t=72) is certainly death?). In order to bring some of the Type 1 _feel_ to a Type 2, the design should have:
* Metal dashboard
* Minimal gauges
* Radio panel
* Flutes where the speakers are located for more direct sound propagation, but still some protection

## V2 / Design Files
{v23dSlideshow}

## V2 / Bill of Materials
{v2Bom}

## V2 / Build Walk-through
{v2BuildSlideshow}

# Closing Thoughts
[🔙](#tableofcontents)
Eh, [good enough](https://www.scribd.com/document/818665871/certified-good-enough-sticker-scan). Mistakes were made, mistakes were covered up. Seeing the total cost figure "on paper" certainly made me ask myself, [D-I-Why?](https://www.reddit.com/r/DiWHY/), but when I turned the lights on in Frances and lit up the night, reflections skating off the dashboard, I knew the answer.

----

A young state trooper pulled me over while driving the bus on a major highway. It was on a stretch of pavement where the speed limit changed from 70 to 60 miles-per-hour (shenanigans!). I had been going 75 miles-per-hour. He asked if I knew the speed limit changed there (no), and did I know how fast I was going (no), and he had wondered if this bus was even capable of going that fast (it was), and that segued to talking about the Subaru engine upgrade. He let me off with a warning...and a laugh. So it goes. Turtle power!