[![N|Solid](https://iolwebsite.cdn.prismic.io/iolwebsite/e9bd861f-c52d-415c-9107-fe39a8cb828a_Logo_6.svg)


# API Invertironline
Guia para utilizar la API de [Invertironline](https://api.invertironline.com/) desde Google Apps Scripts.

## Requisitos:
- Para poder hacer uso de las APIs se requiere una Cuenta de Inversión Abierta.
- Loguearse en el sitio e ingresar a la sección de mensajes y enviar uno solicitando la activación de APIs
- Una vez que se nos confirma la activación de la API se debe ingresar a la Sección APIs para aceptar los términos y condiciones del servicio: Mi Cuenta > Personalización > APIs

Mas información y preguntas frecuentes sobre sobre el [servicio](https://www.invertironline.com/api).

## Autentificación

Para poder hacer uso de la API se debe utilizar la clave y contraseña que se utiliza al ingresar al website de IOL.
En el archivo [Login.gs](../master/Login.gs) se utiliza la función onOpen() para que al abrir el documento de Sheets solicite ambos datos y no deba dejar en el código los mismos.
Acorde a la documentación de IOL:

El método de autenticación que se utiliza en esta plataforma son tokens digitales.
 
Los tokens son simples strings que se envían al servidor.
```
POST /token HTTP/1.1 
Host: api.invertironline.com/token
Content-Type: application/x-www-form-urlencoded
username=MIUSUARIO&password=MICONTRASEÑA&grant_type=password
```
Nos va a retornar un archivos JSON con dos tipos de tokens: bearer token y refresh tokens. \
El código puede verlo en el archivo [Token.gs](../master/Token.gs)



## Refresh Token
El bearer token es válido por 15 minutos desde que se lo solicita.
Para renovar este token, se utiliza el refresh token. 
```
POST /token HTTP/1.1 
Host: api.invertironline.com/token
Content-Type: application/x-www-form-urlencoded
username=MIUSUARIO&password=MICONTRASEÑA&grant_type=password
```
Ante de ejecutar una consulta se corrobora que el token esté vigente. [checkToken.gs](../master/checkToken.gs)

## Consultas

El bearer token se debe presentar en cada request para poder acceder al recurso solicitado. \
Aquí puede consultar que recursos brinda a [API](https://api.invertironline.com/). 
En la carpeta de [ejemplos](./master/ejemplos/) encontrara diferentes modelos de consultas que puede realizar.


## Agradecimientos
El repositorio de [fedemoglia](https://github.com/fedemoglia/iol-api) me sirvió de orientación al inicio de presente proyecto.