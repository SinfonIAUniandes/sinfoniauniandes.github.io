# 🎮 Remote controller

Para empezar, algo que todos los miembros de SinfonIA debemos pasar en algún momento es la participación en eventos. Esta experiencia te ayuda a especializarte en varias habilidades para tu respuesta y manejo con el robot, asi como fortalecer tus habilidades blandas. Es importante que conozcas el funcionamiento del robot cuando estamos en eventos. 

Aquí te revelamos un dato curioso sobre SinfonIA, aunque quizás no sea tan secreto como intentamos que sea ;) Cuando participes en algún evento, es muy probable que las personas quieran interactuar con Opera o Nova. Desarrollar tareas específicas para un evento puede ser un proceso meticuloso y delicado, ya que cualquier error podría tener consecuencias importantes. Por eso, muchas veces la opción más sencilla y segura es utilizar un control remoto desarrollado por el equipo de SinfonIA. Este control remoto tiene funcionalidades básicas, pero muy relevantes para interactuar con el público, especialmente si no saben que el robot no está operando de manera autónoma en ese momento. Entre las capacidades del control remoto se incluyen: ver a través de las cámaras del robot en tiempo real, enviarle texto para que lo pronuncie al instante, enviarle guiones de texto y animaciones para presentaciones, moverlo a control remoto, realizar animaciones estándar, y más.

## Instalación

[Repositorio](https://github.com/SinfonIAUniandes/remote_controller)

En el repositorio adjunto encontrarás el código del remote_controller, incluyendo el nodo de esta herramienta. Dado que se trata de un paquete, tienes la opción de agregarlo a cualquier workspace existente o crear uno nuevo. Es importante destacar que este paquete requiere los 'robot_toolkit_msgs'. A continuación, te guiaremos paso a paso sobre cómo instalar y utilizar este control remoto haciendo enfasis en el metodo de un workspace único para el remote controller.

### Crear el Workspace

```bash
mkdir -p remote_controller_ws/src
cd remote_controller_ws
```

### Clonar los Repositorios

El segundo paso implica clonar los repositorios necesarios. En este caso, necesitas dos: el que contiene los mensajes del robot y el que contiene el nodo con el remote controller. Para este paso, debes ubicarte en la carpeta 'src' y luego ejecutar los comandos para clonar con git.

```bash
cd src
git clone https://github.com/SinfonIAUniandes/robot_toolkit_msgs.git
git clone https://github.com/SinfonIAUniandes/remote_controller.git
```

### Construir el workspace
El tercer y último paso consiste en construir el Workspace utilizando un comando de catkin. Tendrás que esperar un poco mientras catkin realiza sus funciones. No olvides verificar después que todo haya salido bien, cargando el script.

Recuerda que debes posicionarte en tu carpeta base, es decir, '/remote_controller_ws. Como en el paso anterior estábamos dentro de 'src', puedes regresar utilizando el siguiente comando.
```bash
cd ..
```
¡Ya puedes construir tu Workspace! Si lo deseas, puedes ir a tomar un café mientras se prepara.
```bash
catkin_make
```
Recuerda siempre ejecutar el siguiente comando cada vez que ingreses a tu nuevo Workspace.
```bash
. devel/setup.bash
```

### Instrucciones de uso
Ya que tienes disponible el remote controller lo unico que necesitas es lanzar el nodo lo que contiene! Hazlo de la siguiente manera.
```bash
rosrun remote_controller remote_controller
```

### Creación y utilización de scripts
En la mayoría de eventos, el elemento principal es el uso de scripts para que el robot pueda comunicar lo que queramos que diga. Estos scripts se almacenan dentro de la carpeta 'resources' dentro del espacio de trabajo. La estructura de almacenamiento es la siguiente:
```bash
<config>
language=Spanish
</config>

nombre_texto, animación_opcional , "texto entre comillas"
nombre_texto1, animación_opcional2 , "texto entre comillas2"
```
Luego de ser almacenado en resources, en la pestaña central del remote controller se puede hacer uso de cada uno de los textos por su nombre. 
