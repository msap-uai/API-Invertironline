var cache = CacheService.getUserCache();
/**
* Obtiene informacion sobre la cuenta IOL
* @param {pais} seleccionar estados_unidos o argentina
* @customfunction
**/
function IOLporfolio(pais) {
  checkToken()
  const url = 'https://api.invertironline.com/api/v2/portafolio/'+pais;
  const headers = {'Authorization': 'Bearer ' + cache.get("bearer_token")};
  const options = {
    'headers': headers,
  }
  const response = UrlFetchApp.fetch(url, options);
  console.log(JSON.parse(response.getContentText()));
}