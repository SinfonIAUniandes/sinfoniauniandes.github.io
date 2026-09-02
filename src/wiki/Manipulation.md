# Manipulation Utilities 🚀🤖

Bienvenido a la página de **Manipulation Utilities**, un paquete **ROS** diseñado para que Pepper mueva sus brazos, cabeza y ejecute acciones predefinidas con precisión. 🦾✨  
Si alguna vez quisiste que tu robot hiciera poses elegantes, saludara con estilo o alcanzara objetos con precisión, ¡este paquete es para ti!  

---

## 🖥️ Interfaz de Usuario e Instrucciones  

Para empezar a usar `manipulation_utilities`, sigue estos pasos:  

1️⃣ **Crea un espacio de trabajo ROS** y clona el repositorio.  
2️⃣ **Compila** con `catkin_make`.  
3️⃣ **Carga las variables de entorno** con `source devel/setup.bash`.  
4️⃣ **Ejecuta los servicios** con comandos como:  
   ```bash
   rosservice call /manipulation_utilities/go_to_state "wave"
   ```

## 🛠️ Códigos Fuente y Funcionalidad Principal  

El paquete `manipulation_utilities` se basa en un nodo principal y varias funciones auxiliares que permiten controlar la manipulación del robot.  

### 🎨 `ConsoleFormatter.py`  
📢 Este módulo mejora la visualización de mensajes en la consola usando colores ANSI.  
- 🔴 **Errores** en rojo.  
- 🟡 **Advertencias** en amarillo.  
- 🟢 **Éxitos** en verde.  

### 🔧 `manipulation_utilities.py` (Nodo Principal)  
El corazón del paquete. Este nodo maneja los servicios de manipulación del robot y coordina los movimientos.  

#### 🏗️ a. **Inicialización y Configuración**  

Cuando el nodo se inicia:  
✅ Se registra en ROS bajo el nombre `ManipulationPyServices`.  
✅ Se definen listas con nombres de **juntas** (brazos, manos, cabeza y cadera).  
✅ Se configuran servicios ROS:  
   - **`go_to_pose`** 🏋️‍♂️: Ejecuta una pose específica según un archivo de referencia.  
   - **`play_action`** 🎭: Realiza secuencias de movimiento.  
   - **`grasp_object`** 🤲: Ajusta la postura del robot para agarrar objetos.  
   - **`move_head`** 👀: Permite mover la cabeza del robot con control de seguridad.  
✅ Se establecen clientes ROS para conectar con `PyToolkit` y ejecutar movimientos reales.  

#### 🤖 b. **Inicialización del Robot**  

Antes de mover a Pepper, el nodo se asegura de que todo esté listo:  
⚙️ Se **desactivan** funciones de vida autónoma para evitar movimientos inesperados.  
💪 Se **activa** la rigidez de las juntas, asegurando que los movimientos sean precisos.  

#### 📡 c. **Implementación de los Servicios (Callbacks)**  

💾 **`callback_go_to_pose`** 📍  
- Recibe el nombre de una pose y la velocidad de movimiento.  
- Consulta `objects_poses.csv` para obtener los ángulos necesarios.  
- Envía los comandos a las juntas correctas usando `set_angle_srv`.  

🎬 **`callback_play_action`** 🎭  
- Define secuencias de movimientos con múltiples pasos.  
- Para cada paso, mueve ciertas juntas y espera un breve intervalo (`rospy.sleep`).  
- Permite ejecutar gestos como **saludar, señalar o levantar los brazos**.  

🛍️ **`callback_grasp_object`** ✋  
- Identifica el tipo de objeto a agarrar según listas predefinidas.  
- Ajusta la pose del robot con `go_to_pose` para una postura adecuada.  
- Puede usarse para agarrar objetos pequeños, tazones o realizar gestos específicos.  

👀 **`callback_move_head`** 🔄  
- Convierte los ángulos de grados a radianes (formato requerido por ROS y la API de Pepper).  
- Verifica que los valores estén dentro de los límites seguros.  
- Llama al servicio `set_angle_srv` para ajustar la inclinación y orientación de la cabeza.  

#### 🚀 d. **Ejecución Principal**  

El código principal sigue la estructura estándar de un nodo ROS:  
1️⃣ Se **instancia** la clase de manipulación.  
2️⃣ Se **muestra un mensaje de inicialización**.  
3️⃣ Se **mantiene el nodo activo** con `rospy.spin()`, permitiendo que el robot reciba comandos en cualquier momento.  

---

## 🔥 Resumen  

El paquete `manipulation_utilities` facilita la manipulación de Pepper en ROS mediante servicios bien estructurados. Con este sistema, el robot puede:  
✅ Moverse con precisión a **poses predefinidas**.  
✅ Ejecutar **acciones complejas** como saludar o señalar.  
✅ Agarrar objetos con una postura adecuada.  
✅ Controlar su cabeza para mirar en diferentes direcciones.  

Con estas herramientas, Pepper no solo se mueve... ¡sino que lo hace con estilo! 🚀🤖✨  

## 🚀 Integración con MoveIt para Manipulación Avanzada

Para ampliar las capacidades de manipulación del robot Pepper, puedes integrar `manipulation_utilities` con [MoveIt](https://moveit.ai/), un poderoso framework de planificación de movimiento en ROS. MoveIt permite controlar brazos robóticos de manera eficiente, evitando obstáculos y calculando trayectorias óptimas. 🤖✨

---

### 🔍 ¿Qué es MoveIt?

[MoveIt](https://moveit.ai/) es una plataforma de código abierto que proporciona herramientas para:

✅ **Planificación de movimiento**: Genera trayectorias fluidas y seguras para el robot.  
✅ **Percepción 3D**: Usa sensores para entender el entorno.  
✅ **Cinemática**: Resuelve problemas de movimiento del robot.  
✅ **Control y navegación**: Coordina y ejecuta movimientos de manera precisa.  

📌 Puedes aprender más sobre MoveIt en la [documentación oficial](https://moveit.github.io/moveit_tutorials/doc/getting_started/getting_started.html).  

---

### 🤔 ¿Qué es la Cinemática Inversa?

La **cinemática inversa (IK)** permite calcular las posiciones de las articulaciones del robot para que su efector final (como la mano de Pepper) alcance una ubicación deseada. 🔄  

Ejemplo: Si quieres que Pepper agarre un objeto en la mesa, la cinemática inversa calcula los ángulos de cada articulación para que la mano llegue al punto exacto. 🖐️📦  

🎥 Mira este video sobre cinemática inversa:  
[![Cinemática inversa explicada](https://img.youtube.com/vi/nq4l4Z0_wG8/0.jpg)](https://www.youtube.com/watch?v=nq4l4Z0_wG8)

---

### 🔄 Transformaciones Espaciales con TF

En ROS, el paquete **tf** permite rastrear y gestionar transformaciones entre sistemas de coordenadas. Esto es crucial para saber **dónde está cada parte del robot** en relación con su entorno. 🌍📍  

Ejemplo:  
- 🦿 Saber la posición de la mano en relación con la base del robot.  
- 🧠 Coordinar movimientos basados en la ubicación de objetos detectados.  

📖 Más información sobre **tf** en la [wiki de ROS](http://wiki.ros.org/tf).  

---

### 📂 Recursos Adicionales

Si quieres llevar la manipulación de Pepper al siguiente nivel, revisa el repositorio de investigación:  

🔗 [manipulation_utilities_research](https://github.com/SinfonIAUniandes/manipulation_utilities_research)  

Aquí encontrarás ejemplos avanzados de integración con MoveIt y herramientas adicionales para mejorar la manipulación del robot. 🚀🤖  

💡 **Con MoveIt, tu robot podrá realizar tareas de manipulación más complejas y precisas. ¡Explora sus posibilidades!** 🔥  

