<script>
    let balance = 0; // Example balance
</script>

<div class="container">
    <div class="wallet-container">
        <!-- Balance Section -->
        <div class="balance-section">
            <p class="balance-label">Scythes</p>
            <h1 class="balance-amount">{balance.toFixed(2)}</h1>
        </div>

        <!-- Buttons Section -->
        <div class="buttons-container">
            <button class="btn btn-primary wallet-button">
                Enviar
                </button>

            <button class="btn btn-success wallet-button">
                    Solicitar
                </button>

            <button class="btn btn-info wallet-button">
                    Historial
                </button>
            </div>
        </div>
    </div>
<style>
    .wallet-container {
        padding: 2rem;
        max-width: 600px;
        margin: 2rem auto;
        background: linear-gradient(145deg, #ffffff, #f5f5f5);
        border-radius: 20px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .balance-section {
        text-align: center;
        padding: 2rem 0;
        margin-bottom: 2rem;
        background: linear-gradient(145deg, #2196f3, #1976d2);
        border-radius: 15px;
        color: white;
    }

    .balance-label {
        margin: 0;
        font-size: 1.2rem;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .balance-amount {
        margin: 0.5rem 0 0 0;
        font-size: 3rem;
        font-weight: bold;
    }

    .buttons-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .wallet-button {
        width: 100%;
        padding: 1rem;
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: none;
        border-radius: 10px;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .wallet-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .wallet-container {
            margin: 1rem;
            padding: 1rem;
        }

        .balance-amount {
            font-size: 2.5rem;
        }
    }
</style>