# Wonder-Catch

Minijuego web interactivo diseñado con HTML, CSS y Javascript donde el usuario debe perseguir al monstruo alien a través de una experiencia visual y sonora inmersiva.
<img width="1795" height="827" alt="image" src="https://github.com/user-attachments/assets/d6ab6635-4786-4365-b834-5d9408b894da" />

## Descripción
Wonder Catch es una experiencia interactiva basada en eventos del mouse, animaciones y manipulación del DOM. Cuenta con un espacio ambientado donde la criatura tiene un comportamiento aleatorio evasivo acompañado de ambientación sonora. Al conseguir acertar, se muestra información sobre esta y se agrega a la colección.



## Tecnología utilizada:
- HTML5
- CSS3 (animaciones, layout, efectos visuales)
- JavaScript (DOM, eventos, lógica de interacción)
- Web Storage API (localStorage)
- Audio API básica (Audio)


## Características:
- Interacción en tiempo real basada en proximidad del cursor
- Lógica de evasión dinámica con cálculos de distancia
- Interfaz animada con efectos visuales (partículas, fondo estrellado)
- Sistema de criaturas con:
       →Nombre único
       →Imagen personalizada
       →Música de fondo individual
       →Sonido de captura
- Persistencia de datos mediante localStorage
- Contador de progreso de colección
- Sistema de audio con:
       →Música ambiental en bucle
       →Efectos de captura
       →Sonido de victoria
- Cursor personalizado dinámico (ovni)


## Lógica principal:
El comportamiento del juego se basa en la distancia entre el cursor y la criatura:
* Se calcula la distancia en cada evento mousemove
* Si el cursor se aproxima lo suficiente, la criatura cambia de posición
* La dificultad puede ajustarse modificando el umbral de proximidad

Dinámica:
* Las criaturas se seleccionan aleatoriamente desde un arreglo de objetos
* La colección se guarda y recupera desde localStorage
* El sistema de audio se gestiona dinámicamente por criatura



## Pruébalo:
https://daniellapr.github.io/Wonder-Catch/


## Mejoras futuras:
- Temporizador
- Dificultad progresiva
- Logros o sistema de recompensas
- Accesibilidad
- Más criaturas por desbloquear



## Autora:
DaniellaPR
