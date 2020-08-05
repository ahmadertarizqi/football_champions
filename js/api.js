const API = (function() {
   const URL = 'https://api.football-data.org/v2';
   const league = {
      id: 2001,
      name: 'Champions League'
   }
   
   const options = {
      headers: {
         'X-Auth-Token': '54fc7df3a2e14f7d881e993a12db5f97'
      }
   }

   const fetchData = function(url) {
      return fetch(url, options)
         .then(response => {
            if(!response.ok) {
               return response;
            }
            return response.json();
         })
         .catch(error => {
            console.log('this error from fetchData', error);
            return error;
         });
   }

   const checkCache = function(url) {
      if('caches' in window) {
         return caches.match(url)
               .then(response => response.json())
               .catch(error => {
                  console.log('this error from checkCache', error);
                  return error;
               });
      }
   }

   return {
      getKlasemen: function() {
         const endpoint = `${URL}/competitions/${league.id}/standings?standingType=TOTAL`;
         if(checkCache(endpoint)) {
            return checkCache(endpoint).then(result => result);
         }
         return fetchData(endpoint)
            .then(result => result)
            .catch(error => console.log('get Klasemen error', error));
      },
      getClubs: function() {
         const endpoint = `${URL}/competitions/${league.id}/teams`;
         if(checkCache(endpoint)) {
            return checkCache(endpoint).then(result => result);
         }
         return fetchData(endpoint)
            .then(result => result)
            .catch(error => console.log('get Clubs error', error));
      },
      getClub: function(clubID) {
         const endpoint = `${URL}/teams/${clubID}`;
         if(checkCache(endpoint)) {
            return checkCache(endpoint).then(result => result);
         }
         return fetchData(endpoint)
            .then(result => result)
            .catch(error => console.log('get Clubs error', error));
      },
      getPertandingan: function() {
         const endpoint = `${URL}/competitions/${league.id}/matches`;
         if(checkCache(endpoint)) {
            return checkCache(endpoint).then(result => result);
         }
         return fetchData(endpoint)
            .then(result => result.matches)
            .catch(error => console.log('get Pertandingan Error', error));
      }
   }

})();

/* testing api */
// API.getPertandingan();