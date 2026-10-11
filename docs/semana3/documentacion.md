# Entregable 3: Functional Proof - Safely

## Front construido

### Vistas e Interfaz
Para el MVP de **Safely**, hemos implementado la interfaz de usuario con las pantallas correspondientes al flujo principal definido en el Product Blueprint:

1. **Pantalla Principal / Landing Page**: Presenta la propuesta de valor de Safely y permite al usuario explorar los bienes registrados para reserva o arrendamiento.
2. **Conexión de Wallet**: Integración con la extensión de Freighter para conectar la billetera del usuario en la red Stellar Testnet.
3. **Detalle del Bien y Depósito en Garantía**: Vista detallada donde el usuario selecciona un inmueble o bien e inicia el proceso de reserva/garantía.
4. **Confirmación y Firma de Transacción**: Interfaz interactiva donde se revisan los montos en USDC de prueba y se firma la transacción mediante la wallet.

*Nota: Se adjuntan capturas de pantalla de la interfaz / Enlace al front en ejecución:* `https://safely-frontend.vercel.app` (o el enlace correspondiente si lo desplegaste en Vercel).

---

## Decisión técnica

### Opción Elegida: A. Contrato propio

### Justificación
Para la lógica de negocio de **Safely**, decidimos desarrollar un **contrato inteligente propio en Soroban (Rust)**.

* **¿Qué hará el contrato?:** El contrato gestionará la custodia de depósitos en garantía (*escrow*), reteniendo de forma inmutable los fondos de reserva hasta que comprador/arrendatario y vendedor/arrendador confirmen las condiciones del acuerdo, ejecutando automáticamente la liberación o devolución del saldo.
* **¿Por qué hace falta uno propio?:** Aunque Stellar cuenta con operaciones nativas para emisión de activos y transferencias, la lógica de *escrow* condicional, reglas de penalización e historial de depósitos seguros requiere ejecución programable que no se resuelve únicamente con operaciones estándar del protocolo.
* **Red:** La interacción se realiza íntegramente en **Stellar Testnet**.

---

## Participación del equipo

* **[Gustavo Diaz / gustavodiaz-creator]**: Configuración del proyecto, desarrollo del frontend, integración con Freighter Wallet y documentación técnica.

---

## Bloqueos y siguiente paso

* **Bloqueos actuales:** Ajustar la firma e invocación de funciones con Soroban SDK desde el frontend.
* **Siguiente paso:** Compilar a WASM y desplegar el contrato inteligente de *escrow* en Soroban durante la Semana 4 para conectar el flujo completo *on-chain*.