function generateWalletId() {
    const prefixes = ['minos', 'icarus', 'creta', 'teseo', 'ariadna', 'asterion']
    const nouns = ['isla', 'laberinto', 'vuelo', 'sistema', 'protocolo', 'oráculo', 'eco', 'estatua', 'circuito', 'canal', 'portal', 'clave', 'hierro', 'terminal', 'procesador', 'sensor', 'llave', 'archivo', 'paquete', 'interfaz'];
    const suffix = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
  
    return `${prefix}-${noun}${suffix}`
  }

