# 🤖 Conexión con el Robot  

Antes de empezar a trabajar con el robot, es esencial configurar su herramienta de gestión. Para esto, necesitarás acceder al robot desde tu terminal estableciendo una conexión segura y cifrada mediante **SSH (Secure Shell)**.  

El usuario para el acceso es `nao`, y puedes conectarte utilizando la dirección IP del robot que configuraste en tu `.bashrc`, como lo vimos en la sección 🌐 **Recursos básicos**.  

Ejecuta el siguiente comando en tu terminal:  

```bash
ssh nao@$PEPPER_IP
```  

Después de esto, se te pedirá una contraseña. **La contraseña es `0_0`**.  

Si todo está correcto, ahora estarás dentro del robot (`nao@pepper`).  

## 🔹 Accediendo al entorno de Gentoo  

El robot Pepper utiliza **Gentoo**, una distribución de Linux conocida por su flexibilidad y personalización. Para acceder a su entorno, ejecuta el siguiente comando:  

```bash
./gentoo/startprefix
```  

💡 **Si al entrar terminas en el directorio `/tmp`, usa este comando para salir y posicionarte en la base:**  

```bash
cd
```  

Una vez en la base, ejecuta el siguiente comando para iniciar ROS:  

```bash
. startRos.sh
```  

---

# 🛠️ Toolkit  

📌 **Solo una persona debe activar el Toolkit**.  

Si alguien ya está trabajando con el robot, **pregunta si el Toolkit está en funcionamiento**. Si la respuesta es negativa, entonces puedes iniciarlo tú mismo.  

⚡ **¿Por qué?**  
Cuando el Toolkit está activo en una máquina, cualquier otro computador en la misma red puede usar ROS sin necesidad de una nueva conexión.  

El **Toolkit** es esencial para gestionar el código de los diferentes subsistemas del robot.  

### 🌐 **Toolkit WLAN**  

Si estás utilizando el robot de manera inalámbrica, ejecuta:  

```bash
. start_robot_toolkit_wlan.sh
```  

### 🔌 **Toolkit Ethernet**  

Si prefieres una conexión más estable con **cable Ethernet**, usa:  

```bash
. start_robot_toolkit_eth.sh
```  

---

# 🐍 PyToolkit  

🔗 [Repositorio de PyToolkit](https://github.com/SinfonIAUniandes/py_toolkit)  

📌 **Al igual que el Toolkit, solo una persona debe activar el PyToolkit**.  

Si alguien ya está trabajando con el robot, **pregunta si el PyToolkit está en funcionamiento**.  

💡 **TIP:** Si en la pantalla del robot ves el **logo y nombre de la Universidad de Los Andes**, significa que el **PyToolkit está activo**.  

Para iniciar el PyToolkit, ejecuta:  

```bash
. start_py_toolkit.sh
``` 

⚠️ **No te preocupes si el robot se agacha y vuelve a subir, es completamente normal.**  

---

# 🎮 Control Remoto del Robot  

¡Todo está listo! Ahora que tienes todo configurado, aprenderás a controlar el robot en un evento con el **Remote Controller**.  

🔗 **[Guía de Remote Controller](./🎮-Remote-Controller)**  

En esta guía, encontrarás las bases para realizar **actividades interactivas y divertidas** con Pepper. 🚀  

---

# 🧠 ROS dentro del robot sin sudo (Gentoo Prefix)

Gracias a la herramienta de **Gentoo Prefix** desarrollada por SoftBank Robotics Research, es posible correr **ROS Kinetic** directamente dentro del robot Pepper, **sin necesidad de permisos de administrador (sudo)**.

🔗 [Repositorio oficial (kinetic_32b)](https://github.com/softbankrobotics-research/sbre_robot_ros_gentoo_prefix/tree/master/kinetic_32b)

---

## ⚙️ Preparando el entorno (desde tu PC)

Antes de comenzar, necesitas tener instalado **Docker** en tu computador. Una vez instalado, clona el repositorio y ejecuta:

```bash
docker build --network host -f Dockerfile -t sbre_robot_ros_kinetic_32b_gentoo_prefix .
```

Esto creará una imagen de Docker con **ROS Kinetic** y el entorno **Gentoo Prefix** configurado.

---

## 📦 Enviando el entorno al robot

Ejecuta la imagen de Docker:

```bash
docker run -it sbre_robot_ros_kinetic_32b_gentoo_prefix
```

Luego, copia el archivo comprimido al robot:

```bash
scp sbre_robot_ros_kinetic_32b_gentoo_prefix.tar.gz nao@$PEPPER_IP:.
```

Conéctate al robot:

```bash
ssh nao@$PEPPER_IP
```

Descomprime el archivo:

```bash
tar xzf sbre_robot_ros_kinetic_32b_gentoo_prefix.tar.gz
```

💡 *Puedes borrar el `.tar.gz` después de descomprimirlo para ahorrar espacio.*

---

## 🧪 Usando Gentoo Prefix y ROS

### ➤ Iniciar Gentoo Prefix

Desde el robot:

```bash
./gentoo/startprefix
```

### ➤ Activar ROS

Dentro del entorno prefix:

```bash
source /tmp/gentoo/opt/ros/kinetic/setup.bash
export CATKIN_PREFIX_PATH=/tmp/gentoo/opt/ros/kinetic
export ROS_IP=$PEPPER_IP
```

Ahora puedes usar comandos como `roscore`, `catkin_make`, etc.

---

