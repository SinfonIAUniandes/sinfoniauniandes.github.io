# SinfonIA Robot Toolkit 🚀

Bienvenido al toolkit de SinfonIA, donde convertimos a tu robot en un verdadero héroe digital. 💡 Si alguna vez has soñado con un asistente robótico que escuche, vea, navegue y hasta hable contigo, este toolkit es justo lo que necesitas. 

Este repositorio implementa un conjunto de herramientas diseñadas para facilitar la integración de robots Pepper con ROS. A través de distintos módulos, permite controlar visión, audio, navegación y movimiento de manera sencilla y eficiente. Todo está estructurado en C++ y organizado en carpetas para que puedas encontrar rápidamente lo que necesitas.

🔹 **Código Fuente y Cabeceras:** El corazón del toolkit, donde la magia sucede. Encontrarás la implementación principal en `src` y las definiciones en `include`. Se incluyen módulos para gestionar audio, visión, navegación y movimiento.

🔹 **Construcción y Dependencias:** Gracias a `CMakeLists.txt` y `catkin`, el toolkit se construye fácilmente y maneja dependencias como ROS y OpenCV.

🔹 **Lanzamiento y Configuración:** La carpeta `launch` contiene configuraciones listas para ejecutar el toolkit en distintas condiciones (Ethernet, WLAN, con o sin odometría).

🔹 **Scripts y Automatización:** ¿Necesitas configurar la red de tu robot o gestionar su conexión? La carpeta `home_scripts` y la documentación en `Scripts.md` tienen todo lo necesario.

En pocas palabras, este toolkit es la clave para desarrollar e implementar aplicaciones robóticas sin complicaciones. ¡Dale vida a tu robot con SinfonIA! 🤖✨


# Servicios importantes del Toolkit!
El **Toolkit** de Pepper utiliza **servicios ROS** para activar, configurar y desactivar distintos módulos del robot. Cada servicio recibe una solicitud con parámetros específicos y responde con información sobre su estado o configuración.  

Los mensajes utilizados en estos servicios están definidos en el repositorio 📂 [`robot_toolkit_msgs`](https://github.com/SinfonIAUniandes/robot_toolkit_msgs).  

### 🎤 Servicio de Audio (`audio_tools_srv`)  
🔊 **Funcionalidad**: Gestiona el micrófono, la transmisión de audio, el reconocimiento de voz y la síntesis de voz (TTS).  
📩 **Solicitudes** ([`audio_tools_msg.msg`](https://github.com/SinfonIAUniandes/robot_toolkit_msgs/blob/master/msg/audio_tools_msg.msg)):  
- `"enable"` / `"enable_mic"` → Activa la transmisión del micrófono y/o la localización de sonido.  
- `"disable_tts"` → Detiene la síntesis de voz.  
- `"set_speech_params"` → Ajusta parámetros del reconocimiento o síntesis de habla.  

📤 **Respuesta**: Estado del audio y parámetros actuales.  


### 👀 Servicio de Visión (`vision_tools_srv`)  
📸 **Funcionalidad**: Controla las cámaras de Pepper y permite configurar resolución, FPS y espacio de color.  
📩 **Solicitudes** ([`vision_tools_msg.msg`](https://github.com/SinfonIAUniandes/robot_toolkit_msgs/blob/master/msg/vision_tools_msg.msg)):  
- `"enable"` → Inicia la publicación de imágenes con parámetros predeterminados.  
- `"set_parameters"` → Ajusta configuraciones como resolución o detección de rostros.  

📤 **Respuesta**: Configuración actual de la cámara.  


### 🗺️ Servicio de Navegación (`navigation_tools_srv`)  
🦿 **Funcionalidad**: Administra odometría, láser, navegación y planificación de rutas.  
📩 **Solicitudes** ([`navigation_tools_msg.msg`](https://github.com/SinfonIAUniandes/robot_toolkit_msgs/blob/master/msg/navigation_tools_msg.msg)):  
- `"enable_all"` → Activa odometría, láser, navegación y control de velocidad.  
- `"disable_all"` → Desactiva la navegación.  
- `"custom"` → Ajusta parámetros individuales, como la frecuencia del TF o la trayectoria (`path`).  

📤 **Respuesta**: Estado de los módulos activados/desactivados.  


### 🤖 Servicio de Movimiento (`motion_tools_srv`)  
💃 **Funcionalidad**: Controla posturas, ángulos y animaciones del robot.  
📩 **Solicitudes** ([`motion_tools_msg.msg`](https://github.com/SinfonIAUniandes/robot_toolkit_msgs/blob/master/msg/motion_tools_msg.msg)):  
- `"enable_all"` → Activa el control de movimiento.  
- `"set_angles"` → Ajusta los ángulos de las articulaciones.  

📤 **Respuesta**: Estado de las funciones de movimiento.  


### ✨ Servicio Misceláneo (`misc_tools_srv`)  
🔮 **Funcionalidad**: Administra LEDs, sensores táctiles y sonares.  
📩 **Solicitudes** ([`misc_tools_msg.msg`](https://github.com/SinfonIAUniandes/robot_toolkit_msgs/blob/master/msg/misc_tools_msg.msg)):  
- `"enable_all"` → Activa todos los módulos misceláneos.  
- `"custom"` → Configura elementos específicos.  

📤 **Respuesta**: Estado de los sensores y LEDs.  

---

# 📡 Tópicos del Toolkit  

El **nodo `robot_toolkit_node`** gestiona la comunicación entre ROS y el robot Pepper publicando datos de sensores y procesando comandos a través de distintos tópicos.  

## 🚀 Tópicos PUBLICADOS  

El nodo publica información de **visión**, **navegación**, **audio** y **eventos** en los siguientes tópicos:  

### 👀 Visión  
📸 **Imágenes de cámaras** (convertidas por `CameraConverters`):  
- `/camera/front/image_raw` → Cámara frontal  
- `/camera/bottom/image_raw` → Cámara inferior  
- `/camera/depth/image_raw` → Cámara de profundidad  

🧑 **Detección de rostros**:  
- `/face_publisher/front_camera`  
- `/face_publisher/bottom_camera`  

---

### 🗺️ Navegación  
📍 **Odometría y láser**:  
- `/odom` → Odometría calculada (`OdomPublisher`)  
- `/laser` → Datos del láser (`LaserPublisher`)  

🔄 **Tópicos derivados**:  
- `/tf` → Transformaciones (`TfPublisher`)  
- `/depth_to_laser` → Conversión de profundidad a láser  
- `/merged_laser` → Combinación de datos láser  

📌 **Posición y trayectoria**:  
- `/navigation/robot_pose_publisher` → Posición del robot  
- `/navigation/path` → Trayectoria planeada o recorrida  

---

### 🎤 Audio  
🔊 **Micrófono y procesamiento de audio**:  
Los mensajes se publican en un tópico determinado por el evento `"mic"` o `"miclocalization"`, según la configuración del sistema.  

---

### ✨ Otros / Eventos  
📢 **Eventos del sistema**:  
- Eventos de navegación (`navigation_result`)  
- Eventos de toque (`touch`)  
- Otros eventos especiales  

---

## 📥 Tópicos SUSCRITOS  

El nodo también se suscribe a varios tópicos para recibir comandos de navegación, movimiento y configuración de dispositivos.  

### 🗺️ Navegación  
🕹️ **Control de movimiento**:  
- `/cmd_vel` → Comandos de velocidad  
- `/move_base_simple/goal` → Objetivos de navegación (`moveto`)  
- `/navigation/goal` → Comandos de meta o waypoint (`NavigationGoalSubscriber`)  
- `/free_zone` → Información sobre zonas libres (`FreeZoneSubscriber`)  
- `/navigation/robot_pose_subscriber` → Posición del robot (`RobotPoseSubscriber`)  

---

### 🤖 Movimiento  
🎭 **Gestos y posturas**:  
- `/animations` → Animaciones y gestos (`AnimationSubscriber`)  
- `/set_angles` → Ajuste de ángulos y posturas (`SetAnglesSubscriber`)  

---

### ✨ Misceláneos  
💡 **Configuración de LEDs**:  
- `/leds` → Control de LEDs (`LedsSubscriber`)  

---

### 🔄 Otros  
🔧 **Configuraciones especiales**:  
- `/special_settings` → Parámetros adicionales  
- Suscripciones relacionadas con **procesamiento de audio** y **reconocimiento de voz**  

---

## 🏗️ Resumen Integrado  

El **`robot_toolkit_node`** actúa como **orquestador de módulos**, publicando datos de sensores y procesando comandos de control.  

📤 **Publica** información de sensores y procesos, como imágenes, láser, odometría y detección de rostros.  
📥 **Se suscribe** a tópicos de navegación, movimiento y configuración de dispositivos.  

Esta estructura modular permite una integración eficiente entre **ROS y NAOqi**, facilitando el control del robot Pepper en diferentes escenarios. 🚀  


## 🛠️ Arquitectura del Código

El código en la carpeta `src/` es el núcleo del **SinfonIA Robot Toolkit** y está organizado en distintos módulos que permiten controlar las capacidades del robot **Pepper** mediante ROS y el framework **naoqi**.

### Introducción al qi SDK

El **qi SDK** es un conjunto de herramientas proporcionado por Aldebaran para desarrollar aplicaciones que interactúan con los robots como **Pepper**. Este SDK permite crear servicios y clientes en varios lenguajes de programación, facilitando la comunicación y el control de las funcionalidades del robot. Puedes encontrar más información en la [documentación oficial](http://doc.aldebaran.com/2-5/dev/cpp/newsdk.html).

### 🧩 **Módulo Central (`robot_toolkit.cpp`)**  
La clase principal `RobotToolkit` es la encargada de integrar todas las herramientas y servicios. Su función es:  
- Gestionar los servicios ROS para **visión, navegación, audio y movimiento**.  
- Recibir comandos a través de **callbacks** y activar/desactivar funcionalidades.  
- Comunicar el sistema con el hardware y otros módulos.  

Además, el archivo `autoload_registration.cpp` gestiona el registro de módulos en naoqi.  

---

### 🗺️ **Herramientas de Navegación (`navigation_tools/`)**  
Este módulo permite que el robot **se oriente en su entorno**, integrando datos de sensores y control de movimiento:  

📡 **Sensores y Localización**  
- `laser/` → Conversión y publicación de datos del sensor láser (`laser_converter.cpp`, `laser_publisher.cpp`).  
- `odom/` → Conversión y publicación de odometría (`odom_converter.cpp`, `odom_publisher.cpp`).  
- `robot_pose/` → Publicación y conversión de la posición del robot (`robot_pose_converter.cpp`, `robot_pose_publisher.cpp`).  

⚙️ **Control de Movimiento y Planificación**  
- `cmd_vel/` → Control de velocidad (`cmd_vel_subscriber.cpp`).  
- `move_to/` → Comandos de desplazamiento (`move_to.cpp`).  
- `navigation_goal/` → Suscripción a objetivos de navegación (`navigation_goal_subscriber.cpp`).  
- `path/` → Publicación y conversión de rutas de navegación (`path_publisher.cpp`).  

🧭 **Transformaciones y Resultados**  
- `tf/` → Conversión y publicación de transformaciones (`tf_converter.cpp`, `tf_publisher.cpp`).  
- `result/` → Eventos y publicaciones de resultados de navegación (`result_event.cpp`, `result_publisher.cpp`).  

---

### 🎥 **Herramientas de Visión (`vision_tools/`)**  
Este módulo gestiona las cámaras y el procesamiento de imágenes:  
📷 **Cámaras**  
- `camera_converter.cpp` → Conversión de datos de cámara.  
- `camera_publisher.cpp` → Publicación de imágenes capturadas.  

🧑‍🤝‍🧑 **Detección de Rostros**  
- `face_detector.cpp` → Procesamiento y detección de caras.  
- `face_publisher.cpp` → Publicación de datos de detección facial.  

---

### 🎙️ **Herramientas de Audio (`audio_tools/`)**  
El robot **escucha y habla** gracias a este módulo:  

🎤 **Entrada de Audio** (`mic/`)  
- `mic_converter.cpp` → Conversión de datos del micrófono.  
- `mic_event.cpp` → Eventos activados por el micrófono.  
- `mic_localization_event.cpp` → Eventos de localización de sonido.  
- `mic_localization_publisher.cpp` → Publicación de la localización de sonido.  
- `mic_publisher.cpp` → Publicación de datos del micrófono.  

🗣️ **Síntesis y Reconocimiento de Voz**  
- `speech/speech_subscriber.cpp` → Suscripción a comandos de síntesis de voz.  
- `speech_recognition/speech_recognition_event.cpp` → Eventos de reconocimiento de voz.
  
💥 **Comentario Importante**  
```diff
- Las funcionalidades de speech recognition no funcionan correctamente desde el toolkit, por lo que solo se usan desde el py_toolkit.
```
---

### 🤖 **Herramientas de Movimiento (`motion_tools/`)**  
Este módulo permite que el robot **se mueva y adopte distintas posturas**:  
🕺 **Control de Movimiento**  
- `animation_subscriber.cpp` → Control de animaciones.  
- `set_angles_subscriber.cpp` → Modificación de posturas y ángulos de las articulaciones.  

---

### 🔧 **Otros Módulos Útiles**  

🛠️ **Sensores y Actuadores (`misc_tools/`)**  
- `leds_subscriber.cpp` → Control de LEDs.  
- `sonar/` → Gestión del sensor de ultrasonido (`sonar_converter.cpp`, `sonar_publisher.cpp`).  
- `touch/` → Detección de contacto táctil (`touch_event.cpp`, `touch_publisher.cpp`).  
- `special_settings/special_settings_subscriber.cpp` → Configuración especial del robot.  

🔗 **Funciones Auxiliares (`helpers/`)**  
- `toolkit_helpers.cpp` → Funciones de apoyo para la integración de módulos.  

🔍 **Configuración del Robot (`tools/`)**  
- `robot_description.cpp` → Gestión de la descripción del robot.  

---

Con esta estructura modular, el **SinfonIA Robot Toolkit** ofrece una integración **completa y flexible** con Pepper, permitiendo su control avanzado a través de ROS. 🚀🤖✨  

---

## 📂 Headers y Contratos en `include/`

La carpeta `include/` define todos los contratos y estructuras necesarias para integrar y comunicar los distintos módulos del **SinfonIA Robot Toolkit** con **naoqi** y **ROS**.  

### 🏗️ **Estructura Modular y Jerárquica**  

La carpeta está organizada en subdirectorios que agrupan funcionalidades específicas:  

📌 **`robot_toolkit/`**  
Define la interfaz principal del toolkit mediante la clase `RobotToolkit`, la cual centraliza la comunicación con los distintos módulos.  
- Gestiona navegación, visión, audio y movimiento mediante **callbacks ROS**.  
- Contiene archivos clave como `message_actions.h` (definición de acciones de mensajería) y headers de entorno (`ros_environment.hpp`, `naoqi_environment.hpp`).  

📌 **Módulos Funcionales:**  
- **`audio_tools/`** 🎙️ → Manejo de micrófono, síntesis de voz y reconocimiento de voz con **naoqi**.  
- **`vision_tools/`** 🎥 → Procesamiento de imágenes y detección facial (con **OpenCV** y **cv_bridge**).  
- **`navigation_tools/`** 🗺️ → Integración de datos de sensores (láser, odometría) y navegación.  
- **`motion_tools/`** 🕺 → Control de animaciones, posturas y movimientos.  
- **`misc_tools/`** 🔧 → Gestión de **LEDs, sensores de proximidad (sonar)** y configuración especial.  

### 🔄 **Conversores y Callbacks**  

Los headers en `converter/` definen clases base para **convertir y formatear datos de sensores**.  

📌 **Ejemplo en visión:**  
- `camera_converter.hpp` y `face_detector.hpp` procesan imágenes y detectan rostros.  
- Callbacks como `faceDetectedCallback` permiten respuestas en tiempo real.  

📌 **Ejemplo en navegación:**  
- `odom_converter.hpp` y `laser_converter.hpp` gestionan datos de odometría y láser.  

### 🤖 **Integración con naoqi y ROS**  

Los archivos de cabecera utilizan la API de **naoqi** (`qi::SessionPtr`) para comunicarse con **Pepper** y los mecanismos de comunicación de **ROS** (servicios, mensajes y topics).  
- La clase `RobotToolkit` inicializa, configura y detiene los servicios.  
- Los módulos intercambian datos en **tiempo real** entre **naoqi** y **ROS**.  

### 🛠️ **Utilidades y Helpers**  

La carpeta `helpers/` incluye funciones auxiliares para:  
- **Gestión del sistema de archivos.**  
- **Manejo de parámetros de visión.**  
- **Coordinación eficiente entre módulos.**  

---

💡 **En resumen:**  
Los headers en `include/` establecen la arquitectura de comunicación y conversión de datos para **Pepper**. Gracias a la integración de módulos especializados y la centralización en `RobotToolkit`, el toolkit permite un control avanzado del robot mediante **naoqi** y **ROS**. 🚀🤖✨  



# py_toolkit: Integración de ROS con NAOqi  

`py_toolkit` es un nodo de ROS que actúa como puente entre el framework NAOqi y ROS, permitiendo la interacción con el robot mediante servicios y tópicos. Proporciona funcionalidades clave como control de movimiento, interacción con la tableta, navegación, reproducción de audio y seguimiento visual.  Básicamente es una extensión de sinfonia_toolkit en Python que añade las funcionalidades que hacen falta en el original de manera sencilla

---

## 1. Estructura del Nodo  

### `main.py`  
El bloque `main` realiza las siguientes acciones:  

1. **Inicialización**  
   - Analiza los argumentos de línea de comandos (IP y puerto).  
   - Establece conexión con el robot mediante `qi.Session`.  
   - Inicializa el nodo ROS `pytoolkit`.  

2. **Configuración Inicial**  
   - Detiene la aplicación `AppLauncher`.  
   - Desactiva `AutonomousLife` y `BasicAwareness`.  
   - Establece la postura del robot en `Stand`.  

3. **Configuración de Servicios**  
   - Crea y registra múltiples servicios ROS para controlar distintas funciones del robot.  

4. **Ejecución Continua**  
   - Llama a `rospy.spin()` para mantener el nodo en funcionamiento.  

---

### `PyToolkit.__init__()`  
El constructor de la clase `PyToolkit` realiza lo siguiente:  

1. **Definición de Variables y Constantes**  
   - Ruta del paquete y variables internas para el manejo de estados.  

2. **Creación de Publicadores (Publishers)**  
   - Publica información sobre el estado del robot y sus sistemas.  

3. **Configuración de Subscriptores (Subscribers)**  
   - Comandos de movimiento.  
   - Entrada de voz.  

4. **Suscripción a Eventos NAOqi**  
   - Estado del TTS.  
   - Fallos de movimiento.  
   - Reconocimiento de voz.  
   - Datos de percepción sensorial.  

5. **Adquisición de Clientes de Servicios NAOqi**  
   - `ALAudioDevice`, `ALMotion`, `ALTabletService`, entre otros.  

6. **Registro de Servicios ROS**  
   - Habilita interacción con audio, movimiento, navegación, seguridad, seguimiento visual y la tableta.  

---

## 2. Servicios Disponibles en `py_toolkit`  

A continuación, se describen los servicios ROS registrados en `py_toolkit`:

### Audio y Reconocimiento de Voz
| Servicio | Tipo de mensaje | Parámetros | Descripción |
|----------|------------|------------|------------|
| `/pytoolkit/ALAudioDevice/set_output_volume_srv` | `set_output_volume_srv` | `volume` (int): nivel de volumen | Ajusta el volumen de salida del robot. |
| `/pytoolkit/ALAudioDevice/get_output_volume_srv` | `battery_service_srv` | No requiere parámetros | Consulta y devuelve el volumen actual configurado. |
| `/pytoolkit/ALAudioPlayer/play_sound_effect_srv` | `tablet_service_srv` | `url` (string): ruta del efecto de sonido | Reproduce un efecto de sonido desde una URL. |
| `/pytoolkit/ALAudioPlayer/play_audio_stream_srv` | `set_stiffnesses_srv` | `names` (string): URL del stream, `stiffnesses` (float): volumen | Inicia la reproducción de un flujo de audio en vivo. |
| `/pytoolkit/ALAudioPlayer/stop_audio_stream_srv` | `battery_service_srv` | No requiere parámetros | Detiene la reproducción del flujo de audio. |
| `/pytoolkit/ALTextToSpeech/shut_up_srv` | `battery_service_srv` | No requiere parámetros | Detiene todas las salidas de texto a voz. |
| `/pytoolkit/ALTextToSpeech/say_to_file_srv` | `say_to_file_srv` | `text` (string): texto a convertir en audio | Convierte texto en un archivo de audio y devuelve sus datos. |
| `/pytoolkit/ALSpeechRecognition/set_speechrecognition_srv` | `set_speechrecognition_srv` | `subscribe` (bool): activar/desactivar, `noise` (bool): efectos audio, `eyes` (bool): expresiones visuales | Configura el reconocimiento de voz. |
| `/pytoolkit/ALSpeechRecognition/set_words_srv` | `set_words_threshold_srv` | `words` (string[]): vocabulario, `threshold` (float[]): umbrales de confianza | Ajusta el vocabulario y umbrales para el reconocimiento de palabras. |
| `/pytoolkit/ALSpeechRecognition/set_hot_word_language_srv` | `tablet_service_srv` | `url` (string): código del idioma | Cambia el idioma asociado a la palabra clave. |

### Expresión y Conciencia del Robot
| Servicio | Tipo de mensaje | Parámetros | Descripción |
|----------|------------|------------|------------|
| `/pytoolkit/ALAutonomousLife/set_state_srv` | `SetBool` | `data` (bool): activar/desactivar vida autónoma | Activa o desactiva la vida autónoma del robot. |
| `/pytoolkit/ALAutonomousBlinking/toggle_blinking_srv` | `SetBool` | `data` (bool): activar/desactivar parpadeo | Activa o desactiva el parpadeo autónomo. |
| `/pytoolkit/ALBasicAwareness/set_awareness_srv` | `SetBool` | `data` (bool): activar/desactivar awareness | Controla el estado de la conciencia del robot. |
| `/pytoolkit/ALBasicAwareness/pause_awareness_srv` | `battery_service_srv` | No requiere parámetros | Pausa el awareness y detiene el tracker. |
| `/pytoolkit/ALBasicAwareness/resume_awareness_srv` | `battery_service_srv` | No requiere parámetros | Reanuda el awareness tras una pausa. |
| `/pytoolkit/ALBasicAwareness/set_tracking_mode_srv` | `go_to_posture_srv` | `posture` (string): modo de tracking ("Head", "BodyRotation", "WholeBody", etc.) | Configura el modo de seguimiento del awareness. |

### Movimiento y Seguridad
| Servicio | Tipo de mensaje | Parámetros | Descripción |
|----------|------------|------------|------------|
| `/pytoolkit/ALMotion/set_arms_security_srv` | `SetBool` | `data` (bool): activar/desactivar protección de brazos | Ajusta la protección en los brazos. |
| `/pytoolkit/ALMotion/set_security_distance_srv` | `set_security_distance_srv` | `distance` (float): distancia en metros | Establece la distancia de seguridad general. |
| `/pytoolkit/ALMotion/set_tangential_security_distance_srv` | `set_security_distance_srv` | `distance` (float): distancia en metros | Configura la distancia tangencial de seguridad. |
| `/pytoolkit/ALMotion/set_orthogonal_security_distance_srv` | `set_security_distance_srv` | `distance` (float): distancia en metros | Ajusta la distancia ortogonal de seguridad. |
| `/pytoolkit/ALMotion/set_open_close_hand_srv` | `set_open_close_hand_srv` | `hand` (string): "left", "right" o "both", `state` (string): "open" o "close" | Abre o cierra las manos del robot. |
| `/pytoolkit/ALMotion/toggle_breathing_srv` | `set_open_close_hand_srv` | `hand` (string): parte del cuerpo, `state` (string): "True" o "False" | Activa o desactiva el movimiento de respiración en los brazos. |
| `/pytoolkit/ALMotion/move_head_srv` | `move_head_srv` | `state` (string): "up", "down" o "default" | Mueve la cabeza del robot a posiciones predefinidas. |
| `/pytoolkit/ALMotion/set_angle_srv` | `set_angle_srv` | `name` (string[]): articulaciones, `angle` (float[]): valores, `speed` (float): velocidad | Establece ángulos específicos en las articulaciones. |
| `/pytoolkit/ALMotion/toggle_get_angle_srv` | `set_angle_srv` | `name` (string): parte del cuerpo para publicar ángulos | Inicia la publicación continua de los ángulos de las articulaciones. |
| `/pytoolkit/ALMotion/set_move_arms_enabled_srv` | `set_move_arms_enabled_srv` | `LArm` (bool): brazo izquierdo, `RArm` (bool): brazo derecho | Habilita o deshabilita el movimiento de los brazos. |
| `/pytoolkit/ALMotion/set_stiffnesses_srv` | `set_stiffnesses_srv` | `names` (string o string[]): articulaciones, `stiffnesses` (float o float[]): valores de rigidez (0-1) | Ajusta la rigidez de las articulaciones. |
| `/pytoolkit/ALMotion/toggle_smart_stiffness_srv` | `SetBool` | `data` (bool): activar/desactivar rigidez inteligente | Activa o desactiva la rigidez inteligente. |
| `/pytoolkit/ALMotion/move_relative_srv` | `navigate_to_srv` | `x_coordinate` (float): metros, `y_coordinate` (float): metros | Mueve el robot de forma relativa a su posición actual. |
| `/pytoolkit/ALMotion/play_dance_srv` | `set_output_volume_srv` | `volume` (int): identifica la coreografía (1, 2 o 3) | Ejecuta una coreografía de baile predefinida. |
| `/pytoolkit/ALMotion/enable_security_srv` | `battery_service_srv` | No requiere parámetros | Restablece la configuración de seguridad. |

### Navegación y Posicionamiento
| Servicio | Tipo de mensaje | Parámetros | Descripción |
|----------|------------|------------|------------|
| `/pytoolkit/ALNavigation/navigate_to_srv` | `navigate_to_srv` | `x_coordinate` (float): metros, `y_coordinate` (float): metros | Hace que el robot se desplace a coordenadas específicas. |
| `/pytoolkit/ALNavigation/start_exploring_srv` | `set_output_volume_srv` | `volume` (float): distancia a explorar en metros | Inicia la exploración del entorno. |
| `/pytoolkit/ALNavigation/stop_exploring_srv` | `battery_service_srv` | No requiere parámetros | Detiene el proceso de exploración. |
| `/pytoolkit/ALRobotPosture/go_to_posture_srv` | `go_to_posture_srv` | `posture` (string): "stand" o "rest" | Cambia la postura del robot. |

### Interacción con la Tableta
| Servicio | Tipo de mensaje | Parámetros | Descripción |
|----------|------------|------------|------------|
| `/pytoolkit/ALTabletService/show_image_srv` | `tablet_service_srv` | `url` (string): URL o ruta de la imagen | Muestra una imagen en la tableta. |
| `/pytoolkit/ALTabletService/show_web_view_srv` | `tablet_service_srv` | `url` (string): URL de la página web | Carga una vista web en la tableta. |
| `/pytoolkit/ALTabletService/show_topic_srv` | `tablet_service_srv` | `url` (string): nombre del tópico ROS a visualizar | Muestra un tópico de ROS en la tableta. |
| `/pytoolkit/ALTabletService/play_video_srv` | `tablet_service_srv` | `url` (string): URL o ruta del video | Reproduce un video en la tableta. |
| `/pytoolkit/ALTabletService/get_input_srv` | `get_input_srv` | `type` (string): "text", "bool" o "list", `text` (string): texto o opciones a mostrar | Solicita una entrada del usuario mediante la tableta. |
| `/pytoolkit/ALTabletService/show_words_srv` | `battery_service_srv` | No requiere parámetros | Muestra texto en la tableta. |
| `/pytoolkit/ALTabletService/show_picture_srv` | `battery_service_srv` | No requiere parámetros | Captura y muestra una imagen en la tableta. |
| `/pytoolkit/ALTabletService/hide_srv` | `battery_service_srv` | No requiere parámetros | Oculta la interfaz de la tableta. |
| `/pytoolkit/ALTabletService/overload_srv` | `battery_service_srv` | No requiere parámetros | Simula múltiples solicitudes de carga de aplicaciones en la tableta. |
| `/pytoolkit/ALServiceManager/toggle_applauncher_srv` | `SetBool` | `data` (bool): activar/desactivar AppLauncher | Activa o desactiva el AppLauncher. |

### Seguimiento y Detección
| Servicio | Tipo de mensaje | Parámetros | Descripción |
|----------|------------|------------|------------|
| `/pytoolkit/ALTracker/start_follow_face_srv` | `battery_service_srv` | No requiere parámetros | Activa el seguimiento de rostros. |
| `/pytoolkit/ALTracker/point_at_srv` | `point_at_srv` | `effector_name` (string): parte del cuerpo, `x`, `y`, `z` (float): coordenadas, `frame` (string): marco de referencia, `speed` (float): velocidad | Hace que el robot apunte a una coordenada específica. |
| `/pytoolkit/ALTracker/stop_tracker_srv` | `battery_service_srv` | No requiere parámetros | Detiene el servicio de seguimiento. |
| `/pytoolkit/ALTracker/start_tracker_srv` | `battery_service_srv` | No requiere parámetros | Inicia el servicio de seguimiento con objetivos predefinidos. |

### Sensores y Estado del Robot
| Servicio | Tipo de mensaje | Parámetros | Descripción |
|----------|------------|------------|------------|
| `/pytoolkit/ALSegmentation3D/get_segmentation3D_srv` | `get_segmentation3D_srv` | No requiere parámetros | Obtiene coordenadas de segmentación 3D. |
| `/pytoolkit/ALBatteryService/get_porcentage` | `battery_service_srv` | No requiere parámetros | Recupera el porcentaje de batería actual. |


---

## 3. Tópicos Publicados por `py_toolkit`  

| Tópico | Tipo de mensaje | Descripción |
|--------|-------------|-------------|
| `/pytoolkit/ALTextToSpeech/status` | `text_to_speech_status_msg` | Publica mensajes de estado del sistema de texto a voz (TTS), indicando el progreso o finalización de solicitudes de conversión de texto a voz. |
| `/pytoolkit/ALMotion/failed` | `speech_recognition_status_msg` | Publica notificaciones cuando se producen fallos en operaciones de movimiento. |
| `/pytoolkit/ALSpeechRecognition/status` | `speech_recognition_status_msg` | Difunde palabras u otros datos relacionados con el reconocimiento de voz cuando se detecta una palabra con alta probabilidad. |
| `/pytoolkit/ALSpeechRecognition/SpeechDetected` | `speech_recognition_status_msg` | Publica eventos que indican el estado de la detección de voz (inicio o fin del proceso de detección). |
| `/pytoolkit/ALSensors/obstacles` | `speech_recognition_status_msg` | Publica datos sobre obstáculos detectados por los sensores del robot. |
| `/pytoolkit/ALMotion/get_angles` | `set_angles_msg` | Publica periódicamente los ángulos actuales de las articulaciones del robot. |

---

## 4. Tópicos Suscritos por `py_toolkit`  

| Tópico | Tipo de mensaje | Descripción |
|--------|-------------|-------------|
| `/pytoolkit/ALMotion/move` | `Twist` | Recibe comandos de movimiento y los traduce a acciones físicas en el robot. |
| `/speech` | `speech_msg` | Recibe datos de reconocimiento de voz y los procesa para actualizar la interfaz de la tableta o ajustar el comportamiento del robot. |

---

## 5. Conclusión  
`py_toolkit` es un nodo fundamental para la integración entre ROS y NAOqi, proporcionando una API accesible para controlar múltiples aspectos del robot, desde la navegación y el movimiento hasta la interacción con la tableta y el seguimiento visual. Su arquitectura basada en servicios y tópicos facilita la comunicación entre los distintos módulos del sistema, garantizando un control flexible y eficiente.
