var cache = CacheService.getUserCache();
/**
* Obtiene informacion de las operaciones realizadas en la cuenta IOL
* @customfunction
**/
function IOLoperaciones() {
  checkToken();
  const url = 'https://api.invertironline.com/api/v2/operaciones';
  const headers = {'Authorization': 'Bearer ' + cache.get("bearer_token")};
  const options = {
    'headers': headers,
  }
  const response = UrlFetchApp.fetch(url, options);
  console.log(JSON.parse(response.getContentText()));
}