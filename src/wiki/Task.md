# Task Module - Documentación

## 1. Introducción

### Descripción general de Task Module
El módulo **Task** es el núcleo de la arquitectura del sistema, proporcionando una interfaz centralizada para la ejecución de tareas mediante la integración de múltiples servicios de **ROS**. Su principal objetivo es facilitar la implementación de comportamientos complejos sin necesidad de definir cada funcionalidad desde cero.

### Funcionalidad y propósito
Task Module encapsula y gestiona diversos servicios esenciales del robot, incluyendo:
- **Vision:** Manejo de cámaras, reconocimiento de objetos, landmarks y descripción de imágenes. Ver la página [Vision](./Vision).
- **Speech:** Síntesis de voz, reconocimiento de voz y procesamiento de preguntas y respuestas.
- **Manipulation:** Agarre y liberación de objetos, gestos y control de brazos.
- **Navigation:** Desplazamiento autónomo, rotaciones, seguimiento de personas, entre otros.

Al centralizar estos servicios en una única interfaz, el **Task Module** permite que otros módulos (como `gpsr.py` y `evento.py`) los utilicen sin necesidad de redefinir su lógica.

### Relación con otros módulos del sistema
Task Module es utilizado por varios archivos dentro de `src/`, como:
- **`gpsr.py`**: Implementa la tarea GPSR (General Purpose Service Robot), permitiendo al robot recibir comandos en lenguaje natural y ejecutar tareas mediante generación de código.
- **`evento.py`**: Maneja eventos interactivos y demostraciones en las que el robot responde a estímulos externos.
- **Otros archivos (`clean_the_table.py`, `akinator.py`, etc.)**: Implementan tareas específicas que dependen de los servicios proporcionados por Task Module.

---

## 2. Arquitectura del Módulo

### Relación entre `task_module.py` y otros módulos (`GPSR`, `eventos`, etc.)
El archivo `task_module.py` actúa como una **librería central** que otros módulos instancian para acceder a sus funcionalidades. Algunos ejemplos incluyen:
- **`gpsr.py`**: Inicializa el robot, configura cámaras y genera código dinámico para ejecutar tareas.
- **`evento.py`**: Usa `task_module.py` para gestionar respuestas a interacciones del usuario.
- **Otros archivos de tareas**: Utilizan los servicios de **Task Module** para simplificar su implementación.

### Uso de máquinas de estados y generación de código
- **Máquinas de estados:**  
  - Los módulos como `gpsr.py` y `evento.py` utilizan la librería **`transitions`** para gestionar estados y transiciones.  
  - Ejemplo de estados en `gpsr.py`: `INIT → WAIT4GUEST → EXECUTE_GPSR → FINALIZE`.  
  - `evento.py` usa estados como `IDLE → INTERACTING → ANIMATION_PLAYING`.

- **Generación de código:**  
  - La carpeta `code_generation/` maneja la conversión de lenguaje natural en código ejecutable.  
  - `ls_generate.py` utiliza `LongStringGenerator` para generar código Python a partir de descripciones de tareas.  
  - `generate_utils.py` facilita la configuración de variables y la ejecución del código generado.

---

## 3. Funcionalidades del Módulo

Task_module centraliza la integración de servicios esenciales del robot, permitiendo la interacción con percepción, navegación, manipulación y habla. Esta sección describe las principales funcionalidades organizadas por áreas clave.

### 3.1 Visión

La visión es fundamental para la interacción del robot con su entorno. El paquete actual de reconocimiento visual es `vision_utilities`; la documentación de sus servicios está en [Vision](./Vision). Task_module todavía expone varios servicios y tópicos heredados de `perception_utilities` para procesamiento de imágenes, reconocimiento de objetos y rostros, detección de colores y más.

#### **Servicios de cámaras y manejo de imágenes**
- **`/perception_utilities/turn_camera_srv`**: Habilita o deshabilita una cámara (ej. `front_camera`, `bottom_camera`) y ajusta su resolución y FPS.
- **`/perception_utilities/filtered_image`**: Proporciona imágenes filtradas según criterios específicos (ej. detección de rostros o códigos QR).

#### **Servicios de procesamiento y reconocimiento de objetos y personas**
- **`/perception_utilities/get_labels_srv`**: Devuelve etiquetas de objetos detectados en la imagen.
- **`/perception_utilities/calculate_depth_of_label_srv`**: Calcula la distancia (profundidad) de un objeto identificado.
- **`/perception_utilities/look_for_object_srv`**: Verifica la presencia de un objeto específico en la imagen.
- **`/perception_utilities/img_description_with_gpt_vision_srv`**: Genera una descripción de la imagen utilizando modelos de IA avanzados.

#### **Servicios para manejo de rostros y reconocimiento personal**
- **`/perception_utilities/save_face_srv`**: Guarda información de un rostro detectado.
- **`/perception_utilities/recognize_face_srv`**: Identifica a una persona a partir de imágenes previas.
- **`/perception_utilities/remove_faces_data_srv`**: Elimina datos de rostros almacenados.

#### **Servicios complementarios y de configuración**
- **`/perception_utilities/get_clothes_color_srv`** y **`/perception_utilities/get_first_clothes_color_srv`**: Detectan el color de la ropa de una persona.
- **`/perception_utilities/read_qr_srv`**: Lee códigos QR en la imagen.
- **`/perception_utilities/get_person_description_srv`**: Obtiene atributos como edad y género de una persona detectada.
- **`/perception_utilities/set_model_recognition_srv`**, **`add_recognition_model_srv`**, **`remove_recognition_model_srv`**: Configuran y ajustan el modelo de reconocimiento en uso.

#### **Tópicos asociados**
- **`/perception_utilities/get_labels_publisher`**: Publica etiquetas de objetos detectados en tiempo real.
- **`/perception_utilities/get_clothes_publisher`**: Informa sobre los colores de la ropa detectada.

Task_module gestiona y coordina estos servicios para ofrecer una interfaz unificada a otros módulos, como `gpsr.py` y `evento.py`, simplificando la integración de capacidades de percepción sin necesidad de gestionar individualmente cada servicio. 


### 3.2 Comunicación y Síntesis de Voz (Speech)

Task_module centraliza los servicios de `speech_utilities` para dotar al robot de capacidades de comunicación mediante síntesis de voz, reconocimiento de habla y procesamiento de preguntas. 

#### **Servicios de síntesis de voz**
- **`/speech_utilities/talk_srv`**: Permite al robot hablar mediante texto a voz (TTS).  
  - Configurable en idioma, animaciones y espera de finalización del habla.
  - Utilizado por la función `talk`, que gestiona la interacción con este servicio.

#### **Servicios de reconocimiento de voz**
- **`/speech_utilities/speech2text_srv`**: Convierte el audio captado por el robot en texto.  
  - Permite definir la duración de la grabación (0 para detenerse automáticamente o un tiempo fijo).
  - Admite múltiples idiomas.
  - Devuelve una cadena de texto lista para ser procesada.

#### **Servicios de procesamiento de preguntas y respuestas**
- **`/speech_utilities/q_a_srv`**: Responde preguntas formuladas al robot en lenguaje natural.  
  - Se emplea para consultas específicas, como información sobre el robot o instrucciones.  
- **`/speech_utilities/answers_srv`**: Proporciona respuestas preformateadas a preguntas frecuentes, optimizando la interacción conversacional.

#### **Servicios de detección de palabras clave**
- **`/speech_utilities/hot_word_srv`**: Detecta palabras clave en el entorno.  
  - Permite activar comandos mediante frases específicas (ejemplo: "Hey, Pepper").

Task_module configura los proxies correspondientes para estos servicios, asegurando su disponibilidad con `rospy.wait_for_service` antes de cada uso. De esta manera, módulos como `gpsr.py` o `evento.py` pueden acceder a funciones de voz sin necesidad de gestionar directamente las conexiones a `speech_utilities`.

### 3.3 Manipulación y Movimiento (Manipulation)

Task_module centraliza los servicios de `manipulation_utilities` para controlar la postura y el movimiento del robot, permitiendo la manipulación de objetos y la orientación de la cabeza en diversas tareas.

#### **Servicios principales de manipulación**
- **`/manipulation_utilities/go_to_pose`**: Mueve al robot a poses predefinidas.  
  - Utilizado para adoptar posiciones específicas en interacciones o manipulación de objetos.  
  - Ejemplos de poses: `"tray"`, `"head_default"`, `"small_object_left_hand"`, entre otras.

- **`/manipulation_utilities/move_head`**: Ajusta la posición y orientación de la cabeza.  
  - Útil para centrar objetos en la visión o mejorar la interacción con personas.  

#### **Integración con otras funcionalidades**
- Funciones como `ask_for_object` y `give_object` combinan manipulación con servicios de voz, permitiendo que el robot solicite o entregue objetos de forma coordinada.
- Task_module garantiza que los servicios de manipulación estén correctamente inicializados y sincronizados para asegurar precisión en los movimientos.

#### **Tópicos relacionados**
- Aunque la manipulación se activa principalmente mediante servicios, Task_module también puede publicar en tópicos para:
  - Activar animaciones que complementen la acción física.
  - Notificar cambios de estado durante la ejecución de movimientos.

En conjunto, estos servicios permiten a Task_module controlar de manera centralizada la postura y la posición de las partes móviles del robot, facilitando la interacción física en diversas tareas.

### 3.4 Navegación (Navigation)

Task_module integra los servicios y tópicos de `navigation_utilities` para gestionar el movimiento del robot en su entorno, permitiendo la planificación de rutas, el seguimiento de personas y el control de giros.

#### **Servicios de ubicación y destino**
- **`/navigation_utilities/set_current_place_srv`**: Actualiza la ubicación actual del robot en el grafo de navegación.
- **`/navigation_utilities/get_absolute_position_srv`**: Obtiene las coordenadas absolutas del robot en el entorno.
- **`/navigation_utilities/go_to_place_srv`**: Envía al robot a un destino específico (por ejemplo, `"door"` o `"living_room"`).
- **`/navigation_utilities/go_to_relative_point_srv`**: Mueve al robot a una posición relativa a su ubicación actual, considerando orientación.

#### **Servicios de planificación y guía**
- **`/navigation_utilities/get_route_guidance_srv`**: Proporciona instrucciones paso a paso para llegar a un destino.
- **`/navigation_utilities/start_random_navigation_srv`**: Activa la exploración aleatoria del entorno.
- **`/navigation_utilities/add_place_srv`** y **`/navigation_utilities/add_place_with_coordinates_srv`**: Añaden nuevas ubicaciones al mapa, con o sin coordenadas específicas.

#### **Servicios de seguimiento y control del movimiento**
- **`/navigation_utilities/follow_you_srv`**: Permite que el robot siga a una persona detectada o un objetivo en movimiento.
- **`/navigation_utilities/robot_stop_srv`**: Detiene el movimiento del robot inmediatamente.
- **`/navigation_utilities/spin_srv`** y **`/navigation_utilities/go_to_defined_angle_srv`**: Controlan la rotación del robot, ya sea en modo de giro continuo o para alcanzar un ángulo específico.
- **`/navigation_utilities/constant_spin_srv`**: Ejecuta giros constantes, útil para búsqueda o reajuste de orientación.

#### **Tópicos relacionados**
Aunque la mayoría de la comunicación se realiza a través de servicios, Task_module se suscribe a tópicos que proporcionan:
- **Estado de navegación:** Información en tiempo real sobre la posición y el estado del movimiento del robot.

En conjunto, estos servicios y tópicos permiten a Task_module gestionar la navegación de manera centralizada, asegurando un desplazamiento eficiente y adaptativo en diferentes escenarios.


### 3.5 Pytoolkit

Task_module integra los servicios y tópicos de `pytoolkit` para controlar diversos aspectos del robot, incluyendo movimiento, postura, interacciones con la tablet y otros comportamientos avanzados.

#### **Servicios de control de movimientos y articulaciones (ALMotion)**
- **`/pytoolkit/set_stiffnesses_srv`**: Ajusta la rigidez de las articulaciones.  
  - *Proxy*: `self.motion_set_stiffnesses_srv`
- **`/pytoolkit/set_arms_security_srv`**: Configura medidas de seguridad para los brazos (*SetBool*).  
  - *Proxy*: `self.set_arms_security`
- **`/pytoolkit/move_head_srv`**: Mueve la cabeza del robot con precisión.  
  - *Proxy*: `self.setMoveHead_srv`
- **`/pytoolkit/toggle_get_angle_srv`** y **`/pytoolkit/set_angle_srv`**: Controlan el ángulo de las articulaciones y proporcionan feedback del sensor.  
  - *Proxies*: `self.toggle_get_angles_topic_srv`, `self.set_angles_proxy`
- **`/pytoolkit/navigate_to_srv`**: Ordena al robot moverse a una posición específica.  
  - *Proxy*: `self.Navigate_to_srv`
- **`/pytoolkit/enable_security_srv`**: Activa modos de seguridad en el movimiento.  
  - *Proxy*: `self.enable_security_proxy`
- **`/pytoolkit/set_security_distance_srv`**: Establece distancias de seguridad, incluyendo ajustes ortogonales y tangenciales.  
  - *Proxies*: `self.setDistance_srv`, `self.set_orthogonal_security_srv`, `self.set_tangential_security_srv`, `self.set_security_distance_proxy`

#### **Servicios de postura y seguimiento (ALRobotPosture & ALBasicAwareness)**
- **`/pytoolkit/go_to_posture_srv`**: Cambia la postura del robot a estados predefinidos (`"stand"`, `"rest"`).  
  - *Proxy*: `self.setRPosture_srv`
- **`/pytoolkit/set_move_arms_enabled_srv`**: Activa o desactiva el movimiento de los brazos durante tareas.  
  - *Proxy*: `self.setMoveArms_srv`
- **`/pytoolkit/set_awareness_srv`**: Controla el nivel de conciencia del robot (seguimiento activado/desactivado).  
  - *Proxy*: `self.awareness_proxy`

#### **Servicios de interacción con la tablet (ALTabletService)**
*(Aplicable a robots que no son tipo "orion")*
- **`/pytoolkit/show_web_view_srv`**: Muestra una página web en la tablet.
- **`/pytoolkit/show_image_srv`**: Muestra una imagen.
- **`/pytoolkit/hide_srv`**: Oculta el contenido de la pantalla.
- **`/pytoolkit/play_video_srv`**: Reproduce un video.
- **`/pytoolkit/show_topic_srv`** y **`/pytoolkit/show_words_srv`**: Muestran texto o palabras clave.
- **`/pytoolkit/show_picture_srv`**: Muestra imágenes predefinidas.

#### **Servicios de reconocimiento de voz y hot words**
- **`/pytoolkit/set_hot_word_language_srv`**: Configura el idioma para la detección de palabras clave.  
  - *Proxy*: `self.hot_word_language_srv`

#### **Servicios de autonomía y seguimiento (ALAutonomousLife & ALTracker)**
- **`/pytoolkit/set_state_srv`** (*ALAutonomousLife*): Activa o desactiva la vida autónoma del robot.  
  - *Proxy*: `self.autonomous_life_proxy`
- **`/pytoolkit/stop_tracker_srv`**, **`/pytoolkit/start_tracker_srv`**, **`/pytoolkit/start_follow_face_srv`**: Controlan el seguimiento de rostros y personas.  
  - *Proxies*: `self.stop_tracker_proxy`, `self.start_tracker_proxy`, `self.start_follow_face_proxy`

#### **Servicios de control de animaciones y respiración**
- **`/pytoolkit/toggle_breathing_srv`**: Activa o desactiva la animación de respiración del robot.  
  - *Proxy*: `self.toggle_breathing_proxy`

---

### **Tópicos de Pytoolkit**
Además de los servicios, Task_module utiliza tópicos de `pytoolkit` para comunicación en tiempo real.

#### **Movimiento y orientación**
- **Publicador en `/pytoolkit/ALMotion/move`**:  
  - Envía mensajes de tipo `Twist` para controlar la velocidad lineal y angular del robot durante el movimiento.
- **Suscriptor a `/pytoolkit/ALMotion/get_angles`**:  
  - Recibe mensajes de tipo `set_angles_msg` con información sobre el ángulo actual de las articulaciones, útil para ajustar la orientación de la cabeza o centrar etiquetas detectadas.

### **Resumen**
La integración de `pytoolkit` en Task_module permite gestionar de manera centralizada:
- Movimientos y seguridad de las articulaciones.
- Cambios de postura y seguimiento de personas.
- Interacción visual con la tablet del robot.
- Reconocimiento de palabras clave y configuración de voz.
- Control de autonomía, animaciones y respiración.

Todos los servicios son gestionados mediante `rospy.wait_for_service` para garantizar su disponibilidad antes de su ejecución, y los tópicos proporcionan retroalimentación en tiempo real para mejorar la precisión de las acciones del robot.

# 4. Funciones dentro del Task Module usando los servicios de arriba

En esta sección se describen las funciones de alto nivel dentro de `Task_module` que realizan lógica adicional, como cálculos, bucles, temporizaciones, ejecución en hilos y coordinación entre módulos. Estas funciones van más allá de simplemente llamar a un proxy de servicio.

## Inicialización y configuración

### `initialize_pepper()`
Configura los parámetros iniciales del robot según los módulos activos. Enciende la cámara, inicia el reconocimiento y, si se usa `pytoolkit`, ajusta la postura y los parámetros de seguridad.

### `turn_camera(camera_name, command, resolution, fps)`
Configura la cámara, incluyendo resolución y FPS, y guarda las dimensiones asignadas. También realiza una comprobación de aprobación del servicio.

## Procesamiento de imágenes y reconocimiento

### `publish_filtered_image(filter_name, camera_name)`
Solicita una imagen filtrada y devuelve la respuesta aprobada, integrando lógica de error y temporización.

### `start_recognition(camera_name)`
Inicia el reconocimiento para una cámara específica y revisa el estado aprobado.

## Detección de objetos y personas

### `get_all_items(place="")`
- Ajusta la postura a `stand`.
- Rota la cabeza en distintos ángulos con temporizaciones para capturar imágenes.
- Construye un prompt para GPT Vision y procesa la respuesta con la lista de objetos detectados.

### `find_item_with_characteristic(class_type, characteristic, place="")`
- Similar a `get_all_items`, rota la cabeza y ajusta la postura.
- Construye un prompt adaptado según color, tamaño, posición o descripción.
- Analiza la respuesta para identificar el objeto buscado.

### `get_person_gesture()`
Ubica al robot en `stand` y usa GPT Vision para determinar el gesto de la persona en la imagen.

### `search_for_specific_person(class_type, specific_characteristic, true_check=False)`
- Ajusta la postura y rota la cabeza en distintos ángulos.
- Usa el servicio de búsqueda de personas y centra la cabeza en cada detección.
- Si `true_check` es `True`, valida características como nombre, gesto o color de ropa mediante `q_a` o `img_description`.

## Interacción y espera de eventos

### `wait_for_head_touch(timeout, message, message_interval, language)`
- Inicia un bucle de espera basado en un timeout.
- Mientras espera, emite mensajes de voz periódicos mediante `talk`.
- Sale del bucle si se detecta el toque o se alcanza el tiempo límite.

### `wait_for_arm_touch(timeout, message, message_interval, language, arm)`
- Similar a `wait_for_head_touch`, pero verifica toques en el brazo o brazos.
- Coordina la repetición de mensajes hasta que se detecte la interacción o se agote el tiempo.

### `wait_for_object(timeout)`
- Se suscribe al tópico de detección de objetos.
- Retorna `True` si se detecta un objeto dentro del tiempo indicado o `False` si se alcanza el timeout.

## Seguimiento de objetos y personas

### `find_object(object_name, timeout, ignore_already_seen)`
- Rota la cabeza en múltiples ángulos mientras ejecuta `look_for_object`.
- Centra la vista en el objeto detectado y sale del bucle.

### `count_objects(object_name)`
- Captura imágenes desde distintos ángulos y envía un prompt a GPT Vision para contar las ocurrencias del objeto.
- Acumula el total detectado en la escena.

### `yolo_awareness_srv_thread(label, speed=0.1)`
- Funciona en un hilo independiente.
- Mientras `yolo_awareness_active` esté activo, calcula el ángulo de la etiqueta detectada y ajusta el movimiento del robot mediante `set_angles_srv`.

### `follow_you_srv_thread(speed, awareness, avoid_obstacles)`
- Funciona en un hilo dedicado al seguimiento.
- Calcula la velocidad lineal y angular según la posición y el tamaño de la persona detectada mediante `closest_person`.
- Evita obstáculos y ajusta la distancia en tiempo real.

### `follow_you(speed, awareness, avoid_obstacles, rotate)`
- Activa (o no) el modo `yolo awareness`.
- Lanza los hilos `follow_you_srv_thread` y `get_closer_person`.
- Coordina interacciones de voz y permite activar `rotate` para girar hasta recibir una señal de reanudación.

### `calibrate_follow_distance(max_width, min_width)`
- Entra en un bucle de calibración donde analiza el ancho de la persona en la imagen.
- Emite mensajes de voz hasta que la distancia sea adecuada.

## Alineación y movimiento del robot

### `center_head_with_label(label_info, height, resolution, desfase)`
- Calcula el ángulo de la cabeza basado en la posición de la etiqueta detectada.
- Convierte coordenadas de píxeles a grados y mueve la cabeza con `set_angles_srv`.

### `center_object(object_name, movement_mode)`
- Lanza un hilo para actualizar la posición del objeto.
- Dependiendo de `movement_mode`, ajusta la posición del robot para centrar el objeto en la imagen.

### `align_with_object(object_name)`
- Usa datos del tópico de etiquetas para alinear el robot con el objeto.
- Coordina llamadas a `go_to_relative_point` hasta lograr la alineación precisa.

### `go_to_place(place_name, graph, wait, lower_arms)`
- Solicita la navegación al destino y espera su finalización con `wait_go_to_place`.
- Actualiza `last_place` y `current_place`, y ajusta la postura si `lower_arms` está activado.

### `wait_go_to_place()`
- Se suscribe al feedback de navegación y espera hasta que la navegación se complete exitosamente.

### `start_moving(x, y, rotate)` y `stop_moving()`
- Publican mensajes de velocidad (`Twist`) para controlar el movimiento del robot.

### `go_back()`
- Usa `go_to_place` para regresar a la última posición conocida (`last_place`).

## Herramientas de manipulación y animación

### `motion_tools_service()` y `enable_breathing_service()`
- Habilitan servicios de manipulación y animaciones (como respiración) según la configuración del sistema.

### `head_srv_thread(head_position)` y `posture_srv_thread(posture)`
- Ejecutan hilos para mantener la posición de la cabeza o la postura del robot, contrarrestando vibraciones o movimientos inesperados.

### `ask_for_object(object_name)` y `give_object(object_name)`
- Coordina acciones de manipulación y comunicación, combinando voz, posturas de agarre y temporizaciones.

## Funciones de PyToolkit
Estas funciones permiten coordinar interacciones visuales y motrices del robot:
- `show_topic`, `show_image`, `show_video`
- `hide_tablet`, `show_web_view`
- `play_animation`
- `set_angles_srv`
- `set_autonomous_life`
- `set_security_distance`
- `set_move_arms_enabled`
- `setLedsColor`
- `gen_anim_msg`

## Conclusión
Cada una de estas funciones integra lógica adicional para la ejecución de tareas complejas, como:
- Bucle de iteraciones y temporización.
- Cálculos de posición y ajustes dinámicos.
- Coordinación entre múltiples módulos (percepción, habla, navegación, manipulación, PyToolkit).
- Ejecución de tareas concurrentes mediante hilos (`thread`).

Por ejemplo:
- `yolo_awareness_srv_thread` ajusta dinámicamente la orientación del robot según la posición del objeto detectado.
- `follow_you` y `follow_you_srv_thread` combinan percepción, navegación y comunicación para seguir a una persona mientras evitan obstáculos.

Estas funciones permiten que el robot ejecute comportamientos autónomos de manera más eficiente y dinámica.

## 5. Ejemplo de uso

A continuación se muestra un ejemplo sencillo de una tarea usando el `Task_module`. En esta tarea, el robot realiza lo siguiente:

1. Inicializa los servicios de percepción, habla, manipulación, navegación y pytoolkit.
2. Activa la cámara frontal y el reconocimiento.
3. Saluda al usuario y espera a que toque la cabeza para iniciar la tarea.
4. Busca un objeto (por ejemplo, "pelota") usando la percepción.
5. Si se encuentra la pelota, el robot informa por voz, navega hasta la mesa y pide que se le pase la pelota (usando una función de manipulación).
6. Finalmente, regresa a la posición inicial y anuncia que la tarea se ha completado.

### Código de ejemplo
```python 
#!/usr/bin/env python3
import rospy
from task_module import Task_module

def main_task():
    # Se crea una instancia del Task_module con todos los servicios habilitados
    tm_obj = Task_module(perception=True, speech=True, manipulation=True, navigation=True, pytoolkit=True)
    
    # Inicializa el nodo con el nombre de la tarea (asumiendo que se implementa internamente)
    tm_obj.initialize_node("SimpleFetchTask")
    
    # Activa la cámara frontal y el reconocimiento
    tm_obj.turn_camera("front_camera", command="custom", resolution=2, fps=15)
    tm_obj.start_recognition("front_camera")
    
    # Saluda e informa al usuario del inicio de la tarea
    tm_obj.talk("Hola, voy a empezar mi tarea.", language="Spanish", wait=True)
    tm_obj.talk("Por favor, toca mi cabeza para comenzar.", language="Spanish", wait=False)
    
    # Espera a que el usuario toque la cabeza (hasta 20 segundos)
    if tm_obj.wait_for_head_touch(timeout=20, message="Toca mi cabeza para iniciar", message_interval=5, language="Spanish"):
        tm_obj.talk("Gracias, iniciaré la búsqueda de la pelota.", language="Spanish", wait=True)
    else:
        tm_obj.talk("No recibí señal, deteniendo la tarea.", language="Spanish", wait=True)
        return
    
    # Busca la pelota utilizando los servicios de percepción
    found_ball = tm_obj.look_for_object("pelota", ignore_already_seen=False)
    if found_ball:
        tm_obj.talk("He encontrado la pelota", language="Spanish", wait=True)
    else:
        tm_obj.talk("No pude encontrar la pelota", language="Spanish", wait=True)
        return
    
    # Navega hasta la mesa
    tm_obj.talk("Voy a la mesa", language="Spanish", wait=True)
    if tm_obj.go_to_place("table", graph=1, wait=True, lower_arms=True):
        tm_obj.talk("He llegado a la mesa", language="Spanish", wait=True)
    else:
        tm_obj.talk("No pude llegar a la mesa", language="Spanish", wait=True)
        return

    # Usa la manipulación para pedir que le pasen la pelota
    tm_obj.talk("Por favor, dame la pelota", language="Spanish", wait=True)
    if tm_obj.ask_for_object("pelota"):
        tm_obj.talk("Gracias, pelota recibida", language="Spanish", wait=True)
    else:
        tm_obj.talk("No pude recibir la pelota", language="Spanish", wait=True)
    
    # Regresa a la posición inicial
    tm_obj.go_back()
    tm_obj.talk("Tarea completada, volviendo a la posición inicial", language="Spanish", wait=True)

if __name__ == "__main__":
    rospy.init_node("simple_fetch_task")
    main_task()
    rospy.spin()
```

### Herramientas utilizadas en el ejemplo

En este ejemplo se combinan distintas herramientas:

- **Percepción**: Se utiliza para encender la cámara, iniciar el reconocimiento y buscar la "pelota".
- **Habla**: Para saludar, dar instrucciones y confirmar acciones.
- **Navegación**: Para desplazarse a la ubicación `"table"` y volver a la posición inicial.
- **Manipulación**: Para simular la acción de pedir el objeto (pelota).

Este código es un ejemplo sencillo que integra varias capacidades del robot usando el `Task_module`. Puedes ampliarlo o modificarlo según las implementaciones concretas de cada función en tu proyecto.

