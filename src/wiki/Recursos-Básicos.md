# Recursos Básicos

## Introducción

---

En este apartado, te guiaremos en la instalación de las herramientas necesarias para preparar y configurar tu espacio de trabajo. Comenzaremos con el sistema operativo necesario, **Ubuntu 20.04.06**, seguido de **ROS** y la configuración de tu script `.bashrc` para tus requerimientos en **SinfonIA**.

## Instalación Ubuntu 20.04.06 LTS

---

Probablemente te estés preguntando, _"¿Por qué debería usar otro sistema operativo distinto al que ya uso?"_, especialmente si no estás familiarizado con Linux. La razón es que **Ubuntu** es el sistema operativo recomendado y comúnmente utilizado para **ROS**, debido a su soporte oficial, comunidad, compatibilidad de paquetes y facilidad de uso.

Ahora, considerando que la instalación de un sistema operativo puede ser una tarea tediosa, aquí te presentamos tres opciones excelentes, desde la más recomendada hasta la menos recomendada.

### 🖥️ Dual Boot (Particionar tu disco)

Esta opción te permite mantener tu sistema operativo principal mientras agregas Ubuntu, realizando una partición del disco en dos secciones. Por lo tanto, necesitarás decidir cuánto espacio de disco deseas asignar a Ubuntu y cuánto reservarás para tu otro sistema operativo. **Esta alternativa es la más recomendada** debido a su alta compatibilidad y flexibilidad. 

🔹 **Requisitos**:
- Memoria USB de **4GB** en adelante.

📺 **Tutorial recomendado**:  
[Instalar Ubuntu junto a Windows 10 (Tutorial) | Dual Boot](https://www.youtube.com/watch?v=usRIvdhRTS8)

### 💾 Instalar en un disco externo

Esta opción te permite instalar Ubuntu en un disco externo y utilizarlo en cualquier PC. Es una alternativa práctica si prefieres no modificar el sistema operativo principal de tu computadora o si necesitas la flexibilidad de usar Ubuntu en diferentes máquinas. Sin embargo, necesitarás disponer de un disco externo y asegurarte de que esté conectado cada vez que desees trabajar con Ubuntu.

📺 **Tutorial recomendado**:  
[Instalar Ubuntu en disco externo](https://www.youtube.com/watch?v=HnRfTNgq3gI)

---

A partir de este punto, **debes estar en Ubuntu** para realizar todos los pasos desde aquí. **Tómate un momento para descargar lo que necesites y familiarizarte con tu nueva herramienta.** Puedes aprovechar para personalizarlo instalando **Spotify, Visual Studio Code, tu navegador preferido, etc.**  

Antes de instalar **ROS**, te presentaremos algunas herramientas que probablemente te serán útiles más adelante.  

## 🛠️ Herramientas Adicionales Recomendadas  

A continuación, te proporcionamos algunas herramientas que te ayudarán en tu día a día usando **Ubuntu**.

### 🌐 Net-tools  

Es un paquete de herramientas de software para sistemas basados en Linux que proporciona utilidades esenciales para controlar y monitorear redes de computadoras.  

📌 **Instalación**:
```bash
sudo apt -y install net-tools
```
💡 TIP: Para revisar la IP entre otras configuraciones de tu red, ejecuta el comando:
```bash
ifconfig
```
Este comando desplegará toda la información sobre tu interfaz de red.

### 🖥️ Terminator
Es un emulador de terminal que permite dividir la ventana en múltiples paneles para organizar sesiones de terminal.

📌 **Instalación**:
```bash
sudo apt install terminator
```

###🕒 Se me desconfigura la hora entre ambos sistemas operativos (Dual Boot)
Si al instalar Ubuntu en modo Dual Boot con Windows notas que la hora se desajusta, esto se debe a que Ubuntu y Windows manejan el reloj de manera diferente.

📌 **Solución**:
```bash
sudo timedatectl set-local-rtc true
```

## 🚀 Instalación de ROS Noetic

¡Enhorabuena! 🎉 Ahora que ya estás familiarizado con los principios de ROS y has preparado tu entorno, es momento de proceder con la instalación de **ROS Noetic**. Te recomendamos seguir detalladamente los pasos proporcionados en la [wiki oficial de ROS](http://wiki.ros.org/noetic/Installation/Ubuntu). No dudes en consultar a tus compañeros de SinfonIA si surge alguna duda. 😉

## 📚 Tutoriales de ROS

Una vez completada la instalación, es fundamental explorar y practicar con ROS. La [wiki de ROS](http://wiki.ros.org/es/ROS/Tutoriales) ofrece una amplia gama de tutoriales que te ayudarán a profundizar en sus funcionalidades. ¡Diviértete aprendiendo y experimentando! 🎓

## 🛠️ Configuración de tu archivo `.bashrc`

Para optimizar tu experiencia con ROS, es esencial configurar algunas variables de entorno en tu archivo `.bashrc`. Este archivo se ejecuta cada vez que abres una nueva terminal en Ubuntu y permite personalizar tu sesión.

1. **Editar el archivo `.bashrc`**:
   - Abre una terminal y ejecuta: `nano ~/.bashrc`
   - Desplázate hasta el final del archivo.

2. **Añadir las siguientes líneas**:
   ```bash
   export PEPPER_IP=XXX.XXX.XXX.XXX
   export ROS_MASTER_URI=http://$PEPPER_IP:11311
   export ROS_IP=YYY.YYY.YYY.YYY
   ```
- **PEPPER_IP**: Dirección IP del robot. Puedes obtenerla presionando el botón en el pecho del robot.  
- **ROS_MASTER_URI**: Define cómo ROS se conecta con el servidor maestro, combinando la IP del robot y el puerto 11311.  
- **ROS_IP**: Dirección IP de tu computadora, utilizada para la comunicación entre nodos de ROS. Puedes obtenerla ejecutando `ifconfig` en la terminal.  

> 💡 **Consejo**: Asegúrate de que los primeros tres segmentos de las direcciones IP de `PEPPER_IP` y `ROS_IP` coincidan, indicando que ambos dispositivos están en la misma red.  
> - `PEPPER_IP=192.168.0.208` y `ROS_IP=192.168.0.111` ✅  
> - `PEPPER_IP=157.197.0.102` y `ROS_IP=192.168.0.103` ❌  

### 💾 Guardar y aplicar cambios

Para que estos cambios surtan efecto, es necesario guardar y recargar el archivo `.bashrc`.

1. **Guardar y salir del editor**  
   - Presiona `Ctrl+O` para guardar los cambios.  
   - Presiona `Enter` para confirmar.  
   - Presiona `Ctrl+X` para salir del editor.  

2. **Recargar el archivo**  
   - Ejecuta el siguiente comando en la terminal para aplicar los cambios:  

   ```bash
   source ~/.bashrc
   ```
## 🏗️ ¡Todo listo! ¿Qué sigue? 🚀  

¡Felicidades! 🎉 Ya tienes todo configurado para empezar a trabajar con **ROS** y tu **robot Pepper**. Ahora es momento de profundizar en las herramientas disponibles y aprender más sobre su funcionamiento.  

### 📖 Recursos adicionales 🔗  

Aquí tienes algunos recursos útiles para seguir aprendiendo y mejorando tus habilidades en ROS:  

🔹 [🔗 Tutoriales oficiales de ROS](http://wiki.ros.org/ROS/Tutorials) – Aprende desde lo básico hasta conceptos avanzados.  
🔹 [🔗 Guía de instalación y configuración de ROS Noetic](http://wiki.ros.org/noetic) – Información oficial sobre ROS Noetic.  
🔹 [🔗 Foro de ROS (ROS Answers)](https://answers.ros.org/) – Pregunta y resuelve dudas con la comunidad.  
🔹 [🔗 ROS Development Studio (RDS)](https://www.theconstructsim.com/) – Simulador en línea para practicar sin necesidad de hardware.  

### ⚙️ Explora las herramientas de SinfonIA 🔍  

Ahora que tienes un entorno de trabajo listo, explora las herramientas que tenemos en **SinfonIA** para trabajar con el robot:  

### 🖥️ [Interface](./Interface) – Interacción con la interfaz gráfica y comunicación.  

### 🧭 [Navigation](./Navigation) – Algoritmos y técnicas de navegación autónoma.  

### 💬 [Speech](./Speech) – Procesamiento de voz y generación de respuestas habladas.  

### 👀 [Vision](./Vision) – Visión artificial y reconocimiento de objetos.  

### 🦾 [Manipulation](./Manipulation) – Control y manipulación de objetos con el robot.  

### 🤖 [Task](./Task) – Coordinación de tareas y comportamiento autónomo.  

### 🛠️ [Toolkit](./Toolkit) – Herramientas adicionales para facilitar el desarrollo.  

### 📚 Conéctate con el robot y lanza el Toolkit 📡  

Si ya tienes tu entorno listo y quieres saber cómo **conectarte con el robot**, lanzar el **Toolkit** y **PyToolkit**, dirígete a la siguiente página:  

📖 **[Documentación del robot](./Documentación-del-Robot)**  

---  

🎯 ¡Explora, aprende y diviértete programando robots con SinfonIA! 🤖✨  
