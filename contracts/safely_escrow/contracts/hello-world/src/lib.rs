#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Symbol};

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct EscrowAgreement {
    pub buyer: Address,
    pub seller: Address,
    pub amount: i128,
    pub doc_hash: String,      // Hash del contrato de compra/alquiler o certificado de propiedad
    pub visit_status: bool,    // Estado de la visita acordada (true = realizada)
    pub is_completed: bool,    // Indica si el trato fue cerrado con éxito
}

#[contract]
pub struct SafelyEscrowContract;

#[contractimpl]
impl SafelyEscrowContract {
    /// 1. Crear el depósito de reserva con las condiciones iniciales
    pub fn create_escrow(
        env: Env,
        buyer: Address,
        seller: Address,
        amount: i128,
        doc_hash: String,
    ) {
        buyer.require_auth(); // Requiere la firma del comprador

        let agreement = EscrowAgreement {
            buyer: buyer.clone(),
            seller: seller.clone(),
            amount,
            doc_hash,
            visit_status: false,
            is_completed: false,
        };

        // Almacenamos el acuerdo en el estado persistente del contrato
        env.storage().instance().set(&Symbol::new(&env, "agreement"), &agreement);
    }

    /// 2. Registrar confirmación de la visita presencial entre las partes
    pub fn confirm_visit(env: Env, buyer: Address) {
        buyer.require_auth();

        let mut agreement: EscrowAgreement = env.storage().instance().get(&Symbol::new(&env, "agreement")).unwrap();
        agreement.visit_status = true;

        env.storage().instance().set(&Symbol::new(&env, "agreement"), &agreement);
    }

    /// 3. Aprobar la documentación y liberar la reserva al vendedor
    pub fn release_funds(env: Env, buyer: Address) {
        buyer.require_auth();

        let mut agreement: EscrowAgreement = env.storage().instance().get(&Symbol::new(&env, "agreement")).unwrap();
        
        // Validación de condiciones: La visita debe estar confirmada
        if agreement.visit_status {
            agreement.is_completed = true;
            env.storage().instance().set(&Symbol::new(&env, "agreement"), &agreement);
            // Aquí en Mainnet/Testnet se ejecuta la transferencia con el token USDC/XLM
        }
    }

    /// 4. Consultar el estado actual del acuerdo de custodia
    pub fn get_agreement(env: Env) -> EscrowAgreement {
        env.storage().instance().get(&Symbol::new(&env, "agreement")).unwrap()
    }
}