export function getGeolocation(navigator: Navigator): Promise<{latitude: number, longitude: number}> {
  console.log("Get location")
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => resolve({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }), (error) => reject(error), { enableHighAccuracy: true });
  })
}

