# Krautspace
[![npm](https://img.shields.io/npm/v/krautspace.svg?style=flat-square)](https://npmjs.com/package/krautspace)
[![npm downloads](https://img.shields.io/npm/dm/krautspace.svg?style=flat-square)](https://npmjs.com/package/krautspace)
[![build status](https://img.shields.io/travis/jhermsmeier/krautspace.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/krautspace)

CLI for the Krautspace Hackerspace in Jena

## Install via [npm](https://npmjs.com/package/krautspace)

```sh
$ npm install --global krautspace
```

## Usage: Command Line Interface

```
Usage: krautspace [options] [command]

Examples:
  status    Display short status information (default)
  info      Display verbose information
  json      Output machine readable status data as JSON


Options:
  --version, -v  Display version number
  --help, -h     Display usage help
  --color        Force colored output (defaults to terminal color support)
  --no-color     Force non-colored output
```

## Usage: Library API

```js
var Krautspace = require( 'krautspace' )
```

```js
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
Krautspace.getFeed( function( error, feed ) {
  console.log( feed )
})
```

```js
{
  type: 'atom',
  title: 'Raumstatus für Krautspace',
  subtitle: 'Zeigt an ob der Raum geöffnet oder geschlossen ist.',
  link: [{
    rel: 'alternate',
    type: 'text/html',
    href: 'https://www.krautspace.de/'
  }, {
    rel: 'self',
    type: 'application/atom+xml',
    href: 'https://status.krautspace.de/feed.xml'
  }],
  id: 'https://www.krautspace.de/',
  updated: '2014-09-29T14:05:01+00:00',
  generator: 'FeedCreator 1.8 (info@mypapit.net)',
  items: [{
    title: 'Krautspace ist seit 14:04 Uhr geöffnet',
    link: {
      rel: 'alternate',
      type: 'text/html',
      href: 'https://www.krautspace.de/'
    },
    published: '2014-09-29T14:04:02+00:00',
    updated: '2014-09-29T14:04:02+00:00',
    id: 'urn:uuid:11A8277C-E8FF-977A-97D8-6D9AA3661A46',
    author: {
      name: 'spaceapi2rss'
    },
    text: '\n     ',
    summary: 'no summary'
  }, {
    title: 'Krautspace ist seit 19:29 Uhr geschlossen',
    link: {
      rel: 'alternate',
      type: 'text/html',
      href: 'https://www.krautspace.de/'
    },
    published: '2014-09-28T19:29:02+00:00',
    updated: '2014-09-28T19:29:02+00:00',
    id: 'urn:uuid:CD25CFEB-F33A-1745-6BA7-0CDA44430E89',
    author: {
      name: 'spaceapi2rss'
    },
    text: '\n     ',
    summary: 'no summary'
  },
    ...
  ]
}
```
