
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
         classes: "toast-bgcolor-success"
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

const getClub = function(clubID) {
   // console.log(clubID, 'id club');
   return initialDB.then(db => {
      const tx = db.transaction('club', 'readonly');
      const store = tx.objectStore('club');
      return store.get(clubID);
   });
}

const deleteClub = function(clubID) {
   initialDB.then(db => {
      const tx = db.transaction('club', 'readwrite');
      const store = tx.objectStore('club');
      store.delete(clubID);
      return tx.complete;
   });
}