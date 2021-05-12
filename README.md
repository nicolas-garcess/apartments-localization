# Búsqueda de apartamentos mediante aplicativo web

La propuesta consiste en el desarrollo de un aplicativo web que permita la búsqueda de apartamentos por precio/habitaciones y ubicación. Además, con carga de datos a base de datos en MongoDB desde un CSV y generación de reportes en PDF y CSV.

### 1. Importación de datos
El objetivo principal es crear una función en Node, en la cual se indique la ruta del archivo y esta sea capaz de leer el (.csv) e insertar los valores en una base de datos Mongo.

### 2. Filtrar datos
Un endpoint método GET el cual permita pasar atributos para poder consultar en la base de datos por: rango de precio mínimo y máximo, y número de habitaciones.

### 3. Procesar datos
Función en la cual se pasen 3 atributos (Latitud, Longitud, radio de búsqueda en km), y esta retorne los apartamentos dentro del radio y el precio promedio del metro cuadrado.

### 4. Reportar datos
Endpoint al cual se pasen los atributos de filtro, coordenadas y tipo de reporte (PDF, CSV) y dicho reporte generado se guarde en una carpeta.

### 5. Visualización de búsqueda
Renderizar las vistas que permitan mostrar los datos consultados en los puntos 1 y 2.

### 6. Despliegue en heroku
Por último, desplegar el aplicativo en servidor remoto de heroku. [Aplicación](http://app-apartments.herokuapp.com/)
