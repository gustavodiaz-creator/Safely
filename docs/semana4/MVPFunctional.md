# Entregable Semana 4: MVP Funcional - Safely 🛡️

**Enlaces Importantes:**
- **Video Demostrativo:** [Ver en YouTube](https://youtu.be/V9GsSGza9Xc?si=2pSvffieGo_qjc7-)
- **Contrato Inteligente (Stellar Testnet):** [CBZ7G4DK66PEJ7YYIHDWFHHR7BG3T3ELQT3HHXEGKGIDJERA7NWLZLJG](https://stellar.expert/explorer/testnet/contract/CBZ7G4DK66PEJ7YYIHDWFHHR7BG3T3ELQT3HHXEGKGIDJERA7NWLZLJG)
- **Carpeta de Documentos Off-chain (Drive):** [Ver en Google Drive](https://drive.google.com/drive/folders/1bSeB9DwJIF8GyE3jEoL2iROQLfFSH62e)

---

## 1. Descripción del MVP
Safely es una plataforma de custodia descentralizada (escrow) construida sobre la red de Stellar utilizando contratos inteligentes en Soroban. Nuestro MVP permite a los usuarios explorar un catálogo inmobiliario y reservar propiedades depositando dólares digitales (USDC) en un contrato inteligente. El contrato resguarda de forma inalterable el "hash" (huella digital) del documento de propiedad. Una vez confirmada la transacción on-chain, nuestro frontend reacciona liberando off-chain el acceso a una carpeta segura (Google Drive) con los documentos privados y los datos de contacto del propietario, garantizando una transacción transparente sin exponer datos confidenciales en la blockchain pública.

## 2. Hipótesis Evaluadas
**Hipótesis principal:** Los compradores de bienes raíces están dispuestos a interactuar con billeteras Web3 (como Albedo) y realizar depósitos si la plataforma les garantiza que sus fondos estarán custodiados por un contrato inteligente inalterable hasta que se verifique la autenticidad del inmueble.
**Resultado:** Validado. Demostramos que combinar una interfaz de usuario tradicional e intuitiva con la seguridad criptográfica por detrás, reduce drásticamente la fricción y la desconfianza característica de los acuerdos inmobiliarios por internet.

## 3. Pruebas de Usabilidad y Resultados
Durante el desarrollo e integración de la wallet, identificamos hallazgos clave en la usabilidad:
- **Conexión inicial:** La dependencia de instalar extensiones de navegador (como Freighter) generaba bloqueos técnicos (conflictos de ventanas y foco) y una mala experiencia para usuarios poco familiarizados. 
- **Solución implementada:** Migramos el flujo de autenticación hacia **Albedo** (`@albedo-link/intent`), logrando una experiencia de usuario (UX) mucho más fluida. Los usuarios ahora aprueban transacciones mediante ventanas emergentes web seguras sin necesidad de instalar software adicional.
- **Claridad del flujo:** Los usuarios respondieron positivamente al panel de "Siguientes Pasos" que aparece tras la reserva, el cual separa claramente la evidencia on-chain (Hash de transacción) de las acciones off-chain (acceso a los PDFs y contacto por WhatsApp).

## 4. Priorización de Fricciones
1. **Fricción Alta (Técnica):** Errores de renderizado del lado del servidor (SSR) en Next.js al intentar inyectar dependencias de la wallet. *Solucionado* mediante el aislamiento de la lógica con `next/dynamic` y la integración nativa de Albedo.
2. **Fricción Media (Arquitectura):** Intentar almacenar documentos pesados (fotos/PDFs) directamente en la blockchain, lo cual es ineficiente e inviable. *Solucionado* estructurando una arquitectura híbrida donde Stellar solo almacena el `docHash` (garantizando inmutabilidad) y Google Drive almacena el archivo físico.
3. **Fricción Baja (Operativa):** Cuentas de Testnet sin balance de XLM para cubrir las comisiones mínimas (fees) de la red. *Solucionado* guiando el proceso de fondeo inicial a través del grifo (Friendbot) de Stellar.