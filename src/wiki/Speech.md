# 🗣️ Speech - Módulo de Voz

Bienvenido al sistema de procesamiento de voz de nuestro robot 🤖🔊. Este paquete combina **captura, transcripción, síntesis de voz y diálogo** para permitir interacciones naturales.  

---

## 📦 Paquete `speech_utilities`

### 🔹 **1. speech_library.py**  
Contiene herramientas esenciales para el manejo de audio y transcripción.  

#### 📝 **Funciones de transcripción:**  
- **`transcribe(audio_path)`** – Usa un modelo local de **Whisper** para transcribir audios WAV.  
- **`transcribe_cloud(audio_path)`** – Envía el audio a **Azure OpenAI** para transcripción en la nube.  
- **`transcribe_spanish(audio_path)`** – Usa **Google Speech** para transcribir en español.  

#### 📀 **Carga y guardado de modelos/audio:**  
- **`load_model(model_name)`** – Descarga/carga el modelo Whisper y lo configura en **CUDA** o **CPU**.  
- **`save_recording(buffer, path)`** – Guarda un audio en formato WAV.  

#### 🔍 **Procesamiento de texto y voz:**  
- **`nltk_processing(text)`** – Analiza el texto y extrae etiquetas POS con **NLTK**.  
- **`q_a_processing(question)`** – Sistema de preguntas y respuestas basado en reglas.  
- **`q_a_gpt(question)`** – Responde preguntas usando **GPT (Azure OpenAI)**.  
- **`word_to_sec(text, wpm=150)`** – Calcula el tiempo para pronunciar una frase.  
- **`int2float(audio_int16)`** – Convierte datos de audio de `int16` a `float32`.  

#### 🎨 **Extras utiles:**  
- **`setLedsColor(color)`** – Cambia el color de los LEDs del robot.  
- **`gpt(messages)`** – Envia un diálogo a GPT y obtiene una respuesta.  

---

### 🔹 **2. speech_utilities.py**  
La clase `SpeechUtilities` se encarga de unir todo lo anterior en un **entorno con o sin ROS**.  

#### ⚙️ **Configuración e Inicialización:**  
- Si ROS está activo: configura **nodos, servicios y topics**.  
- Si ROS no está activo: captura audio localmente con `sounddevice`.  
- Carga modelos de Whisper y activa **detección de voz en tiempo real**.  

#### 🔊 **Servicios ROS y callbacks principales:**  
- **`callback_speech2text()`** – Registra audio y lo transcribe con **Whisper** o **Google**.  
- **`callback_hot_word_srv()`** – Detecta **palabras clave** en el audio.  
- **`callback_talk(text)`** – Hace que el robot **hable** con animaciones.  
- **`callback_q_a(question)`** – Responde preguntas con **NLTK o GPT**.  

#### 🎤 **Manejo de Audio:**  
- **`audioCallbackSingleChannel(msg)`** – Procesa audio del tópico `/mic`.  
- **`publish_local_audio()`** – Simula entrada de micrófono en entornos sin ROS.  

---

## 📡 Integración con ROS

### 📥 **Topics Suscritos**
#### 🎙️ **/mic**  
**¿Qué hace?**  
- Recibe audio de **un micrófono real** (robot) o **simulado** (modo local).  
- Almacena el audio en buffer y detecta si hay **voz activa**.  

**Proceso:**  
1. Convierte el audio a `float32` usando `int2float`.  
2. Usa **Silero VAD** para detectar si hay voz en el audio.  
3. Si la confianza es más del 57%, activa el estado **"escuhando a persona hablar"**.  

#### 🔊 **/pytoolkit/ALTextToSpeech/status**  
- Indica si el robot **está hablando** o ha finalizado.  

### 🔧 **Servicios Ofrecidos**
#### 📝 **speech_utilities/speech2text_srv**  
- **Convierte voz en texto** usando **Whisper** o **Google Speech**.  
- Puede grabar con **duración fija** o hasta que detecte **silencio**.  

#### ❓ **speech_utilities/answers_srv**  
- Permite hacer preguntas a **GPT** con historial de conversación.  

#### 🎤 **speech_utilities/hot_word_srv**  
- **Activa/desactiva** detección de palabras clave.  

#### 🗣️ **speech_utilities/talk_srv**  
- Hace que el robot **hable** con ajustes de velocidad y animaciones.  

#### ❔ **speech_utilities/q_a_srv**  
- Responde preguntas usando **reglas predefinidas** o **GPT**.  

---

## 🔍 Funcionamiento Interno  

### 📝 Transcripción de voz a texto (`speech2text`)  
**¿Cómo sabe cuándo dejar de grabar?**  
1. Si se da una **duración fija**, graba ese tiempo exacto.  
2. Si la duración = **0**, usa VAD para detectar automáticamente **silencio**.  
3. Cuando el usuario deja de hablar:  
   - Guarda el audio en **WAV**.  
   - Usa **Whisper** o **Google Speech** según el idioma.  
   - Devuelve el **texto transcrito**.  

---

## 🎯 Conclusión  

Este módulo permite que el robot **escuche, entienda y hable**, adaptándose a **entornos robóticos (ROS)** o **locales**. Gracias a modelos avanzados como **Whisper, VAD y GPT**, logra una interacción fluida e inteligente. 🚀  

¿Listo para hacer hablar a tu robot? 🎙️🤖  
