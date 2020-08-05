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

   const responseStatus = function(response) {
      if(response.status !== 200){
         console.log('Error : ' + response.status);
         return Promise.reject(new Error(response.statusText));
      } else { 
         return Promise.resolve(response);
      }
   }

   const fetchData = function(url) {
      if('caches' in window) {
         return caches.match(url).then(response => {
            if(response) {
               return response.json();
            } else {
               return fetch(url, options)
                  .then(responseStatus)
                  .then(response => response.json())
                  .catch(error => {
                     console.log('Error : ' + error);
                     return error;
                  });
            }
         });
      }
   }

   return {
      getKlasemen: function() {
         const endpoint = `${URL}/competitions/${league.id}/standings?standingType=TOTAL`;
         return fetchData(endpoint);
      },
      getClubs: function() {
         const endpoint = `${URL}/competitions/${league.id}/teams`;
         return fetchData(endpoint);
      },
      getClub: function(clubID) {
         const endpoint = `${URL}/teams/${clubID}`;
         return fetchData(endpoint);
      },
      getPertandingan: function() {
         const endpoint = `${URL}/competitions/${league.id}/matches`;
         return fetchData(endpoint);
      }
   }

})();

/* testing api */
// API.getPertandingan();