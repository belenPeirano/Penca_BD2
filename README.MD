# Guía de Ejecución de la Aplicación

Este documento proporciona instrucciones para iniciar y detener la aplicación.

## Requisitos Previos

Asegúrese de tener instalado el siguiente componente:
- [Docker](https://www.docker.com/get-started)

## Archivos Incluidos

- `start_app.bat`: Script para iniciar la base de datos y la aplicación.
- `stop_app.bat`: Script para detener la base de datos y la aplicación.

## Iniciar la Aplicación

Para iniciar la aplicación, siga estos pasos:

1. Ubiquese en la carpeta del proyecto, donde se encuentran los archivos `start_app.bat` y `stop_app.bat`.
2. Haga doble clic en el archivo `start_app.bat`.

   Este script realizará las siguientes acciones:
   - Iniciará la base de datos utilizando `docker-compose.database.yml`.
   - Esperará 90 segundos para que la base de datos se inicialice.
   - Iniciará el backend y el frontend utilizando `docker-compose.app.yml`.

3. Verifique que la aplicación se haya iniciado correctamente en la ruta http://localhost:3000/#/login.

4. Para visualizar los datos en la base de datos, abra el programa MySQL WorkBench y cree una nueva conexión con los datos:
   - Hostname: localhost
   - Port: 3306
   - Username: root
   - Password: root1234

## Detener la Aplicación

Para detener la aplicación, siga estos pasos:

1. Ubiquese en la carpeta del proyecto, donde se encuentran los archivos `start_app.bat` y `stop_app.bat`.
2. Haga doble clic en el archivo `stop_app.bat`.

   Este script realizará las siguientes acciones:
   - Detendrá el backend y el frontend.
   - Detendrá la base de datos.

3. Verifique que todos los servicios se hayan detenido correctamente.
