var cache = CacheService.getUserCache();

/**
* Obtiene informacion del titular de la cuenta IOL
* @customfunction
**/
function IOLtitular() {
  var cache = CacheService.getUserCache();
  checkToken();
  const url = 'https://api.invertironline.com/api/v2/datos-perfil';
  const headers = {'Authorization': 'Bearer ' + cache.get("bearer_token")};
  const options = {
    'headers': headers,
  }
  const response = UrlFetchApp.fetch(url, options);
  console.log(JSON.parse(response.getContentText()));
  
}