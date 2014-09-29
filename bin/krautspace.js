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
  .describe( 'color', 'Force colored output (defaults to terminal color support)' )
  .boolean( 'no-color' )
  .describe( 'no-color', 'Force non-colored output' )
  .example( 'status', 'Display short status information (default)' )
  .example( 'info', 'Display verbose information' )
  // .example( 'events', 'Display upcoming calendar events' )
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

function displayJSON() {
  Krautspace.getStatus( function( error, status ) {
    FAIL( error )
    console.log( status )
  })
}

function displayStatus() {
  Krautspace.getStatus( function( error, status ) {
    FAIL( error )
    header( status )
  })
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

function displayInfo() {
  Krautspace.getStatus( function( error, status ) {
    FAIL( error )
    header( status )
    contact( status )
    // inspect( status )
  })
}

switch( argv._.shift() ) {
  case 'json': displayJSON(); break
  case 'info': displayInfo(); break
  default: displayStatus(); break
}
