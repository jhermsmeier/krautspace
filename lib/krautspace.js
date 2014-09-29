var Krautspace = module.exports
var https = require( 'https' )
var http = require( 'http' )
var Feed = require( 'feedme' )

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
        new Error( http.STATUS_CODES[ response.statusCode ] ) : null
      callback( error, data )
    })
    
  })
  
  return request.on( 'error', function( error ) {
    callback( error )
  })
  
}

Krautspace.statusURL = 'https://status.krautspace.de/api'
Krautspace.feedURL = 'https://status.krautspace.de/feed.xml'

Krautspace.getStatus = function( callback ) {
  
  return request( Krautspace.statusURL, function( error, data ) {
    
    var status = null
    
    if( error == null ) {
      try { status = JSON.parse( data ) }
      catch( exception ) { error = exception }
    }
    
    callback( error, status )
    
  })
  
}

Krautspace.getFeed = function( callback ) {
  
  return request( Krautspace.feedURL, function( error, data ) {
    
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

// Exports
module.exports = Krautspace
