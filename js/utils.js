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