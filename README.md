# Pingerdata

## Descripción
   Pingerdata es una herramienta diseñada para gestionar la documentación en proyectos de bases de datos. Está enfocada en facilitar la creación de una documentación completa y detallada, dirigida principalmente a equipos de arquitectura y administradores de bases de datos (DBAs).

   La herramienta permite centralizar y organizar la información crítica del proyecto, asegurando que todos los aspectos necesarios, desde modelos de datos hasta políticas de administración y optimización, estén documentados de manera clara y accesible.

# Funcionalidades
## Sincronización de Información

1. **Registro sin necesidad de datos personales:** Crea una cuenta sin necesidad de proporcionar información personal.

2. **Guarda y comparte tu trabajo:** Facilita la colaboración al permitirte guardar y compartir tu trabajo con otros usuarios.

3. **Gestión de versiones de tus scripts:** Mantén un registro organizado y accesible de las diferentes versiones de tus scripts para un seguimiento y control efectivos.


### Administración de Bases de Datos

1. **Manual de Procedimientos y Políticas de Administración de la Base de Datos**
   - Procedimientos de respaldo y recuperación
   - Estrategias de mantenimiento y monitoreo
   - Políticas de seguridad y acceso

2. **Especificaciones de Transacciones y Concurrencia**
   - Descripción de las transacciones críticas y cómo se manejan
   - Estrategias de manejo de la concurrencia y bloqueo

3. **Plan de Implementación y Migración**
   - Detalle del plan de implementación de la base de datos
   - Estrategias para la migración de datos desde sistemas anteriores

4. **Scripts de Pruebas y Validación**
   - Conjunto de scripts y procedimientos para pruebas unitarias, de integración y de rendimiento
   - Documentación de los resultados de las pruebas y las acciones correctivas tomadas

5. **Guías de Rendimiento y Optimización**
   - Estrategias para optimización de consultas y rendimiento general de la base de datos
   - Documentación de índices, particiones y otros aspectos de optimización

6. **Documentación de Procedimientos Almacenados y Funciones**
   - Detalle de los procedimientos almacenados, funciones y triggers
   - Explicaciones de su propósito, uso y funcionamiento

7. **Diagramas de Arquitectura General del Sistema**
   - Diagramas que muestra cómo la base de datos interactúa con otros componentes del sistema

## Integración con un circuito de integración continua (CI)

- **Gestión de Versiones de Scripts:**
  
  - **Descripción:** Mantener un registro organizado y accesible de las diferentes versiones de scripts.
  
  - **Valor para CI/CD:** Permite automatizar la verificación de cambios en los scripts mediante pruebas automatizadas para validar que las nuevas versiones funcionen según lo esperado antes de su despliegue.

## Instalación
1. Clona este repositorio:
   ```sh
   git clone https://github.com/osvalois/pingerdata
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
