# 🕹️ **Interface - Control Remoto para Robots con React y ROS** 🚀

¡Bienvenido al centro de mando de nuestro **robot Pepper** (y potencialmente otros)! 🎉  
Aquí te contamos cómo funciona nuestra **interfaz web remota** para controlar el robot usando **React + ROS + WebSockets**.  

---

## 🛠️ **¿Qué hace esta aplicación?**  
Esta aplicación permite **controlar a Pepper de forma remota**, enviando y recibiendo datos a través de **ROSLIB**.  
👉 Puedes **ver lo que el robot ve**, **moverlo con el teclado**, **hacer que hable**, **controlar su volumen**, **cambiar sus LEDs**, ¡y mucho más!

---

## 📡 **Conexión a ROS** (`RosContext.js`)
Aquí es donde establecemos la conexión con ROS:

- 📶 Guardamos la conexión en un estado `ros` y la URL en `rosUrl` (`ws://localhost:9090` por defecto).
- 🔗 Pedimos al usuario la **IP del servidor** en el primer render.
- 🔄 Si `rosUrl` cambia, la conexión se **reinicia automáticamente** para que todo funcione sin interrupciones.

---

## 🔄 **Funciones de Comunicación con ROS** (`RosManager.js`)
Este módulo es el **puente entre React y ROS**. ¿Qué puede hacer?

- 🛰️ **Tópicos**: Publicar (`publishMessage`) y suscribirse (`subscribeToTopic`) a mensajes.
- ⚙️ **Servicios**: Llamar (`callService`) y crear (`createService`) servicios de ROS.

---

## 🎛️ **Componentes de la Interfaz**
Cada uno se encarga de algo específico en el robot:

### 📷 **Cámaras** (`Cameras.js`)
- 🎥 Recibe imágenes en tiempo real de **las cámaras de Pepper**.
- 📡 Usa WebSockets para actualizar la imagen en la interfaz.
- 🔧 Permite **cambiar la resolución y el frame rate**.

### 💡 **Control de LED** (`Leds.js`)
- 🎨 **Cambia el color** de los LEDs de Pepper.
- 🌈 Usa un **input de color** para elegirlo.
- 📡 Envía mensajes a `/leds` y activa funciones adicionales.

### 🔋 **Estado de la Batería** (`Battery.js`)
- 📊 Muestra el **porcentaje de batería** en tiempo real.
- ⚡ Tiene una **barra de progreso** para visualizarlo mejor.

### 🕺 **Animaciones** (`Animaciones.js`)
- 🎭 Lista y organiza **animaciones del robot**.
- 📂 Se cargan desde `animations.txt`.
- ▶️ Permite seleccionar y ejecutar gestos y expresiones faciales.

### 🔊 **Audio** (`Audio.js`)
- 🎶 Reproduce **archivos de audio** desde una URL.
- ⏹️ Permite **detener la reproducción** con un solo clic.

### 🌐 **Navegador en la Tablet** (`Navegador.js`)
- 📱 Envía una **URL a la tablet de Pepper**.
- 🖥️ Se usa para mostrar contenido web en la pantalla del robot.

### 🖼️ **Envío de Imágenes** (`Imagen.js`)
- 📤 Permite enviar imágenes a la tablet desde una URL o un archivo local.
- 🔄 Convierte imágenes a **base64** si son archivos.

### 🎮 **Control de Movimiento** (`Base.js`)
- 🔼 **WASD** para mover el robot 🚶‍♂️
- 🔄 **Q/E** para girar ↩️
- 📡 Publica comandos en `/cmd_vel`.

### 🗣️ **Texto a Voz (TTS)** (`Texto.js`)
- 📝 Envía un texto y el robot **lo dice en voz alta**.
- 🎭 Opcionalmente, **mueve la boca o hace gestos** mientras habla.

### 📢 **Volumen** (`Volumen.js`)
- 🔊 **Sube y baja** el volumen del robot.
- 🔄 Se inicializa en **50% por defecto**.

---

## 🏗️ **Estructura de la Aplicación**
- 🏠 `App.js`: **Organiza los componentes** en la interfaz.
- 🌎 `index.js`: **Punto de entrada** que conecta todo con `RosProvider`.
- 📜 `animations.txt`: Lista de **animaciones disponibles** para Pepper.

---

## 🎯 **¿Qué logramos con esta aplicación?**
✅ **Control total de Pepper desde una interfaz web**.  
✅ **Interacción en tiempo real** con ROS a través de WebSockets.  
✅ **Interfaz modular** para añadir nuevas funciones fácilmente.  
✅ **Compatibilidad con otros robots similares a Pepper**.  

---

## 🚀 **¿Qué sigue?**
🔥 Mejorar la interfaz visual para hacerla más intuitiva.  
🎭 Opciones de personalización.  

¡Y muchas más ideas por explorar! 🌟

