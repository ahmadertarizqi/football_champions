document.addEventListener('DOMContentLoaded', function() {
   const elems = document.querySelectorAll('.sidenav');
   M.Sidenav.init(elems);
   loadNav();

   let hasPage = window.location.hash.substr(1);
   if(hasPage === '') {
      hasPage = 'klasemen';
   }

   loadPage(hasPage);
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

function loadPage(hasPage) {
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
               // case 'favorites':
               //    loadFavorites();
               //    break;
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
   }).catch(error => {
      console.log('load Clubs gagal', error);
      handleError(parentEl);
   })
}