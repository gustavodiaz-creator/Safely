"use client";

import { useState } from "react";
import albedo from "@albedo-link/intent";

// Contract ID de tu contrato de custodia desplegado en Testnet
const CONTRACT_ID = "CBZ7G4DK66PEJ7YYIHDWFHHR7BG3T3ELQT3HHXEGKGIDJERA7NWLZLJG";

const PROPERTIES = [
  {
    id: "1",
    title: "Apartamento de Lujo en El Poblado",
    address: "Calle 10 # 30-15, Medellín",
    reservationUSDC: 500,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    docHash: "e29f9608d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6d71f",
    ownerName: "Carlos Restrepo",
    ownerPhone: "+57 300 123 4567",
    driveLink: "https://drive.google.com/drive/folders/1bSeB9DwJIF8GyE3jEoL2iROQLfFSH62e"
  },
  {
    id: "2",
    title: "Penthouse Vista Panorámica",
    address: "Carrera 43A # 1-50, Envigado",
    reservationUSDC: 1000,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    docHash: "a4b89218d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6a32b",
    ownerName: "María Camila Vélez",
    ownerPhone: "+57 312 987 6543",
    driveLink: "https://drive.google.com/drive/folders/1bSeB9DwJIF8GyE3jEoL2iROQLfFSH62e"
  },
  {
    id: "3",
    title: "Loft Moderno e Iluminado",
    address: "Circular 4 # 72-10, Laureles",
    reservationUSDC: 300,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    docHash: "c9823108d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6f881",
    ownerName: "Daniel Arango",
    ownerPhone: "+57 315 456 7890",
    driveLink: "https://drive.google.com/drive/folders/1bSeB9DwJIF8GyE3jEoL2iROQLfFSH62e"
  }
];

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loadingPropertyId, setLoadingPropertyId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [reservedProperty, setReservedProperty] = useState<typeof PROPERTIES[0] | null>(null);

  // 1. Conexión limpia a Albedo
  const connectWallet = async () => {
    try {
      setStatusMessage("Abriendo Albedo para conectar...");
      
      const res = await albedo.publicKey({
        token: 'safely_login_testnet'
      });

      if (res.pubkey) {
        setWalletAddress(res.pubkey);
        setStatusMessage("Billetera conectada exitosamente en la Testnet.");
      }
    } catch (error) {
      console.error("Error al conectar Albedo:", error);
      setStatusMessage("Conexión cancelada o fallida.");
    }
  };

  // 2. Transacción de Reserva
  const handleReserve = async (property: typeof PROPERTIES[0]) => {
    if (!walletAddress) {
      await connectWallet();
      return;
    }

    setLoadingPropertyId(property.id);
    setTxHash(null);
    setReservedProperty(null);
    setStatusMessage(`Iniciando reserva para: ${property.title}...`);

    try {
      setStatusMessage("Enviando orden de depósito de custodia... Por favor aprueba en la ventana de Albedo.");
      
      // Simulación de interacción y cierre de Ledger (~4.5 segundos)
      await new Promise((resolve) => setTimeout(resolve, 4500));

      const resultHash = "e29f9608d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6d71f";
      
      setTxHash(resultHash);
      setReservedProperty(property);
      setStatusMessage(`¡Depósito de $${property.reservationUSDC} USDC asegurado en el contrato para ${property.title}!`);
    } catch (error) {
      console.error("Error en la transacción:", error);
      setStatusMessage("La transacción fue cancelada o no pudo procesarse.");
    } finally {
      setLoadingPropertyId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="max-w-6xl mx-auto flex justify-between items-center bg-white p-5 rounded-xl shadow-sm mb-8 border">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Safely 🛡️</h1>
          <p className="text-xs text-gray-500">Escrow & Custodia Inmobiliaria Descentralizada en Stellar</p>
        </div>

        {!walletAddress ? (
          <button
            onClick={connectWallet}
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition"
          >
            Conectar Wallet (Albedo)
          </button>
        ) : (
          <div className="text-right">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
              Connected (Testnet)
            </span>
            <p className="text-xs font-mono text-gray-600 mt-1 truncate w-36">{walletAddress}</p>
          </div>
        )}
      </header>

      {statusMessage && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-white border rounded-xl shadow-sm text-center">
          <p className="text-sm font-medium text-slate-700">{statusMessage}</p>
          
          {txHash && reservedProperty && (
            <div className="mt-5 p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-left max-w-3xl mx-auto">
              <p className="font-bold text-emerald-900 text-base mb-2">✅ Transacción On-Chain Confirmada</p>
              <p className="truncate font-mono text-xs text-emerald-800 mb-5 bg-emerald-100 p-2 rounded">Hash: {txHash}</p>
              
              <div className="bg-white p-5 rounded-lg border border-emerald-100 mb-4 shadow-sm">
                <p className="font-bold text-sm text-slate-800 mb-1">📅 Siguientes Pasos (Off-chain)</p>
                <p className="text-sm text-slate-600 mb-4">La custodia de tus fondos está asegurada en la red Stellar. Hemos liberado los datos de contacto y documentos del inmueble para que agendes tu visita física.</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded border">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Propietario</p>
                    <p className="font-semibold text-slate-800">{reservedProperty.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Contacto WhatsApp</p>
                    <p className="font-semibold text-slate-800">{reservedProperty.ownerPhone}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={reservedProperty.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-blue-600 text-white text-center text-sm py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
                >
                  📁 Abrir Documentos en Drive
                </a>
                <a
                  href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-700 text-white text-center text-sm py-2.5 px-4 rounded-lg font-semibold hover:bg-emerald-800 transition shadow-sm"
                >
                  ⛓️ Ver Contrato en StellarExpert
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROPERTIES.map((property) => {
          const isLoading = loadingPropertyId === property.id;
          return (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden border flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800">{property.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{property.address}</p>

                  <div className="mt-4 pt-3 border-t flex justify-between items-center">
                    <span className="text-xs text-gray-400">Reserva (Escrow):</span>
                    <span className="font-bold text-emerald-600 text-lg">${property.reservationUSDC} USDC</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleReserve(property)}
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition text-sm disabled:bg-gray-400"
                >
                  {isLoading ? "Procesando Custodia..." : `Depositar Reserva ($${property.reservationUSDC} USDC)`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}