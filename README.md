# Krautspace
[![npm](http://img.shields.io/npm/v/krautspace.svg?style=flat)](https://npmjs.org/krautspace)
[![npm downloads](http://img.shields.io/npm/dm/krautspace.svg?style=flat)](https://npmjs.org/krautspace)

## Install via [npm](https://npmjs.org)

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
