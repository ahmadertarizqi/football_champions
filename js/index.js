document.addEventListener('DOMContentLoaded', function() {
   const elems = document.querySelectorAll('.sidenav');
   M.Sidenav.init(elems);
   loadNav();

   const tabElem = document.querySelector('.tabs');
   M.Tabs.init(tabElem);

   let hasPage = window.location.hash.substr(1).split('_');
   
   const isPage = hasPage[0] || 'klasemen';
   const idParam = hasPage[1];
   loadPage(isPage, idParam);

   let loadDetailPage;
   if(window.location.href.indexOf('#') > -1) {
      const urlDetail = window.location.href.split('#')[1].split('_');
      loadDetailPage = loadPage(urlDetail[0], parseInt(urlDetail[1]));
   }

   ['hashchange', 'load'].forEach(event => window.addEventListener(event, loadDetailPage));
});


function loadNav() {
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if(this.readyState === 4) {

         if(this.status !== 200) return;

         document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
            elm.innerHTML = xhr.responseText;
         });

         /**
          * EVENT LISTENER ROUTING
          */
         document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm) {
            elm.addEventListener('click', function() {
               const sidenav = document.querySelector('.sidenav');
               M.Sidenav.getInstance(sidenav).close();

               let hasPage = event.target.getAttribute('href').substr(1);
               loadPage(hasPage);
            });
         });
      }
   }

   xhr.open('GET', 'nav.html', true);
   xhr.send();
}

function detailController() {
   document.querySelectorAll('.card-club-customized a').forEach(function(elm) {
      elm.addEventListener('click', function(ev) {
         const isLocation = ev.target.getAttribute('href').substr(1).split('_');
         const hasPage = isLocation[0];
         const clubID = parseInt(isLocation[1]);
         loadPage(hasPage, clubID);
      });
   });
}

function loadPage(hasPage, idParam = null) {
   // console.log(hasPage);
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if(this.readyState === 4) {
         const nodeElement = document.querySelector('#nodeElement');
         
         if(this.status === 200) {
            nodeElement.innerHTML = xhr.responseText;

            switch(hasPage) {
               case 'klasemen':
                  loadKlasemen();
                  break;  
               case 'clubs':
                  loadClubs();
                  break;
               case 'clubdetail':
                  loadClubDetail(idParam);
                  break;
               case 'pertandingan':
                  loadPertandingan();
                  break;
               case 'favorites':
                  loadFavorites();
                  break;
            }
         } else if (this.status === 400) {
            nodeElement.innerHTML = `<p>Halaman tidak ditemukan</p>`;
         } else {
            nodeElement.innerHTML = `<p>Oops...halaman tidak dapat di akses bro</p>`;
         }
      }
   }

   xhr.open('GET', `pages/${hasPage}.html`, true);
   xhr.send();
}

function loadKlasemen() {
   renderLoader();
   const parentEl = document.querySelector('.klasemen-wrapper');
   API.getKlasemen().then(result => {
      clearLoader();
      renderKlasemen(result, parentEl);
   }).catch(error => {
      console.log('load Klasemen gagal', error);
      handleError(parentEl);
   });
}

function loadClubs() {
   renderLoader();
   const parentEl = document.querySelector('.klasemen-wrapper');
   API.getClubs().then(result => {
      clearLoader();
      renderClubs(result, parentEl);
      detailController();
   }).catch(error => {
      console.log('load Clubs gagal', error);
      handleError(parentEl);
   });
}

function loadClubDetail(clubID) {
   renderLoader();
   const parentEl = document.querySelector('.clubdetail-wrapper');
   
   API.getClub(clubID).then(result => {
      clearLoader();
      
      DB.getClub(clubID).then(resultDB => {
         const isFromSaved = resultDB;
         if(isFromSaved) {
            renderClubDetail(resultDB, parentEl, isFromSaved);
            toggleSaveButton(isFromSaved, resultDB);
         } else {
            renderClubDetail(result, parentEl, isFromSaved);
            toggleSaveButton(isFromSaved, result);
         }
      }).catch(error => {
         console.log('load Club Detail dari Saved gagal', error);
         handleError(parentEl);
      });

   }).catch(error => {
      console.log('load Club Detail gagal', error);
      handleError(parentEl);
   });
}

function toggleSaveButton(state, club) {
   const btnFavorit = document.querySelector('.btn-is-handler');
   btnFavorit.addEventListener('click', (ev) => {
      if(state) {
         DB.deleteClub(club.id);
         M.toast({
            html: `${club.name} Berhasil di hapus`,
            classes: "toast-bgcolor-destroy",
            inDuration: 2000
         });
      } else {
         DB.insertClub(club);
         M.toast({
            html: `${club.name} Berhasil ditambahkan ke Favorit`,
            classes: "toast-bgcolor-success",
            inDuration: 2000
         });
      }
   });
}

function loadClubDetailPage() {
   const url = window.location.href.split('#')[1].split('_');
   loadPage(url[0], parseInt(url[1]));
}

function loadPertandingan() {
   renderLoader();
   const parentEl = document.querySelector('.render-pertandingan');
   API.getPertandingan().then(result => {
      clearLoader();
      renderPertandingan(result, parentEl);
   }).catch(error => {
      console.log('load Pertandingan gagal', error);
      handleError(parentEl);
   });
}

function loadFavorites() {
   renderLoader();
   const parentEl = document.querySelector('.favorites-wrapper');
   DB.getAllClub().then(result => {
      clearLoader();
      renderFavorites(result, parentEl);
      detailController();
   }).catch(error => {
      console.log('load Pertandingan gagal', error);
      handleError(parentEl);
   });
}