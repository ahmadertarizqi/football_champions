function groupBy(array, key) {
   return array.reduce((result, currentValue) => {
      const cvrKey = key.toLowerCase();
      if(!result[currentValue[cvrKey]]) {
         result[currentValue[cvrKey]] = [];
      }
      result[currentValue[cvrKey]].push(currentValue);
      return result;
   }, {});
}

function urlBase64ToUint8Array(base64String) {
   const padding = '='.repeat((4 - base64String.length % 4) % 4);
   const base64 = (base64String + padding)
       .replace(/-/g, '+')
       .replace(/_/g, '/');
   const rawData = window.atob(base64);
   const outputArray = new Uint8Array(rawData.length);
   for (let i = 0; i < rawData.length; ++i) {
       outputArray[i] = rawData.charCodeAt(i);
   }
   return outputArray;
}