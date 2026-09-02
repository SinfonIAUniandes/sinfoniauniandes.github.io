# 🗺️ Módulo de Navegación 🚀  

Bienvenido a la sección de **Navegación**, donde exploraremos cómo el **módulo `NavigationUtilities.py`** trabaja para calcular rutas, analizar grafos y permitir que nuestro robot se desplace de manera eficiente. 🦾  

---

## 🔍 ¿Cuál es el rol de `NavigationUtilities.py`?  
Este archivo es el **cerebro** de la navegación:  
✅ Construye y analiza grafos de navegación.  
✅ Coordina la búsqueda de rutas óptimas.  
✅ Se conecta con otros módulos para procesar y formatear los resultados.  

En resumen, es el **orquestador** que hace que todo el sistema de navegación cobre vida. 🎭  

---

## ⚙️ ¿Cómo funciona?  

### 1️⃣ Construcción del grafo 📌  
Para crear la representación del mapa, `NavigationUtilities.py` utiliza dos módulos clave:  

- 🏗️ **`NavigationGraph.py`** → Implementación genérica para manejar grafos.  
- 🏠 **`NavigationGraphLocal.py`** → Versión optimizada para entornos simulados o específicos.  

Dependiendo del contexto, se elige cuál usar.  

---

### 2️⃣ Interfaz de usuario y visualización 👀  
No basta con calcular una ruta, también hay que presentarla bien. Aquí entra:  

- 🖥️ **`ConsoleFormatter.py`** → Formatea los resultados para mostrar rutas de manera clara en la consola.  

Este módulo nos dice, por ejemplo:  
> "Para llegar de A a B, sigue este camino: A → C → D → B"  

---

### 3️⃣ Adaptaciones para entornos locales 🏡  
Algunas configuraciones pueden cambiar si estamos en un entorno con restricciones específicas. Para eso usamos:  

- ⚙️ **`NavigationUtilitiesLocal.py`** → Ajustes especiales según el entorno.  

Ejemplo: si estamos en una simulación con reglas particulares, este módulo adapta la navegación sin afectar el resto del sistema.  

---

## 🔄 Flujo de interacción entre los módulos  

Cuando queremos encontrar la **ruta más corta** entre dos puntos, los pasos son:  

1️⃣ **Se invoca `NavigationUtilities.py`** con los puntos de inicio y destino.  
2️⃣ **Se selecciona el módulo de grafo adecuado** (`NavigationGraph.py` o `NavigationGraphLocal.py`).  
3️⃣ **Se ejecuta un algoritmo de búsqueda** (como A* o Dijkstra).  
4️⃣ **Se envía el resultado a `ConsoleFormatter.py`** para mostrarlo en la consola.  
5️⃣ **Si es necesario, `NavigationUtilitiesLocal.py` ajusta el resultado** para un entorno particular.  


---

## 🤖 Integración con ROS  

El módulo `NavigationUtilities.py` no solo se encarga del cálculo de rutas y el análisis de grafos, sino que también actúa como un **nodo ROS** que gestiona la comunicación con otros componentes del sistema.  

### 🛰️ 1️⃣ Rol del Nodo `NavigationUtilities.py`  
Este nodo es el **centro de la navegación**, permitiendo que el robot interactúe con otros módulos mediante:  

🔹 **Servicios ROS** → Para recibir peticiones de navegación (ej. moverse a un punto, seguir a una persona, etc.).  
🔹 **Tópicos ROS** → Para publicar y recibir información sobre la posición, estados y comandos de movimiento.  

---

## 🛠️ 2️⃣ Servicios Ofrecidos  

Dentro del constructor (`__init__`) de `NavigationUtilities.py`, se configuran múltiples servidores de servicio en ROS. Algunos de los más importantes son:  

📍 **`set_current_place_srv`** → Define la posición actual del robot en el mapa.  
📍 **`go_to_relative_point_srv`** → Ordena un movimiento hacia un punto relativo al robot.  
📍 **`go_to_place_srv`** → Calcula y ejecuta la ruta hacia un lugar específico.  

   - Puede usar un **grafo de navegación** para encontrar la mejor ruta (`nx.shortest_path`).  

📍 **`start_random_navigation_srv`** → Inicia un desplazamiento aleatorio del robot.  
📍 **`add_place_srv` / `add_place_with_coordinates_srv`** → Agrega lugares al mapa.  
📍 **`follow_me_srv` / `follow_you_srv`** → Activa el modo de seguimiento de personas.  
📍 **`robot_stop_srv`** → Detiene al robot en caso de emergencia.  
📍 **`spin_srv` / `constant_spin_srv`** → Ejecuta giros puntuales o continuos.  
📍 **`go_to_defined_angle_srv`** → Ajusta la orientación del robot a un ángulo específico.  
📍 **`get_absolute_position_srv`** → Obtiene la posición absoluta del robot.  
📍 **`get_route_guidance_srv`** → Proporciona guía de ruta en tiempo real.  

Cada servicio tiene un **callback asociado** que procesa la petición, realiza validaciones y ejecuta la acción requerida. Además, `ConsoleFormatter.py` se encarga de mostrar mensajes de estado en la consola.  

---

## 📡 3️⃣ Tópicos a los que se Publica  

`NavigationUtilities.py` crea varios **publicadores** (`rospy.Publisher`) para emitir mensajes en ROS:  

📢 **`/navigation_utilities/complete_feedback`** → Feedback detallado sobre el estado de la navegación.  
📢 **`/initialpose`** → Publica la posición inicial estimada del robot (útil para AMCL).  
📢 **`/cmd_vel`** → Envía comandos de velocidad (Twist) para mover al robot.  
📢 **`/special_settings`** → Ajustes especiales del sistema, como cambiar estados del robot.  

También puede enviar mensajes rápidos a **`/navigation_utilities/simple_feedback`** para reportar eventos importantes.  

---

## 🎯 4️⃣ Tópicos a los que se Suscribe  

`NavigationUtilities.py` **escucha información en tiempo real** de ciertos tópicos ROS:  

📥 **`/amcl_pose`** → Recibe la posición estimada del robot (`PoseWithCovarianceStamped`).  
   - Información clave para calcular rutas y verificar la ubicación del robot.  
📥 Otros tópicos potenciales:  
   - **Odometría y sensores** → Para detectar obstáculos y mejorar la navegación.  
   - **Mapas de costos (`costmaps`)** → Para ajustar rutas dinámicamente.  

---

## 🔄 5️⃣ Flujo General de Ejecución  

1️⃣ **Inicialización:** Se configura el nodo ROS, se instancian los servicios y suscriptores, y se carga el grafo de navegación.  
   - Dependiendo del entorno, se usa `NavigationGraph` o `NavigationGraphLocal`.  

2️⃣ **Operación en tiempo real:**  
   - Se espera una petición de servicio.  
   - Se valida la información (ej. si el destino existe en el grafo).  
   - Se calcula la ruta y se envían comandos de movimiento (`/cmd_vel`).  
   - Se publica feedback en `/navigation_utilities/complete_feedback`.  

3️⃣ **Interacción con otros nodos:**  
   - La publicación en `/initialpose` y otros tópicos permite que herramientas externas visualicen el estado del robot.  



## ROS Navigation Stack y su Rol en navigation_utilities / pepper_2dnav

El ROS Navigation Stack es un conjunto integrado de nodos, librerías y herramientas diseñadas para permitir la navegación autónoma de robots en entornos dinámicos y estáticos. En este stack se combinan varios componentes esenciales:

- **Localización:** Con nodos como AMCL (Adaptive Monte Carlo Localization), que permiten al robot estimar su posición dentro de un mapa predefinido.
- **Planeación Global:** Con herramientas como el `move_base` que, utilizando costmaps globales, genera rutas desde la posición actual hasta un objetivo, teniendo en cuenta obstáculos y límites del entorno.
- **Planeación Local:** Donde se emplean planificadores como el DWA (Dynamic Window Approach) para generar trayectorias de corto plazo que respeten las limitaciones cinemáticas del robot.
- **Fusión de Sensores:** Con utilidades como `depthimage_to_laserscan` y nodos para fusionar datos de múltiples sensores, de modo que el robot disponga de una percepción precisa y en tiempo real de los obstáculos circundantes.

En el contexto de **navigation_utilities** y la configuración de **pepper_2dnav**, el ROS Navigation Stack se adapta y configura de la siguiente manera:

1. **Integración de Módulos:**  
   - La herramienta **navigation_utilities** actúa como un componente central, ofreciendo servicios ROS para recibir peticiones de navegación, calcular rutas a partir de un grafo generado y proporcionar retroalimentación en tiempo real.
   - Esta utilidad se integra con el resto de nodos del Navigation Stack (AMCL, move_base y componentes de SLAM) para garantizar una operación coordinada.

2. **Configuración Específica de pepper_2dnav:**  
   - **Archivos de Launch y Parámetros:** El paquete *pepper_2dnav* incluye varios archivos de lanzamiento (como `pepper_depth_2dnav.launch`, `move_base.launch` y `amcl.launch`) que activan y configuran los nodos necesarios del Navigation Stack.  
   - **Costmaps y Planificadores:** Los archivos YAML ubicados en el directorio `param/` definen los parámetros para los costmaps (global y local) y los planificadores (como el DWA y otros) adaptados a las características del robot Pepper, garantizando así una navegación segura y eficiente.
   - **Sensorización y Fusión de Datos:** Gracias a la integración del paquete `depthimage_to_laserscan` y la configuración de la fusión de láseres en `laser_merger.launch`, el sistema aprovecha al máximo los datos de los sensores para monitorear y responder ante el entorno.

3. **Beneficios de la Integración:**  
   - La unión del ROS Navigation Stack con navigation_utilities facilita una arquitectura modular y escalable, en la que los servicios y nodos trabajan conjuntamente para realizar tareas de localización, planeación y ejecución de rutas de forma robusta.
   - Además, se pueden ajustar parámetros de forma centralizada para adaptar el comportamiento del robot a diferentes entornos (por ejemplo, interiores o espacios abiertos), lo que resulta crucial para aplicaciones reales y simulaciones en Pepper.

Esta integración no solo potencia la capacidad de navegación autónoma del robot, sino que también simplifica su despliegue y mantenimiento, al permitir una configuración clara y estructurada de cada uno de los componentes del stack.


---

## 🏁 Conclusión  

🚀 `NavigationUtilities.py` es el **núcleo del sistema de navegación** del robot.  
🔗 Se comunica con otros módulos mediante **servicios** y **tópicos ROS**.  
📌 Su diseño modular lo hace **escalable y adaptable** a diferentes entornos.  

¡Con este sistema, nuestro robot puede moverse de manera autónoma y eficiente! 🦾✨  