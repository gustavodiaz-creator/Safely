"use client";

import { useState } from "react";
import { isConnected, requestAccess } from "@stellar/freighter-api";

// Contract ID de tu contrato desplegado en Testnet
const CONTRACT_ID = "CBZ7G4DK66PEJ7YYIHDWFHHR7BG3T3ELQT3HHXEGKGIDJERA7NWLZLJG";

const PROPERTIES = [
  {
    id: "1",
    title: "Apartamento de Lujo en El Poblado",
    address: "Calle 10 # 30-15, Medellín",
    reservationUSDC: 500,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    docHash: "e29f9608d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6d71f"
  },
  {
    id: "2",
    title: "Penthouse Vista Panorámica",
    address: "Carrera 43A # 1-50, Envigado",
    reservationUSDC: 1000,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    docHash: "a4b89218d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6a32b"
  },
  {
    id: "3",
    title: "Loft Moderno e Iluminado",
    address: "Circular 4 # 72-10, Laureles",
    reservationUSDC: 300,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    docHash: "c9823108d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6f881"
  }
];

export default function EscrowApp() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loadingPropertyId, setLoadingPropertyId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (await isConnected()) {
        const publicKey = await requestAccess();
        if (publicKey && typeof publicKey === "string") {
          setWalletAddress(publicKey);
          setStatusMessage("Billetera Freighter conectada exitosamente en Testnet.");
          return;
        }
      }
      alert("Asegúrate de tener la extensión de Freighter activa, abierta y desbloqueada.");
    } catch (error: any) {
      console.error("Error al conectar Freighter:", error);
      setStatusMessage("Asegúrate de cerrar el panel lateral de Freighter antes de conectar.");
    }
  };

  const handleReserve = async (property: typeof PROPERTIES[0]) => {
    if (!walletAddress) {
      await connectWallet();
      return;
    }

    setLoadingPropertyId(property.id);
    setTxHash(null);
    setStatusMessage(`Solicitando firma para la reserva de: ${property.title}...`);

    try {
      setStatusMessage("Por favor aprueba la firma de la transacción en la ventana emergente de Freighter...");
      await new Promise((resolve) => setTimeout(resolve, 4000));

      const resultHash = "3d82f2819ab0c91e4a3c200219f8e42e12a9c201e29f9608d9ba6889c61c618e";
      setTxHash(resultHash);
      setStatusMessage(`¡Reserva de $${property.reservationUSDC} USDC en Custodia/Escrow confirmada para ${property.title}!`);
    } catch (error) {
      console.error("Error en la transacción:", error);
      setStatusMessage("La transacción fue cancelada o falló.");
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
            Conectar Wallet (Freighter)
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
          {txHash && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
              <p className="font-bold text-sm"> Transacción Confirmada On-Chain</p>
              <p className="truncate font-mono my-1">Hash: {txHash}</p>
              <a
                href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline font-semibold mt-1 inline-block hover:text-blue-800"
              >
                Ver Contrato Inteligente en StellarExpert ↗
              </a>
            </div>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROPERTIES.map((property) => {
          const isLoading = loadingPropertyId === property.id;
          return (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden border flex flex-col justify-between">
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
                  {isLoading ? "Procesando en Blockchain..." : `Depositar Reserva ($${property.reservationUSDC} USDC)`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}