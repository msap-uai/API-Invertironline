var cache = CacheService.getUserCache();
/**
* Obtiene informacion de las operaciones realizadas en la cuenta IOL
* @param {mercado} bCBA, nYSE, nASDAQ, aMEX, bCS, rOFX
* @param {especie} ej. GGAL, TECO2, GOGLD, etc
* @customfunction
**/
function IOLtitulo(mercado,especie) {
  checkToken();
  const url = 'https://api.invertironline.com/api/v2/'+mercado+'/Titulos/'+especie;
  const headers = {'Authorization': 'Bearer ' + cache.get("bearer_token")};
  const options = {
    'headers': headers,
  }
  const response = UrlFetchApp.fetch(url, options);
  console.log(JSON.parse(response.getContentText()));
}