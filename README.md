# S-AES Lab - Simplified Advanced Encryption Standard Simulator

Aplikasi interaktif untuk simulasi S-AES 16-bit dengan jejak perhitungan lengkap.

## Features

✨ **Interactive UI**
- Enkripsi dan dekripsi real-time
- Visualisasi state matrix
- Step-by-step calculation display

🌙 **Dark/Light Mode**
- Toggle tema dengan tombol di top-right
- Preferensi tersimpan di localStorage

🔐 **GF(2⁴) Cryptography**
- Key expansion (K0, K1, K2)
- SubNibbles dengan S-Box
- ShiftRows transformation
- MixColumns dengan GF arithmetic
- Polynomial reduction: x⁴ + x + 1

## Deployment

Static site di Vercel dengan struktur:

```
project/
├── public/           (Deployed to Vercel)
│   ├── index.html
│   ├── manifest.json
│   ├── favicon.svg
│   └── src/
│       ├── main.js
│       ├── styles/main.css
│       └── crypto/
│           ├── constants.js
│           ├── encrypt.js
│           ├── decrypt.js
│           ├── keyExpansion.js
│           ├── subNibble.js
│           ├── shiftRows.js
│           ├── mixColumns.js
│           ├── gf.js
│           └── logger.js
├── src/             (Ignored in deployment)
├── test/            (Ignored in deployment)
├── vercel.json      (Config)
└── .vercelignore    (Exclude from Vercel)
```

### Configuration Files

- **vercel.json** - Vercel deployment config (static site from `public/`)
- **.vercelignore** - Exclude root `src/`, `test/`, `node_modules/` from deployment
- **.nojekyll** - Disable Jekyll processing

## Development

```bash
# Install dependencies (if needed)
npm install

# Run local server
npx serve public

# Deploy to Vercel
git push origin main
```

## Technologies

- Vanilla JavaScript (ES6+ modules)
- CSS3 with CSS variables
- Responsive design
- Dark mode support
