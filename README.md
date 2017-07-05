# Krautspace
[![npm](https://img.shields.io/npm/v/krautspace.svg?style=flat-square)](https://npmjs.com/package/krautspace)
[![npm downloads](https://img.shields.io/npm/dm/krautspace.svg?style=flat-square)](https://npmjs.com/package/krautspace)

CLI for the [Krautspace Hackerspace](https://kraut.space) in Jena

## Install via [npm](https://npmjs.com/package/krautspace)

```sh
$ npm install --global krautspace
```

## Usage: Command Line Interface

```
Usage: krautspace [options] [command]

Options:
  --version, -v  Display version number                                [boolean]
  --help, -h     Display usage help                                    [boolean]
  --color        Force colored output (defaults to term color support) [boolean]
  --no-color     Force non-colored output                              [boolean]

Examples:
  status  Display short status information (default)
  info    Display verbose information
  events  Display upcoming calendar events
  feed    Display the wiki feed
  json    Output machine readable status data as JSON
```

### Status

```sh
$ krautspace

[KRAUTSPACE] [CLOSED] (a few seconds ago)
[STATUS] no human being on location

  Saturday   17:49 - 02:54
  Saturday   13:54 - 17:24
  Friday     18:14 - 01:59

```

### Info

```sh
$ krautspace info

[KRAUTSPACE] [CLOSED] (a minute ago)
[STATUS] no human being on location

  Web             https://kraut.space/

  Twitter         @HackspaceJena
  Email           office@krautspace.de
  Mailing List    hackspace-jena@list.lstsrv.org
  Jabber          krautchan@chat.krautspace.de
  Identica        krautspace@quitter.se

  Address         Krautgasse 26, 07743 Jena, Germany
  Location        50.9291968, 11.5824294

```

### Events

```sh
$ krautspace events

  21.11.2016, Monday

    20:30   Elektronikrunde
            https://calcifer.datenknoten.me/termine/738-elektronikrunde
            jena, elektronik, löten, hackspace, hacken, drucken, ätzen, 3d-druck

  22.11.2016, Tuesday

    21:20   OpenKraut — Offene Runde im Krautspace
            https://calcifer.datenknoten.me/termine/739-openkraut-offene-runde-im-krautspace
            jena, hackspace, hacken, dienstag, offen

  23.11.2016, Wednesday

    20:00   Rollenspielrunde
            https://calcifer.datenknoten.me/termine/740-rollenspielrunde


  24.11.2016, Thursday

    21:20   Linux User Group (LUG) Jena
            https://calcifer.datenknoten.me/termine/741-linux-user-group-lug-jena
            linux, hilfe, support, user group

  26.11.2016, Saturday

    16:00   Junghackertag
            https://calcifer.datenknoten.me/termine/junghackertag-7
            hackspace, junghacker, kinder- und jugendarbeit, peltier, leselampe

  27.11.2016, Sunday

    15:00   Mitgliederversammlung des Hackspace Jena e.V
            https://calcifer.datenknoten.me/termine/mitgliederversammlung-des-hackspace-jena-ev
            jena, hackspace, mitgliederversammlung, vorstandswahlen

```

### Wiki

```sh
$ krautspace feed

[KRAUTSPACE] [CLOSED] (a few seconds ago)
[STATUS] open for public

 [WIKI FEED]

  02.07.2017, Sunday

    20:48   Was ist bei einem Vorstandswechsel des Vereins zu tun? – bernd
            https://kraut.space/hswiki:anleitungen:vorstandswechsel
            Unten ist eine Checkliste, welche Schritte bei einem Vorstandswechsel…

  29.06.2017, Thursday

    08:21   Alternative Orientierungstage (ALOTA) 4.0 – fpunktk
            https://kraut.space/hswiki:termine:einmalige:2017:alota
            Wann?

  28.06.2017, Wednesday

    10:59   Kommunikation – fpunktk
            https://kraut.space/communication
            E-Mail

  27.06.2017, Tuesday

    22:52   hackbot – qbi
            https://kraut.space/hswiki:misc:hackbot
            Derzeit ist der Bot nicht aktiv. Der benötigt eine Überarbeitung.

    19:04   Brettspielerei – bernd
            https://kraut.space/hswiki:termine:regelmaessige:gesellschaftsspielerei
            Spielen im Krautspace!

    17:45   Lange Nacht der Wissenschaften 2017 – qbi
            https://kraut.space/hswiki:termine:einmalige:2017:lndw
            Diese Wikiseite ist zur Planung der Aktivitäten gedacht. Wir haben be…

    16:09   [Navigation] – qbi
            https://kraut.space/sidebar
            Krautspace — Der Hackspace in Jena index

    15:57   Willkommen im Krautspace – qbi
            https://kraut.space/start
            Hacker, Bastler und Solche, die es werden wollen: Der Krautspace ist …

```

## Usage: Library API

```js
var Krautspace = require( 'krautspace' )
```

```js
// Space status & metadata
Krautspace.getStatus( function( error, status ) {
  console.log( status )
})
```

```js
{
  space: 'Krautspace',
  url: 'https://www.krautspace.de/',
  issue_report_channels: ['email'],
  contact: {
    ml: 'hackspace-jena@list.lstsrv.org',
    twitter: '@HackspaceJena',
    jabber: 'krautchan@chat.krautspace.de',
    email: 'office@krautspace.de',
    identica: 'krautspace@quitter.se'
  },
  state: {
    lastchange: 1411984021,
    open: false,
    message: 'no human being on location',
    icon: {
      open: 'http://status.krautspace.de/images/krautspace_pixelicon_open.png',
      closed: 'http://status.krautspace.de/images/krautspace_pixelicon_closed.png'
    }
  },
  api: '0.13',
  location: {
    lat: 50.9291968,
    lon: 11.5824294,
    address: 'Krautgasse 26, 07743 Jena, Germany'
  },
  logo: 'https://media.krautspace.de/files/logo/krautspace_pixelbanner.png',
  feeds: {
    wiki: {
      url: 'https://www.krautspace.de/feed.php',
      type: 'application/rss+xml'
    },
    calendar: {
      url: 'https://grical.org/s/?query=%23krautspace&view=ical',
      type: 'text/calendar'
    }
  }
}
```

```js
// Space status feed
Krautspace.getFeed( function( error, feed ) {
  console.log( feed )
})
```

```js
{
  type: 'atom',
  id: 'https://status.krautspace.de/feed.xml',
  title: 'Raumstatus für Krautspace',
  updated: '2016-10-28T00:34:01+00:00',
  author: { name: 'SpaceAPI2Feed' },
  link: [{
    href: 'https://status.krautspace.de/feed.xml',
    rel: 'self'
  }, {
    href: 'https://status.krautspace.de/api',
    rel: 'alternate',
    type: 'application/json'
  }],
  generator: {
    version: 'dev',
    uri: 'http://ezcomponents.org/docs/tutorials/Feed',
    text: 'eZ Components Feed'
  },
  logo: 'https://kraut.space/',
  subtitle: 'Zeigt an ob der Raum geöffnet oder geschlossen ist.',
  items: [{
    id: 'https://status.krautspace.de/1477614841',
    title: 'Krautspace ist seit 02:34 geschlossen',
    updated: '2016-10-28T00:34:01+00:00',
    author: { name: 'spaceapi2rss' },
    link: { href: 'https://kraut.space/' },
    summary: 'Krautspace ist seit 02:34 geschlossen'
  }, {
    id: 'https://status.krautspace.de/1477583941',
    title: 'Krautspace ist seit 17:59 geöffnet',
    updated: '2016-10-27T15:59:01+00:00',
    author: { name: 'spaceapi2rss' },
    link: { href: 'https://kraut.space/' },
    summary: 'Krautspace ist seit 17:59 geöffnet'
  },
  // ...
  ]
}
```

```js
// Space calendar events in the next ~30 days
Kraustpace.getEvents( function( error, events ) {
  console.log( events )
})
```

```js
[
  {
    title: 'Junghackertag',
    date: 2016-10-29T15:00:00.000Z,
    url: 'https://calcifer.datenknoten.me/termine/junghackertag-5',
    description: '',
    tags: [
      'hackspace',
      'junghacker',
      'kinder- und jugendarbeit',
      'pentabug'
    ]
  }, {
    title: 'Elektronikrunde',
    date: 2016-10-31T19:30:00.000Z,
    url: 'https://calcifer.datenknoten.me/termine/719-elektronikrunde',
    description: 'Zur Elektronikrunde kann man sich konzentriert in unterschiedliche Technikprojekte vertiefen. Wir helfen uns gegenseitig mit Werkzeugen, Materialien und Wissen aus, um unsere Ideen zu verwirklichen oder einfach nur ein defektes Gerät zu reparieren.',
    tags: [
      'jena',
      'elektronik',
      'löten',
      'hackspace',
      'hacken',
      'drucken',
      'ätzen',
      '3d-druck'
    ]
  }, {
    title: 'Repariercafé-Vorbesprechung',
    date: 2016-11-01T17:30:00.000Z,
    url: 'https://calcifer.datenknoten.me/termine/repariercafe-vorbesprechung',
    description: 'Vorbesprechung zum nächsten Repariercafé',
    tags: [ 'jena', 'plenum', 'repariercafe' ]
  },
  // ...
]
```
