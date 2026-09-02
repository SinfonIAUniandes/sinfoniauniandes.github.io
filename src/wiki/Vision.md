# 👀 Vision - Módulo de Visión

Bienvenido al sistema de visión de SinfonIA. El paquete **ROS Noetic** [`vision_utilities`](https://github.com/SinfonIAUniandes/vision_utilities) concentra las capacidades visuales del robot: lectura de códigos QR, detección de objetos, landmarks de cara, pose y manos, descripción de imágenes con un VLM y detección de tablero de ajedrez.

Puede correr sobre las cámaras de **Pepper** o sobre una webcam local (`usb_cam`).

---

## 📦 ¿Qué hace `vision_utilities`?

El nodo `vision_utilities.py` inicializa ROS, elige la cámara y registra los servicios de reconocimiento.

- Con **Pepper** (`with_pepper: true`) se suscribe a `/robot_toolkit_node/camera/front/image_raw` y, si está disponible, usa `/robot_toolkit/vision_tools_srv` para abrir la cámara frontal.
- En **modo local** se suscribe a `/usb_cam/image_raw`.

Los servicios pesados de IA (MediaPipe, YOLO, ajedrez) solo se cargan si `ia: true` en la configuración.

---

## 🛠️ Instalación

Clona el paquete y los mensajes que necesita en el `src` de un workspace Catkin:

```bash
cd ~/catkin_ws/src
git clone git@github.com:SinfonIAUniandes/vision_utilities.git
git clone git@github.com:SinfonIAUniandes/robot_toolkit_msgs.git
git clone git@github.com:SinfonIAUniandes/perception_msgs.git
```

Instala dependencias de Python según el caso:

```bash
# Todas las funcionalidades
pip install -r all_requirements.txt

# IA (MediaPipe, Ultralytics, etc.)
pip install -r requirements_ai.txt

# Uso básico, sin modelos pesados
pip install -r requirements_basic.txt
```

Compila el workspace:

```bash
cd ~/catkin_ws
catkin_make
source devel/setup.bash
```

---

## 📷 Cámara local (`usb_cam`)

Si no estás en Pepper, publica la webcam con el paquete estándar de ROS:

```bash
sudo apt update
sudo apt install ros-noetic-usb-cam
rosrun usb_cam usb_cam_node
```

El nodo publica en `/usb_cam/image_raw` por defecto. Puedes fijar el dispositivo:

```bash
rosrun usb_cam usb_cam_node _video_device:="/dev/video0" _pixel_format:="yuyv"
```

---

## ⚙️ Configuración (`src/config.yaml`)

El nodo lee `vision_utilities/src/config.yaml` al arrancar. También acepta flags `--nombre[=valor]`.

| Sección | Parámetro | Default | Qué hace |
| --- | --- | --- | --- |
| Hardware | `with_pepper` | `false` | `true` usa Pepper; `false` usa `usb_cam`. |
| Hardware | `start_cameras` | `false` | Si es `true` y hay Pepper, abre la cámara frontal con el toolkit. |
| VLM | `vlm.llm_mode` | `"openai"` | Backend: `"openai"` (Azure) o `"ollama"` (local). |
| VLM | `vlm.model` | `"GPT-4o"` | Modelo a usar (`GPT-4o`, `gemma3_4b`, `gemma3_12b`, …). |
| VLM | `vlm.max_tokens` | `500` | Límite de la descripción generada. |
| YOLO | `coco_detection.model_name` | `"yolo11n"` | Modelo YOLO para COCO (`yolo11n`, `yolo11s`, …). |
| YOLO | `coco_detection.device` | `"auto"` | `"auto"`, `"cuda"`, `"cpu"` o `"npu"`. |
| IA | `ia` | `true` | Activa cara, pose, manos, YOLO y ajedrez. |
| Output | `publish_visualizations` | ver YAML | Streams de imagen anotada para RViz / rqt. |
| Output | `publish_data` | ver YAML | Datos crudos: bboxes y polígonos. |

Si `llm_mode` es `openai`, exporta la llave antes de lanzar el nodo:

```bash
export GPT_API="your_azure_openai_key_here"
```

---

## 🚀 Ejecución

Sin Pepper, primero la cámara:

```bash
rosrun usb_cam usb_cam_node
```

Luego el nodo de visión:

```bash
rosrun vision_utilities vision_utilities.py
```

---

## 🔧 Servicios ROS

Todos viven bajo `/vision_utilities/recognition/`.

### Siempre disponibles

#### `/vision_utilities/recognition/read_qr_srv`
Lee un código QR de la cámara activa. Recibe un `timeout` y devuelve el texto decodificado, o vacío si no hay resultado.

#### `/vision_utilities/recognition/owl_objects_srv`
Activa o desactiva detección de objetos por prompt (NanoOWL, vía WebSocket en `ws://localhost:5231/ws/detect`). Usa `ToggleDetectionTopic` (`state`, `frames_interval`).

#### `/vision_utilities/recognition/owl_objects_srv_prompt`
Cambia el prompt de NanoOWL (por defecto `[a person][a mug][a bottle]`).

#### `/vision_utilities/recognition/vlm_srv`
Describe la imagen actual con un VLM. Puede ir a **Azure OpenAI** o a **Ollama**, según `llm_mode`.

### Solo si `ia: true`

#### `/vision_utilities/recognition/coco_objects_srv`
Detección COCO con YOLO. Puede correr en CUDA, CPU o NPU (`ws://localhost:5230/ws/detect`).

#### `/vision_utilities/recognition/face_landmarks_srv`
Landmarks faciales con MediaPipe (hasta 5 caras).

#### `/vision_utilities/recognition/pose_srv`
Esqueleto corporal con MediaPipe Pose.

#### `/vision_utilities/recognition/hand_srv`
Landmarks de manos con MediaPipe Hands (hasta 2 manos).

#### `/vision_utilities/recognition/chess_srv`
Detecta el tablero, las piezas y arma un FEN a partir de la imagen.

Los servicios de toggle (`coco`, `owl`, `face`, `pose`, `hand`) se encienden con `state: true` y se apagan con `state: false`. Mientras están activos se suscriben a la cámara y publican visualizaciones si están listadas en `config.yaml`.

---

## 📡 Tópicos

Publicados según `publish_visualizations` y `publish_data`:

| Tópico | Tipo | Contenido |
| --- | --- | --- |
| `/vision_utilities/recognition/face_landmarks_image` | `sensor_msgs/Image` | Cara anotada |
| `/vision_utilities/recognition/pose_landmarks_image` | `sensor_msgs/Image` | Pose anotada |
| `/vision_utilities/recognition/hand_landmarks_image` | `sensor_msgs/Image` | Manos anotadas |
| `/vision_utilities/recognition/coco_detections_image` | `sensor_msgs/Image` | Detecciones YOLO |
| `/vision_utilities/recognition/owl_detections_image` | `sensor_msgs/Image` | Detecciones NanoOWL |
| `/vision_utilities/recognition/coco_bboxes` | `perception_msgs/get_labels_msg` | Cajas YOLO |
| `/vision_utilities/recognition/owl_bboxes` | `perception_msgs/get_labels_msg` | Cajas NanoOWL |
| `/vision_utilities/rendering/polygons` | `perception_msgs/Polygon` | Polígonos de landmarks |

Hay un visualizador aparte, `visualizer.py`, que ofrece `/vision_utilities/rendering/visualize_polygon_topic_srv` para dibujar polígonos sobre el stream de la cámara.

---

## 🧠 Cómo está organizado el código

- **`vision_utilities.py`**: nodo principal. Elige Pepper o cámara local y llama a `initialize_services`.
- **`config.py` / `config.yaml`**: configuración tipada con Pydantic.
- **`services/`**: un servicio por capacidad (QR, VLM, OWL, YOLO, MediaPipe, ajedrez).
- **`utils/camera_topic.py`**: suscripción única a la cámara y balanceo de callbacks.
- **`perception_msgs`**: mensajes y `.srv` compartidos.

Los mensajes siguen en el paquete `perception_msgs`; el nodo y los servicios ya se llaman `vision_utilities`.
