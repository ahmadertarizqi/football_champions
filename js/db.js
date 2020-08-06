
const initialDB = idb.open('football-champions-db', 1, function(upgradeDB) {
   upgradeDB.createObjectStore("club", { keyPath: 'id' });
});

const insertClub = function(club) {
   console.log(club, 'from db');
   initialDB.then(db => {
      const tx = db.transaction('club', 'readwrite');
      const store = tx.objectStore('club');
      store.put(club);
      return tx.complete;
   }).then(() => {
      M.toast({
         html: `${club.name} berhasil ditambahkan ke Favorit`,
         classes: "toast-bgcolor"
      });
      console.log('Club berhasil di simpan');
   });
}

const getAllClub = function() {
   return initialDB.then(db => {
      const tx = db.transaction('club', 'readonly');
      const store = tx.objectStore('club');
      return store.getAll();
   });
}