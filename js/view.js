function renderLoader() {
   const parentLoader = document.querySelector('.loader-wrapper');
   const markup = `
      <div class="loader-page">
         <div class="preloader-wrapper big active is-centered">
            <div class="spinner-layer spinner-customized">
            <div class="circle-clipper left">
               <div class="circle"></div>
            </div><div class="gap-patch">
               <div class="circle"></div>
            </div><div class="circle-clipper right">
               <div class="circle"></div>
            </div>
            </div>
         </div>
      </div>
   `;
   parentLoader.insertAdjacentHTML('beforeend', markup);
}

function clearLoader() {
   const loader = document.querySelector('.loader-page');
   if(loader) {
      loader.parentElement.removeChild(loader);
   }
}

function handleError(parentEl) {
   const markup = `
      <h4 style="text-align: center;">Maaf, ada sesuatu yang error :(</h4>
   `;
   parentEl.insertAdjacentHTML('afterbegin', markup);
}

function handleImgError(image) {
   image.onerror = '';
   image.src = "./img/img_default.png";
   return true;
}

function klasemenDetailList(data) {
   return `
      <tr>
         <td>${data.position}</td>
         <td>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
               <div class="col s3">
                  <img src="${data.team.crestUrl}" width="30" height="30" alt="${data.team.name}" onerror="handleImgError(this)" >
               </div>
               <div class="col s9">
                  <p class="name-club">${data.team.name}</p>
               </div>
            </div>
         </td>
         <td>${data.playedGames}</td>
         <td>${data.won}</td>
         <td>${data.draw}</td>
         <td>${data.lost}</td>
         <td>${data.goalsFor}</td>
         <td>${data.goalsAgainst}</td>
         <td>${data.goalDifference}</td>
         <td>${data.points}</td>
      </tr>
   `;
}

function renderKlasemen(klasemen, parentEl) {
   const { standings } = klasemen;
   const datas = JSON.parse(JSON.stringify(standings).replace(/http:/g, 'https:'));

   let markup = ' ';
   datas.forEach(standing => {
      markup = `
         <h5>${standing.group.replace('_', ' ')}</h5>
         <div class="card mb40">
            <div className="card-content">
               <table class="responsive-table highlight centered klasemen-list">
                  <thead>
                     <tr class="white-text thead-klasemen">
                        <th style="width: 10%;">Position</th>
                        <th>Club Team</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Pts</th>
                     </tr>
                  </thead>
                  <tbody>
                     ${standing.table.map(data => klasemenDetailList(data)).join(' ')}
                  </tbody>
               </table>
            </div>
         </div>
      `;
      parentEl.insertAdjacentHTML('beforeend', markup);
   });
}

function renderClubs(clubs, parentEl) {
   const { teams } = clubs;
   const datas = JSON.parse(JSON.stringify(teams).replace(/http:/g, 'https:'));

   let markup = '';
   datas.forEach(club => {
      markup = `
         <div class="col s12 m3">
            <div class="card card-club-customized">
               <div class="card-image center">
                  <img src="${club.crestUrl}" alt="${club.name}" onerror="handleImgError(this)" class="img-fit-contain" width="100" height="100">
               </div>
               <div class="card-content">
                  <p class="club-name">${club.name}</p>
                  <p class="club-area">(${club.area.name})</p>
               </div>
            </div>
         </div>
      `;
      parentEl.insertAdjacentHTML('beforeend', markup);
   });
}