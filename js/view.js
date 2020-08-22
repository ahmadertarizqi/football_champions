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
                  <a class="club-name" href="#clubdetail_${club.id}">${club.name}</a>
                  <p class="club-area">(${club.area.name})</p>
               </div>
            </div>
         </div>
      `;
      parentEl.insertAdjacentHTML('beforeend', markup);
   });
}

function renderSquadClub(squad) {
   return `
      <div class="col s12 m4">
         <div class="squad-player">
            <div class="position">${squad.position === null ? squad.role.replace('_', ' ') : squad.position}</div>
            <div class="info">
               <div class="shirt-number">${squad.shirtNumber === null ? '--' : squad.shirtNumber}</div>
               <div class="info-player">
                  <span class="name">${squad.name}</span>
                  <span class="region">${squad.nationality}</span>
               </div>
            </div>
         </div>
      </div>
   `;
}

function renderClubDetail(club, parentEl, state) {
   const data = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));
   const markup = `
      <h5 class="center-align mb25" style="margin-top: 0;">Club Team Detail</h5>
      <div class="card">
         <div class="card-content club-detail">
            <div class="head-content">
               <figure class="center-align" style="margin: 0;">
                  <img src="${data.crestUrl}" class="responsive-img logo-football-detail" alt="${data.name}" onerror="handleImgError(this)">
               </figure>
               <h5 class="white-text title-club">${data.name}</h5>
               <a class="waves-effect waves-light btn-small btn-is-handler btn-favorit${state ? '--delete' : '--add'}">
                  ${state ? '<i class="material-icons left">delete</i> Hapus dari daftar Favorit' : '<i class="material-icons left">star</i> Tambah ke Favorit' }
               </a>
            </div>
            <div class="body-content">
               <table>
                  <tbody>
                     <tr>
                        <th>Nama Club</th>
                        <td>${data.name}</td>
                     </tr>
                     <tr>
                        <th>Tim League</th>
                        <td>${data.area.name}</td>
                     </tr>
                     <tr>
                        <th>Didirikan</th>
                        <td>${data.founded}</td>
                     </tr>
                     <tr>
                        <th>Alamat</th>
                        <td>${data.address}</td>
                     </tr>
                     <tr>
                        <th>Lokasi Arena</th>
                        <td>${data.venue}</td>
                     </tr>
                     <tr>
                        <th>Kontak</th>
                        <td>${data.phone}</td>
                     </tr>
                     <tr>
                        <th>Email</th>
                        <td>${data.email}</td>
                     </tr>
                     <tr>
                        <th>Situs Web</th>
                        <td><a href="${data.website}" target="_blank">${data.website}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="squad-content">
               <h5 class="mb15" style="font-weight: 500;">#Squad</h5>
               <div class="row" style="margin-left: -0.75rem;margin-right: -0.75rem;">
                  ${data.squad.map(data => renderSquadClub(data)).join(' ')}
               </div>
            </div>
         </div>
      </div>
   `;
   parentEl.insertAdjacentHTML('beforeend', markup);
}

// function controlTabs(group) {
//    let markup = '';

//    for(const key in group) {
//       if(group.hasOwnProperty(key)) {
//          let isKey;
//          if(key.includes('Group')) isKey = key;
         
//          if(isKey !== undefined) {
//             console.log(group.sort(dynamicSort(key)));
//             markup += `<li class="tab"><a class="active" href="#${isKey.toLowerCase().replace(' ','-')}">${isKey}</a></li>`;
//          }
//       }
//    }
//    return markup;
// }


function renderPertandingan(pertandingan, parentEl) {
   const groupByPertandingan = groupBy(pertandingan.matches, 'group');
   
   const groupOrdered = {};
   Object.keys(groupByPertandingan).sort().forEach((key) => {
      groupOrdered[key] = groupByPertandingan[key];
   });
   
   let markup = '';
   for (const key in groupOrdered) {
      if (groupOrdered.hasOwnProperty(key)) {
         // console.log(groupOrdered[key]);
         let pertandingan;
         if(key.includes('Group')) {
            pertandingan = groupOrdered[key];
            // console.log(pertandingan, 'by group');
         }

         if(pertandingan !== undefined) {
            markup += `<div class="grup-pertandingan mb40"><h5>Pertandingan ${key}</h5>`;
            pertandingan.forEach(data => {
               markup += `
                  <div class="card card-pertandingan">
                     <div class="card-content">
                        <div class="row row-flex mb0">
                           <div class="col s12 m5 home-team">
                              ${data.homeTeam.name}
                              <div><small><em>${data.score.winner === "HOME_TEAM" ? '*Winner' : ''}</em></small></div>
                           </div>
                           <div class="col s12 m2">
                              <div class="info-score">
                                 <span class="date">${dayjs(data.lastUpdated).format('DD-MMM-YYYY')}</span>
                                 <span class="score">${data.score.fullTime.homeTeam} - ${data.score.fullTime.awayTeam}</span>
                                 <span class="time">Full Time</span>
                              </div>
                           </div>
                           <div class="col s12 m5 away-team">
                              ${data.awayTeam.name}
                              <div><small><em>${data.score.winner === "AWAY_TEAM" ? '*Winner' : ''}</em></small></div>
                           </div>
                        </div>
                     </div>
                  </div>
               `;
            });
            markup += `</div>`
         }
      }
      parentEl.innerHTML = markup;
   }
}

function renderFavorites(clubs, parentEl) {
   // console.log(clubs);
   let markup = '';
   if(clubs.length > 0) {
      clubs.forEach(data => {
         const club = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
         markup = `
            <div class="col s12 m3">
               <div class="card card-club-customized">
                  <div class="card-image center">
                     <img src="${club.crestUrl}" alt="${club.name}" onerror="handleImgError(this)" class="img-fit-contain" width="100" height="100">
                  </div>
                  <div class="card-content">
                     <a class="club-name" href="#clubdetail_${club.id}?saved=true">${club.name}</a>
                     <p class="club-area">(${club.area.name})</p>
                  </div>
               </div>
            </div>
         `;
         parentEl.insertAdjacentHTML('beforeend', markup);
      });
   } else {
      markup = `
         <div class="col s12">
            <h4 class="center-align">Anda tidak memiliki Tim Club Favorit</h4>
         </div>
      `;
      parentEl.insertAdjacentHTML('beforeend', markup);
   }
}