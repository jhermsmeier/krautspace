#!/usr/bin/env node
var Krautspace = require( '../' )
var color = require( 'chalk' )
var moment = require( 'moment' )
var tab = require( 'tab' )
var util = require( 'util' )
var log = console.log.bind( console )

var options = require( 'yargs' )
  .usage( 'Usage: krautspace [options] [command]' )
  .boolean( 'version' )
  .describe( 'version', 'Display version number' )
  .boolean( 'help' )
  .describe( 'help', 'Display usage help' )
  .boolean( 'color' )
  .describe( 'color', 'Force colored output (defaults to term color support)' )
  .boolean( 'no-color' )
  .describe( 'no-color', 'Force non-colored output' )
  .example( 'status', 'Display short status information (default)' )
  .example( 'info', 'Display verbose information' )
  .example( 'events', 'Display upcoming calendar events' )
  .example( 'feed', 'Display the wiki feed' )
  .example( 'json', 'Output machine readable status data as JSON' )
  .alias({
    help: 'h',
    version: 'v'
  })

var argv = options.argv

if( argv.version ) {
  return log( require( '../package' ).version )
}

log( '' )

if( argv.help ) {
  return options.showHelp()
}

function inspect( value ) {
  log( util.inspect( value, {
    colors: color.supportsColor,
    depth: null
  }))
}

function FAIL( error ) {
  if( error != null ) {

    var msg = [
      color.red( '[ERROR]' ),
      error.message
    ]

    console.log( msg.join( ' ' ) )
    process.exit( 1 )

  }
}

function header( status ) {
  log( [
    color.green( '[KRAUTSPACE]' ),
    status.state.open ?
      color.yellow( '[OPEN]' ) :
      color.red( '[CLOSED]' ),
    '(' + moment( status.state.lastchange * 1e3 ).fromNow() + ')',
    '\n' + color.cyan( '[STATUS]' ),
    status.state.message,
  ].join( ' ' ) )
}

function contact( status ) {

  tab.emitTable({
    columns: [{
      label: '',
      align: 'left',
      width: 15,
    },{
      label: '',
      align: 'right',
    }],
    rowSeparator: '\n  ',
    rows: [
      [ 'Web',          color.cyan( status.url ) ],
      [ '', '' ],
      [ 'Twitter',      color.cyan( status.contact.twitter ) ],
      [ 'Email',        color.cyan( status.contact.email ) ],
      [ 'Mailing List', color.cyan( status.contact.ml ) ],
      [ 'Jabber',       color.cyan( status.contact.jabber ) ],
      [ 'Identica',     color.cyan( status.contact.identica ) ],
      [ '', '' ],
      [ 'Address',      color.cyan( status.location.address ) ],
      [ 'Location',     color.cyan( status.location.lat + ', ' + status.location.lon ) ],
    ]
  })

}

function feed( meta, items ) {

  var items = items.slice( 0, 7 ).map( function( item ) {
    var time = moment( item.updated )
    var open = /geöffnet/i.test( item.title )
    return { open: open, time: time }
  })

  var item, end
  var times = []

  while( item = items.shift() ) {
    if( item.open ) {
      times.push([
        item.time.format( 'dddd' ),
        item.time.format( 'HH:mm' ) +' - '+ 'now'
      ])
    } else {
      end = items.shift()
      end && times.push([
        end.time.format( 'dddd' ),
        end.time.format( 'HH:mm' ) +' - '+ item.time.format( 'HH:mm' )
      ])
    }
  }

  tab.emitTable({
    columns: [{
      label: '',
      align: 'left',
      width: 10,
    },{
      label: '',
    }],
    rowSeparator: '\n  ',
    rows: times
  })

  log('')

}

function wikiFeed( meta, items ) {

  var entries = items.filter( function( item ) {
    return item.description && !/<[^>]+\/>/.test( item.description )
  }).map( function( item ) {
    var time = moment( item.date )
    var description = item.description.split( /\r?\n/g )
    var title = description.shift()
    return {
      title: title,
      description: description.join( '\n' ).trim(),
      date: item.date,
      author: item.author,
      link: item.link,
    }
  })

  var currentDate = null

  entries.forEach( function( entry ) {

    var date = moment( entry.date ).format( 'DD.MM.YYYY, dddd' )
    var time = moment( entry.date ).format( 'HH:mm' )
    var description = entry.description.split( '\n' ).shift()

    if( description && description.length > 72 ) {
      description = description.slice( 0, 69 ) + '…'
    }

    if( date != currentDate ) {
      currentDate = date
      console.log( ' ', color.green( currentDate ) )
      console.log( '' )
    }

    console.log( '   ', color.grey( time ), ' ', color.reset( entry.title ), color.grey( '– ' + entry.author ) )
    console.log( '           ', color.blue( entry.link ) )
    console.log( '           ', color.grey( description ) )
    console.log( '' )

  })

}

function displayJSON() {
  Krautspace.getStatus( function( error, status ) {
    FAIL( error )
    console.log( JSON.stringify( status, null, 2 ) )
  })
}

function displayStatus() {
  Krautspace.getStatus( function( error, status ) {
    FAIL( error )
    header( status )
    var feedURL = status.feeds && status.feeds.wiki &&
      status.feeds.wiki.url
    Krautspace.getFeed( function( error, meta, items ) {
      FAIL( error )
      feed( meta, items )
    })
  })
}

function displayWikiFeed() {
  Krautspace.getStatus( function( error, status ) {
    FAIL( error )
    header( status )
    console.log( '' )
    console.log( ' ' + color.yellow( '[WIKI FEED]' ) )
    console.log( '' )
    var feedURL = status.feeds && status.feeds.wiki &&
      status.feeds.wiki.url
    Krautspace.getFeed( feedURL, function( error, meta, items ) {
      FAIL( error )
      wikiFeed( meta, items )
    })
  })
}

function displayInfo() {
  Krautspace.getStatus( function( error, status ) {
    FAIL( error )
    header( status )
    contact( status )
    // inspect( status )
  })
}

function displayEvents() {
  Krautspace.getEvents( function( error, events ) {

    FAIL( error )

    var daysFromNow = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 )
    var currentDate = null

    events = events.filter( function( event ) {
        return event.date < daysFromNow
      })
      .forEach( function( event ) {

          var date = moment( event.date ).format( 'DD.MM.YYYY, dddd' )
          var time = moment( event.date ).format( 'HH:mm' )

          if( date != currentDate ) {
            currentDate = date
            console.log( ' ', color.green( currentDate ) )
            console.log( '' )
          }

          console.log( '   ', color.grey( time ), ' ', color.reset( event.title ) )
          console.log( '           ', color.blue( event.url ) )
          console.log( '           ', color.dim.grey( event.tags.join( ', ' ) ) )
          console.log( '' )

      })

  })
}

switch( argv._.shift() ) {
  case 'json': displayJSON(); break
  case 'info': displayInfo(); break
  case 'events': displayEvents(); break
  case 'feed': displayWikiFeed(); break
  default: displayStatus(); break
}
