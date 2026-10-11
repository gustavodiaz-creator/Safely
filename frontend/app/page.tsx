'use client';

import React, { useState } from 'react';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [depositSuccess, setDepositSuccess] = useState(false);

  const connectWallet = async () => {
    // Simulación o conexión con Freighter Wallet
    if (typeof window !== 'undefined' && (window as any).freighter) {
      try {
        const address = await (window as any).freighter.getPublicKey();
        setWalletAddress(address);
        setWalletConnected(true);
      } catch (e) {
        alert('Por favor autoriza la conexión en Freighter Wallet');
      }
    } else {
      // Demo / Fallback para prueba visual
      setWalletAddress('GBX...STELLAR_TESTNET');
      setWalletConnected(true);
    }
  };

  const handleDeposit = () => {
    setDepositSuccess(true);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', padding: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#38bdf8', margin: 0 }}>🛡️ Safely</h1>
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: walletConnected ? '#22c55e' : '#0284c7',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {walletConnected ? `Conectado: ${walletAddress.slice(0, 6)}...` : 'Conectar Freighter Wallet'}
        </button>
      </header>

      {/* Hero / Presentación */}
      <section style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Garantías y Reservas Inmobiliarias Seguras en Stellar</h2>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Plataforma descentralizada de depósitos en garantía (Escrow) utilizando contratos inteligentes en Soroban.
        </p>
      </section>

      {/* Muestra de Inmuebles / MVP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Tarjeta de propiedad 1 */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #334155' }}>
          <h3 style={{ marginTop: 0, color: '#f1f5f9' }}>Apartamento en El Poblado</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Reserva mediante depósito en garantía condicional (Escrow).</p>
          <div style={{ margin: '1rem 0', padding: '0.75rem', backgroundColor: '#0f172a', borderRadius: '0.5rem' }}>
            <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Valor Reserva:</strong> 150 USDC</p>
            <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Red:</strong> Stellar Testnet</p>
          </div>

          {depositSuccess ? (
            <div style={{ backgroundColor: '#15803d', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              ✅ ¡Depósito en garantía registrado on-chain!
            </div>
          ) : (
            <button
              onClick={handleDeposit}
              disabled={!walletConnected}
              style={{
                width: '100%',
                backgroundColor: walletConnected ? '#38bdf8' : '#475569',
                color: '#0f172a',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                cursor: walletConnected ? 'pointer' : 'not-allowed'
              }}
            >
              {walletConnected ? 'Depositar Garantía (Escrow)' : 'Conecta Wallet para Reservar'}
            </button>
          )}
        </div>

      </div>
    </main>
  );
}