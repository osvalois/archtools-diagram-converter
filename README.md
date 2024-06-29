# Pingerdata

## Descripción
   Pingerdata es una herramienta diseñada para gestionar la documentación en proyectos de bases de datos. Está enfocada en facilitar la creación de una documentación completa y detallada, dirigida principalmente a equipos de arquitectura y administradores de bases de datos (DBAs).

   La herramienta permite centralizar y organizar la información crítica del proyecto, asegurando que todos los aspectos necesarios, desde modelos de datos hasta políticas de administración y optimización, estén documentados de manera clara y accesible.

# Funcionalidades

## Sincronización de Información
1. **Registro sin necesidad de datos personales:** Crea una cuenta sin necesidad de proporcionar información personal.

2. **Guarda y comparte tu trabajo:** Facilita la colaboración al permitirte guardar y compartir tu trabajo con otros usuarios.

3. **Gestión de versiones de tus scripts:** Mantén un registro organizado y accesible de las diferentes versiones de tus scripts para un seguimiento y control efectivos.

## Descripción del Modelo de Datos

- **Explicación de las entidades y sus atributos:**
  Detalle de las entidades principales del sistema y sus atributos específicos.
  
- **Descripción de las relaciones entre entidades:**
  Explicación de cómo las entidades están relacionadas entre sí (uno a uno, uno a muchos, muchos a muchos).
  
- **Justificación de las decisiones de diseño tomadas:**
  Razones detrás de las decisiones de diseño del modelo de datos, alineadas con los requisitos del negocio.

## Dictionaries de Datos

- **Detalle de cada tabla con sus columnas, tipos de datos, y descripciones:**
  Información detallada de cada tabla en la base de datos, incluyendo nombres de columnas, tipos de datos y descripciones breves.
  
- **Definiciones de claves primarias y foráneas:**
  Especificación de las claves primarias y foráneas utilizadas en las tablas para mantener la integridad referencial.
  
- **Índices y restricciones aplicadas:**
  Documentación de índices creados y restricciones aplicadas para garantizar la consistencia de los datos.

## Diagramas de Flujo de Datos (DFD)

- **Diagramas que muestren cómo los datos se mueven a través del sistema:**
  Representaciones gráficas que ilustran el flujo de datos desde la entrada hasta la salida en el sistema.
  
- **Interacciones entre distintos componentes del sistema:**
  Visualización de cómo los diferentes componentes del sistema interactúan entre sí para procesar datos.

## Modelos Lógicos y Físicos

- **Modelo lógico:**
  Descripción detallada de la estructura lógica de la base de datos, sin considerar aspectos físicos de implementación.
  
- **Modelo físico:**
  Implementación específica del modelo lógico en una base de datos particular, incluyendo detalles sobre almacenamiento y rendimiento.

## Esquemas de Normalización

- **Justificación y documentación del proceso de normalización:**
  Razonamiento detrás del proceso de normalización aplicado a la base de datos.
  
- **Explicación de las formas normales alcanzadas y las razones para desnormalizar en su caso:**
  Documentación de las formas normales alcanzadas y las decisiones de desnormalización basadas en requisitos específicos.

## Manual de Procedimientos y Políticas de Administración de la Base de Datos

- **Procedimientos de respaldo y recuperación:**
  Detalle de los procedimientos para respaldar y recuperar datos críticos.
  
- **Estrategias de mantenimiento y monitoreo:**
  Políticas y estrategias para mantener y monitorear el rendimiento y la salud de la base de datos.
  
- **Políticas de seguridad y acceso:**
  Directrices y restricciones para garantizar la seguridad y el acceso adecuado a los datos sensibles.

## Especificaciones de Transacciones y Concurrencia

- **Descripción de las transacciones críticas y cómo se manejan:**
  Manejo y documentación de transacciones importantes para asegurar la consistencia de los datos.
  
- **Estrategias de manejo de la concurrencia y bloqueo:**
  Métodos utilizados para gestionar la concurrencia y evitar conflictos en el acceso a los datos.

## Plan de Implementación y Migración

- **Detalle del plan de implementación de la base de datos:**
  Pasos específicos y cronograma para implementar la base de datos en un entorno de producción.
  
- **Estrategias para la migración de datos desde sistemas anteriores:**
  Métodos y consideraciones para migrar datos de sistemas existentes a la nueva base de datos.

## Scripts de Pruebas y Validación

- **Conjunto de scripts y procedimientos para pruebas unitarias, de integración y de rendimiento:**
  Herramientas y métodos para validar y verificar el funcionamiento correcto de la base de datos.
  
- **Documentación de los resultados de las pruebas y las acciones correctivas tomadas:**
  Registro de resultados de pruebas realizadas y medidas correctivas implementadas en caso de problemas detectados.

## Mapeo de Requisitos Funcionales a Componentes de la Base de Datos

- **Documento que mapee los requisitos del negocio a tablas y columnas específicas en la base de datos:**
  Asignación detallada de cada requisito funcional del negocio a elementos específicos dentro de la base de datos.

## Documentación de Procedimientos Almacenados y Funciones

- **Detalle de los procedimientos almacenados, funciones y triggers:**
  Explicación del propósito, uso y funcionamiento de procedimientos almacenados, funciones y triggers dentro de la base de datos.

## Diagrama de Arquitectura General del Sistema

- **Un diagrama que muestre cómo la base de datos interactúa con otros componentes del sistema:**
  Representación visual de la arquitectura general del sistema, incluyendo interacciones entre la base de datos, aplicaciones front-end, middlewares y otros servicios.

## Guías de Rendimiento y Optimización

- **Estrategias para optimización de consultas y rendimiento general de la base de datos:**
  Recomendaciones y técnicas para mejorar el rendimiento de consultas y operaciones en la base de datos.
  
- **Documentación de índices, particiones y otros aspectos de optimización:**
  Detalle de índices creados, configuraciones de particiones y otras prácticas de optimización implementadas para mejorar el rendimiento global de la base de datos.

## Instalación
1. Clona este repositorio:
   ```sh
   git clone <URL_del_repositorio>
2. Instala las dependencias de Ruby:
   ```sh
   bundle install

## Uso
1. Ejecuta la aplicación::
   ```sh
   make run
2. Accede a través de tu navegador web a http://localhost:4567.

## Configuración

La aplicación utiliza:
1. Sinatra.

## Contribuciones

Si deseas contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva característica'`).
4. Sube los cambios a tu repositorio (`git push origin feature/nueva-caracteristica`).
5. Haz un pull request en GitHub.
