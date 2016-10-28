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
  json    Output machine readable status data as JSON
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
