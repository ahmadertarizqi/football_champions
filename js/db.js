
const DB = (function() {
   const initialDB = idb.open('football-champions-db', 1, function(upgradeDB) {
      upgradeDB.createObjectStore("club", { keyPath: 'id' });
   });

   const insertDB = function(data, objName) {
      initialDB.then(db => {
         const tx = db.transaction(objName, 'readwrite');
         const store = tx.objectStore(objName);
         store.put(data);
         return tx.complete;
      });
   }

   const getAllDB = function(objName) {
      return initialDB.then(db => {
         const tx = db.transaction(objName, 'readonly');
         const store = tx.objectStore(objName);
         return store.getAll();
      });
   }

   const getDB = function(dataID, objName) {
      return initialDB.then(db => {
         const tx = db.transaction(objName, 'readonly');
         const store = tx.objectStore(objName);
         return store.get(dataID);
      });
   }

   const deleteDB = function(dataID, objName) {
      initialDB.then(db => {
         const tx = db.transaction(objName, 'readwrite');
         const store = tx.objectStore(objName);
         store.delete(dataID);
         return tx.complete;
      });
   }

   return {
      insertClub: function(club) {
         return insertDB(club, 'club');
      },
      getAllClub: function() {
         return getAllDB('club');
      },
      getClub: function(clubID) {
         return getDB(clubID, 'club');
      },
      deleteClub: function(clubID) {
         return deleteDB(clubID, 'club');
      }
   }

})();