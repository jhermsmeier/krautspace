var Krautspace = module.exports
var https = require( 'https' )
var Feed = require( 'feedme' )
var ical = require( 'ical2json' )
var icalDate = require( 'ical-date-parser' )

function request( url, callback ) {

  var request = https.get( url, function( response ) {

    var data = ''

    response.on( 'readable', function() {
      var chunk = null
      while( chunk = this.read() )
        data += chunk
    })

    response.on( 'end', function() {
      var error = response.statusCode >= 400 ?
        new Error( response.statusMessage ) : null
      callback( error, data )
    })

  })

  return request.on( 'error', function( error ) {
    callback( error )
  })

}

Krautspace.STATUS_URL = 'https://status.krautspace.de/api'
Krautspace.FEED_URL = 'https://kraut.space/feed.php'

Krautspace.getStatus = function( callback ) {

  return request( Krautspace.STATUS_URL, function( error, data ) {

    var status = null

    if( error == null ) {
      try { status = JSON.parse( data ) }
      catch( exception ) { error = exception }
    }

    callback( error, status )

  })

}

Krautspace.getFeed = function( feedURL, callback ) {

  if( typeof feedURL === 'function' ) {
    callback = feedURL
    feedURL = Krautspace.FEED_URL
  }

  return request( feedURL, function( error, data ) {

    var feed = null
    var parser = new Feed( true )

    try {
      parser.write( data )
      feed = parser.done()
    } catch( exception ) {
      error = exception
    }

    callback( error, feed )

  })

}

function getEventDate( event ) {

  var key = Object.keys( event ).filter( function( key ) {
    return /^DTSTART;/.test( key )
  })[0]

  var dtstart = ( key + event[key] )
    .replace( /^DTSTART;[^\:]+\:/, '' ) + 'Z'

  return icalDate( dtstart )

}

function getEventTags( event ) {
  return event['CATEGORIES']
    .split( /\s*,\s*/g )
    .filter( function( tag ) {
      return !/^krautspace$/i.test( tag )
    })
}

Krautspace.getEvents = function( callback ) {
  Krautspace.getStatus( function( error, status ) {
    if( error ) return callback( error )
    request( status.feeds.calendar.url, function( error, ics ) {

      var cal = null

      if( error ) return callback( error )

      try {
        cal = ical.convert( ics )['VCALENDAR'].shift()['VEVENT']
          .map( function( event ) {
            return {
              title: event['SUMMARY'].trim(),
              date: getEventDate( event ),
              url: event['UID'],
              description: event['DESCRIPTION'].replace( /\\{1,}/g, '' ).trim(),
              tags: getEventTags( event ),
            }
          })
      } catch( error ) {
        return callback( error )
      }

      callback( error, cal )

    })
  })
}

// Exports
module.exports = Krautspace
