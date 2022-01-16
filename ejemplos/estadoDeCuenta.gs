var cache = CacheService.getUserCache();

/**
* Obtiene el estado de cuenta de IOL
* @customfunction
**/
funcfunction IOLestadoCuenta() {
  const url = 'https://api.invertironline.com/api/v2/estadocuenta'
  const headers = {'Authorization': 'Bearer ' + cache.get("bearer_token")};
  const options = {
    'headers': headers,
  }
  const response = UrlFetchApp.fetch(url, options)
  console.log(JSON.parse(response.getContentText()));
}