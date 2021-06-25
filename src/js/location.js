export default function getLocation() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(`[${position.coords.latitude}, -${position.coords.longitude}]`);
      }, (error) => {
        reject(error);
      });
    });
  }
  return new Promise((resolve, reject) => reject(new Error('Geo not avalible')));
}
