# Product Blueprint

**Nombre del proyecto:** Safely

**Repositorio (enlace obligatorio):** `[Repo Safely](https://github.com/gustavodiaz-creator/Safely)`

> Los campos marcados como *enlace obligatorio* deben ir como enlace en Markdown, con este formato: `[texto del enlace](https://...)`. Reemplacen el texto y la dirección de ejemplo.

---

## Contenido

1. Priorización de historias
2. Propuesta de valor
3. Flujo de usuario
4. Alcance del MVP
5. Lean Canvas
6. Backlog priorizado (Kanban)
7. Arquitectura inicial
8. Uso de Stellar y justificación

---

## 1. Priorización de historias

> Historias elegidas entre las que propuso el equipo y criterio con que se priorizaron. Son las que pasan al backlog. Extensión: breve.

**Criterio de priorización:** Escriban aquí el criterio (por ejemplo, imprescindible / debería / podría / queda fuera).

| Prioridad | Historia | Propuesta por | Por qué entra al backlog |
| :---: | --- | :---: | --- |
| 1 | Como [comprador] quiero [consultar el registro inalterable de la propiedad del bien antes de pagar] para [verificar que el oferente es el dueño real y evitar una estafa]. | Gustavo Diaz | Es la funcionalidad central y el núcleo de nuestra propuesta de valor; sin ella, el producto no resuelve el problema de las estafas. |
| 2 | Como [vendedor] quiero [registrar los datos del inmueble o vehículo en la plataforma] para [publicar mi oferta de manera verificable]. | Gustavo Diaz | Es imprescindible porque se necesita alimentar la plataforma con los bienes que los compradores van a consultar. |
| 3 | Como [comprador] quiero [realizar un depósito de reserva en custodia digital] para [asegurar el negocio sin entregarle dinero directamente y sin garantías al vendedor]. | Gustavo Diaz | Ataca directamente el segundo dolor del usuario (la pérdida de dinero por anticipos), protegiendo el capital mediante contratos inteligentes. |
| 4 | Como [comprador] quiero [filtrar los bienes disponibles por categoría (casas, apartamentos o vehículos)] para [encontrar rápidamente lo que se ajusta a lo que busco]. | Gustavo Diaz | Mejora sustancialmente la experiencia del home amigable, facilitando la navegación sin alterar el núcleo de seguridad. |
| 5 | Como [vendedor] quiero [gestionar mis publicaciones desde un panel de control] para [actualizar su disponibilidad o eliminar lo que ya se vendió]. | Gustavo Diaz | Facilita la administración por parte del oferente, optimizando la gestión de su inventario de bienes. |
| 6 | Como [comprador] quiero [recibir notificaciones en tiempo real cuando se publique un bien de mi interés] para [enterarme de las oportunidades al instante]. | Gustavo Diaz | Es una funcionalidad completamente secundaria; mejora la comodidad y la retención, pero el producto funciona perfectamente para evitar estafas sin necesidad de alertas automáticas. |

*(Agreguen o borren filas según las historias que pasen al backlog.)*

---

## 2. Propuesta de valor

> Qué resultado obtiene el usuario y por qué elegiría esta solución. En qué se diferencia de cómo resuelve hoy. Conecta con el usuario del Problem Brief. Extensión: 150–300 palabras en total.

**Usuario (del Problem Brief):** Ciudadanos que buscan comprar o alquilar inmuebles o vehículos por internet y se exponen a estafas por la falta de verificación de la propiedad.

**Resultado que obtiene:** Un proceso de búsqueda y reserva transparente, donde puede verificar la autenticidad del dueño y asegurar su dinero mediante registros inalterables.

**Por qué elegiría esta solución:** Porque elimina la necesidad de confiar ciegamente en desconocidos en redes sociales o portales tradicionales, reduciendo a cero el riesgo de fraude por suplantación.

**En qué se diferencia de cómo lo resuelve hoy:** Hoy depende de intermediarios costosos (inmobiliarias) o transferencias de buena fe a cuentas de terceros sin garantías; Safely descentraliza la confianza mediante tecnología de registros inmutables.

---

## 3. Flujo de usuario

> Recorrido de la persona por la solución de principio a fin, roles y puntos de interacción. Diagrama o secuencia numerada. Extensión: 150–300 palabras.

| Paso | Rol | Qué hace | Punto de interacción |
| :---: | :---: | --- | --- |
| 1 | Comprador | Busca y filtra el inmueble o vehículo de su interés en el home. | Pantalla de inicio, interfaz web. |
| 2 | Comprador | Consulta el registro inalterable de titularidad del bien seleccionado. | Vista de detalle del bien. |
| 3 | Comprador | Conecta su billetera digital para autorizar un depósito de reserva seguro. | Wallet. |
| 4 | Rol | Confirma la entrega del bien para que los fondos se liberen correctamente. | Panel de administacion. |

*(Agreguen los pasos que hagan falta. Si prefieren, inserten aquí un diagrama.)*

---

## 4. Alcance del MVP

> Funcionalidad central separada de la deseable que queda fuera. Justificación de por qué el recorte sigue entregando valor. Extensión: 150–300 palabras en total.

| Dentro del MVP (funcionalidad central) | Fuera del MVP (deseable, para después) |
| --- | --- |
| Registro inmutable de la propiedad del bien. | Vistas de recorridos en 360 grados de los inmuebles. |
| Consulta pública del registro de titularidad antes de pagar. | Módulo de videollamadas integrado en tiempo real. |
| Sistema básico de depósito de reserva en custodia digital. | Sistema básico de depósito de reserva en custodia digital. |

**Por qué el recorte sigue entregando valor:** Porque prioriza estrictamente la resolución del problema principal (evitar estafas y verificar dueños reales), permitiendo lanzar un producto funcional en pocas semanas sin invertir tiempo en características visuales complejas que no alteran la seguridad fundamental.

---

## 5. Lean Canvas

> Lienzo de una página con el modelo del producto. Extensión: enlace (obligatorio).

**Enlace al Lean Canvas (obligatorio):** [Lean Canvas del proyecto](./assets/Lean%20Canva%20Safely.jpg)

El lienzo debe cubrir: problema, segmento de usuarios, propuesta de valor única, solución, canales, métricas clave, ventaja diferencial y estructura de costos e ingresos.

---

## 6. Backlog priorizado (Kanban)

> Enlace al tablero en GitHub Projects, construido con las historias priorizadas, en columnas y con criterios de aceptación por tarjeta. Extensión: enlace al tablero (obligatorio).

**Enlace al tablero (obligatorio):** [Tablero Kanban en GitHub Projects](https://github.com/users/gustavodiaz-creator/projects/2/views/1)

---

## 7. Arquitectura inicial

> Cómo se conectan las partes (interfaz, lógica, Stellar) y en qué punto entra la red. Diagrama simple en imagen. Extensión: 150–300 palabras en total.

**Diagrama (imagen o enlace):** ![Diagrama de Arquitectura](./assets/Flujo%20Web3_%20Wallet,%20Contratos%20y%20Stellar.png)

| Capa | Componente | Qué hace |
| :---: | --- | --- |
| Interfaz | Aplicación Web (Frontend). | Muestra el catálogo de bienes y el panel de administración. Permite al usuario interactuar visualmente de forma amigable y solicitar la conexión a su billetera digital (Freighter). |
| Lógica | Contratos Inteligentes (Soroban / Rust) | Contiene las reglas inmutables del negocio. Ejecuta la lógica para retener el depósito de reserva y liberarlo solo cuando se cumplan las condiciones, sin intervención manual. |
| Stellar | Red Blockchain (Stellar Testnet). | Almacena de forma inalterable los "hashes" o huellas digitales de los documentos de propiedad y procesa las transacciones financieras con bajas comisiones. |

**En qué punto entra la red:** La red Stellar entra en dos momentos críticos de Safely. Primero, en la lectura, cuando el comprador hace clic para verificar el historial de un bien, consultando directamente la blockchain para comprobar que el registro es auténtico y no ha sido alterado. Segundo, en la escritura, cuando el comprador decide hacer un depósito de reserva; allí conecta su wallet (Freighter), firma la transacción y el contrato inteligente en Soroban toma el control lógico de los fondos en la red.   

---

## 8. Uso de Stellar y justificación

> Qué componentes de Stellar usaría y por qué cada uno. Apoyado en el criterio de pertinencia del Problem Brief. Extensión: 150–300 palabras en total.

**Criterio de pertinencia (del Problem Brief):** Varias partes que no confían entre sí (comprador y vendedor por internet) necesitan compartir un mismo registro donde el histórico de titularidad no pueda alterarse, eliminando así a los intermediarios tradicionales (inmobiliarias) que hoy concentran la confianza de forma costosa y lenta.

| Componente de Stellar | Para qué lo usamos | Por qué ese y no otra alternativa |
| --- | --- | --- |
| Soroban (Smart Contracts en Rust) | Para programar la lógica de los depósitos de garantía y reservas de los inmuebles y vehículos. | Porque permite que la regla la ponga un contrato inmutable y no una persona, garantizando a ambas partes que el dinero solo se moverá si se cumple el trato, eliminando la desconfianza. |
| Wallets de Autocustodia (Freighter) | Para que los usuarios se autentiquen y firmen las transacciones de compra o alquiler directamente desde su navegador. | Porque exime a Safely de guardar el dinero y las contraseñas de los usuarios. El usuario es 100% dueño de sus llaves, evitando los riesgos de hackeo a bases de datos centrales. |
| Tokens estables (ej. USDC nativo) | Para realizar los pagos de las reservas en dólares digitales sin volatilidad. | Porque en Stellar los tokens vienen resueltos de fábrica (operaciones nativas), permitiendo transferir valor en segundos con comisiones de red casi nulas, a diferencia de otras redes más costosas como Ethereum o Bitcoin. |