// Credits to https://stackoverflow.com/questions/25350807/how-to-generate-random-lat-lng-values-with-known-center-and-radius-in-javascript/28699123

export const getRandomLocation = function (latitude, longitude, radiusInMeters) {
  var getRandomCoordinates = function (radius, uniform) {
    // Generate two random numbers
    var a = Math.random()
    var b = Math.random()

    // Flip for more uniformity.
    if (uniform) {
      if (b < a) {
        var c = b
        b = a
        a = c
      }
    }

    // It's all triangles.
    return [
      b * radius * Math.cos(2 * Math.PI * a / b),
      b * radius * Math.sin(2 * Math.PI * a / b)
    ]
  }

  var randomCoordinates = getRandomCoordinates(radiusInMeters, true)

  // Earths radius in meters via WGS 84 model.
  var earth = 6378137

  // Offsets in meters.
  var northOffset = randomCoordinates[0]
  var eastOffset = randomCoordinates[1]

  // Offset coordinates in radians.
  var offsetLatitude = northOffset / earth
  var offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)))

  // Offset position in decimal degrees.
  return {
    lat: latitude + (offsetLatitude * (180 / Math.PI)),
    lng: longitude + (offsetLongitude * (180 / Math.PI))
  }
}
