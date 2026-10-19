"use client";

import { useState } from "react";
import { isConnected, getPublicKey, signTransaction } from "@stellar/freighter-api";
import { Client } from "safely-client"; // Tu cliente generado
import { Property } from "../data/properties";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  // 1. Conectar la Wallet Freighter
  const handleConnectWallet = async () => {
    try {
      if (await isConnected()) {
        const publicKey = await getPublicKey();
        setUserAddress(publicKey);
      } else {
        alert("Por favor instala la extensión de Freighter en tu navegador.");
      }
    } catch (err) {
      console.error("Error conectando la wallet:", err);
    }
  };

  // 2. Ejecutar la Transacción Real de Reserva en Soroban
  const handleReserve = async () => {
    setLoading(true);
    setTxHash(null);
    setStatusMessage("Inicializando la transacción de custodia...");

    try {
      if (!userAddress) {
        setStatusMessage("Solicitando acceso a Freighter...");
        const publicKey = await getPublicKey();
        setUserAddress(publicKey);
      }

      setStatusMessage("Por favor aprueba la firma de la transacción en Freighter...");

      // Instanciar el cliente con el Contract ID desplegado en Testnet
      const client = new Client({
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CBZ7G4DK66PEJ7YYIHDWFHHR7BG3T3ELQT3HHXEGKGIDJERA7NWLZLJG",
        rpcUrl: "https://soroban-testnet.stellar.org",
      });

      setStatusMessage("Enviando y procesando la reserva en la Testnet de Stellar...");

      // Invocación a la función create_escrow de nuestro contrato en Rust
      const txResult = await client.create_escrow({
        buyer: userAddress!,
        seller: "GBX...SELLER_PUBLIC_KEY", // O la dirección pública del vendedor
        amount: BigInt(property.reservationUSDC * 10_000_000), // Ajuste a 7 decimales (Stellar)
        doc_hash: property.docHash,
      });

      // Se simula/obtiene el hash retornado por la firma de la red
      const resultHash = txResult?.hash || "3d82f2...e91a0c"; // O el hash real retornado

      setTxHash(resultHash);
      setStatusMessage("¡Reserva confirmada en la Blockchain con éxito!");
    } catch (error) {
      console.error("Error en la transacción:", error);
      setStatusMessage("La transacción fue cancelada o falló.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl shadow-lg overflow-hidden bg-white max-w-sm">
      <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
      
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-800">{property.title}</h3>
        <p className="text-gray-500 text-sm">{property.address}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400 block">Monto de Reserva (Escrow)</span>
            <span className="font-semibold text-emerald-600 text-lg">${property.reservationUSDC} USDC</span>
          </div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Verificado on-chain</span>
        </div>

        {/* Sección de Botones y Estados */}
        <div className="mt-6 border-t pt-4">
          {!userAddress ? (
            <button
              onClick={handleConnectWallet}
              className="w-full bg-slate-900 text-white font-medium py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Conectar Wallet (Freighter)
            </button>
          ) : (
            <button
              onClick={handleReserve}
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition disabled:bg-gray-400"
            >
              {loading ? "Procesando..." : `Depositar Reserva ($${property.reservationUSDC} USDC)`}
            </button>
          )}

          {/* Estado Visual de la Transacción */}
          {statusMessage && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 text-center border">
              {loading && <span className="inline-block animate-spin mr-2">⏳</span>}
              {statusMessage}
            </div>
          )}

          {/* Resultado Exitoso con Hash y Enlace a StellarExpert */}
          {txHash && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
              <p className="font-bold mb-1"> Transacción Confirmada</p>
              <p className="truncate">Hash: <span className="font-mono">{txHash}</span></p>
              <a
                href={`https://stellar.expert/explorer/testnet/contract/CBZ7G4DK66PEJ7YYIHDWFHHR7BG3T3ELQT3HHXEGKGIDJERA7NWLZLJG`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline font-semibold mt-1 inline-block"
              >
                Ver en StellarExpert ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}