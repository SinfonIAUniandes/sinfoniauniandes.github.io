# 👋 ¡Bienvenid@ al equipo de SinfonIA!  

En esta sección vas a dar tus primeros pasos en SinfonIA. Te enseñaremos algunos de los conceptos básicos que necesitarás en esta nueva aventura.  

---

## Introducción  

En esta página, obtendrás una visión general de cómo operan nuestros robots, Opera y Nova, y las herramientas asociadas al equipo. Además, te facilitaremos los pasos esenciales para que comiences a trabajar, aprender e interactuar efectivamente con los robots y las herramientas.  

Al concluir tu visita a esta página, tendrás un claro entendimiento de los principios de desarrollo que rigen nuestro equipo. Finalmente, estarás listo para dar el siguiente paso: instalar las herramientas básicas necesarias para tu participación activa.  

Si te queda alguna duda sobre estos conceptos, no dudes en preguntarle a tu equipo.  

---

## Conceptos Básicos de SinfonIA  

### Herramientas  

SinfonIA está formada por múltiples herramientas que facilitan el desarrollo individual y modular de diversas capacidades del robot. Esto significa que cada herramienta se desarrolla de manera independiente, sin interferir con las demás.  

A continuación, te damos una breve explicación de cada herramienta:  

#### Navigation  
Permite que el robot pueda “caminar” o rodar por su entorno de manera fluida, autónoma y segura.  

#### Manipulation  
Facilita la interacción del robot con su entorno mediante el movimiento de sus extremidades, como brazos y cabeza.  

#### Speech  
Le da al robot capacidades conversacionales para escuchar, comprender y responder en conversaciones.  

#### Vision  
Proporciona reconocimiento visual a través de cámaras y sensores para identificar objetos, personas y lugares.  

#### Interface  
Mejora la interacción con el robot mediante herramientas web, permitiendo su control desde su tablet o dispositivos conectados.  

#### Task  
Funciona como el núcleo que integra todas las herramientas de SinfonIA, asegurando su correcto funcionamiento en conjunto.  

### Conceptos Básicos sobre SinfonIA  

- **Herramientas:** Grupos de trabajo especializados en diferentes habilidades del robot (manipulación, navegación, visión, etc.).  
- **Correr las herramientas:** Ejecutar nodos específicos de cada herramienta.  
- **Nova y Opera:** Son nuestros dos robots de tipo Pepper.  

Si te confunden algunos conceptos, ¡no te preocupes! Puedes regresar a esta sección cuando lo necesites.  

---

## ROS (Robot Operating System)  

ROS es un marco de software de código abierto utilizado ampliamente en robótica. Proporciona herramientas y bibliotecas necesarias para la comunicación entre procesos y la gestión de dispositivos hardware.  

💫 ROS es como un director de orquesta que coordina los movimientos y acciones de todas las partes del robot para que trabajen en armonía.  

### Conceptos Básicos de ROS  

- **Paquete:** Unidad fundamental de organización en ROS, que contiene scripts, librerías y ejecutables.  
  💫 Un paquete es como una caja de LEGO, que trae piezas e instrucciones para añadir una nueva habilidad al robot.  
- **Nodo:** Proceso que realiza una función específica, como leer un sensor o controlar un motor.  
- **Mensaje:** Estructura de datos utilizada para la comunicación entre nodos.  
- **Tópico:** Canal de comunicación donde los nodos publican o reciben mensajes.  
- **Servicio:** Permite la interacción entre nodos en un modelo de solicitud-respuesta.  

💫 ROS es como una ciudad donde las casas son los nodos, los tópicos son el servicio de correos y los servicios son como pedir comida por Rappi.  

---

## Workspace  

Un workspace de ROS es un espacio de trabajo que utiliza la herramienta de compilación Catkin.  

💫 Es como tu mochila de estudio, donde llevas todos los materiales necesarios organizados para cada clase.  

### Contenido general del Workspace  

- **Src:** Contiene el código fuente de los paquetes ROS.  
- **Build:** Guarda archivos de compilación generados por Catkin.  
- **Devel:** Contiene los archivos ejecutables y librerías resultantes de la compilación.  

💫 Construir un workspace es como ensamblar un avión con un kit:  
1. **Src** tiene las instrucciones.  
2. **Build** organiza las herramientas.  
3. **Devel** ensambla el modelo final listo para usarse.  

![image](https://github.com/user-attachments/assets/c589448d-17c8-45e7-a3cb-87109934752e)

---

💡 **TIP:** Siempre que abras una nueva terminal, asegúrate de cargar tu workspace con:  

```bash
source ~/nombre_de_tu_workspace/devel/setup.bash
```

¡Con esto estás listo para dar tus primeros pasos en SinfonIA! 🚀