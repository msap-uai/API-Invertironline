var cache = CacheService.getUserCache();

/**SOLICITA LA CLAVE PARA QUE NO QUEDE EN EL CODIGO*/
function onOpen(){
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('LOGIN', 'Ingrese el usuario?', ui.ButtonSet.YES_NO);
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.YES) {
    var user = response.getResponseText();
    //Logger.log(user);
    var response = ui.prompt('LOGIN', 'Ingrese su contraseña?', ui.ButtonSet.YES_NO);
    var pass = response.getResponseText();
    //Logger.log(pass);
    token(user,pass);
    ui.showModalDialog(html, 'Se ha logeado con exito');
  } else {
    ui.alert('No se ha tramitado el token. Vuelva a cargar la pagina para intertarlo');
  }
}

/**
* Genera el token incial
* @param {user} email con que se ingresa a IOL
* @param {pass} clave de acceso con que se ingresa a IOL
* @customfunction
**/
function token(user,pass) {
  /** hacer un cuadro de dialogo para poner el pass y user */
  const urlLogin = 'https://api.invertironline.com/token'
  const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  const payload = 'username='+user+'&password='+pass+'&grant_type=password';
  const options = {
    'headers': headers,
    'method': 'post',
    'payload': payload
  }
  const response = UrlFetchApp.fetch(urlLogin, options)

  // guardamos los datos para poder usarlos luego
  cache.put("bearer_token", JSON.parse(response.getContentText()).access_token,3600);
  cache.put("refresh_token",JSON.parse(response.getContentText()).refresh_token,3600);
  var date = new Date();
  cache.put("expires",Math.floor(date.getTime()/1000)+JSON.parse(response.getContentText()).expires_in,3600);  
}

/**
* Muestra los tokens Bearer y Refresh
* @customfunction
**/
function IOLtoken(){
  console.log(cache.get("bearer_token"));
  console.log(cache.get("refresh_token"));
  //console.log(cache.get("expires"));
}


/**
 * Corrobora si el token esta vigente
 */
function checkToken(){
  var date = new Date();//momento actual
  date = Math.floor(date.getTime()/1000);// en unix time

  // recuperamos el valor de vecimiento del token
  var expires = cache.get("expires");
  if (token == null){
    onOpen(); // si ya no esta el token vigente vuelve a pedir el login
  }
  else if( date > expires ){
    refresh_token(); // si el token venció lo renueva
  }
    
}


/**
 * Renovacion del bearea token expirado
 */
function refresh_token() {
  var cache = CacheService.getUserCache();
  const urlLogin = 'https://api.invertironline.com/token'

  const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  const payload = 'refresh_token='+cache.get("refresh_token")+'&grant_type=refresh_token';

  const options = {
    'headers': headers,
    'method': 'post',
    'payload': payload
  }
  const response = UrlFetchApp.fetch(urlLogin, options)
  var cache = CacheService.getUserCache();
  cache.put("bearer_token", JSON.parse(response.getContentText()).access_token,3600);
  cache.put("refresh_token",JSON.parse(response.getContentText()).refresh_token,3600);
  var date = new Date();
  cache.put("expires",Math.floor(date.getTime()/1000)+JSON.parse(response.getContentText()).expires_in,3600);
}

