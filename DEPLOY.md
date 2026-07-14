# Deployment Guide untuk Vercel

## Struktur Folder yang Correct

```
project/
├── public/                 ← DEPLOYED (hanya folder ini yang di-deploy)
│   ├── index.html
│   ├── manifest.json
│   ├── favicon.svg
│   └── src/
│       ├── main.js
│       ├── styles/
│       └── crypto/
├── _src/                   ← LOCAL SOURCE (tidak di-deploy)
│   ├── main.js
│   ├── styles/
│   └── crypto/
├── test/                   ← NOT DEPLOYED
├── api/                    ← Empty folder (signals static site)
│   └── .gitkeep
├── vercel.json             ← Configuration
├── .vercelignore           ← Ignore patterns
├── package.json            ← Project metadata
└── README.md
```

## Setup Steps

### 1. Fix Root `src/` Folder
Root `src/` folder harus di-rename atau dihapus agar Vercel tidak mendeteksi sebagai serverless function.

**Option A: Rename (Recommended)**
```bash
mv src _src
```

**Option B: Delete (jika sudah semua di public/src/)**
```bash
rm -rf src
```

### 2. Verify Configuration Files

**vercel.json:**
```json
{
  "buildCommand": "exit 0",
  "outputDirectory": "public"
}
```

**.vercelignore:**
```
src/**
test/**
node_modules/**
.git
*.log
.env
```

### 3. Commit & Push

```bash
git add .
git commit -m "Fix: Prepare for Vercel deployment - static site only"
git push origin main
```

### 4. Clear Vercel Cache & Redeploy

Di Vercel dashboard:
1. Go ke project settings
2. → Deployments
3. Click deployment yang gagal
4. → Redeploy
5. Atau trigger new deployment dengan `git push`

### 5. Verify Deployment

```bash
# Test local
npx serve public

# Should load at http://localhost:3000
# Verify:
# - index.html loads
# - favicon muncul
# - Dark mode button works
# - S-AES encryption works
```

## Troubleshooting

### Error: "Failed to load ES module"
- **Cause**: Vercel menjalankan root `src/` sebagai serverless function
- **Fix**: Rename/delete root `src/`, verify `.vercelignore`

### Favicon tidak muncul
- **Fix**: Ensure `public/favicon.svg` ada
- Verify di DevTools → Network tab → favicon.svg should load

### Dark mode tidak work
- **Fix**: Clear browser cache + localStorage
- Check DevTools → Application → localStorage

### Import errors di public/src/
- **Fix**: Pastikan relative paths correct (e.g., `./crypto/constants.js`)

## File Structure Validation

Jalankan command ini untuk verify:

```bash
# Should show ONLY public/
ls -la public/

# Should be EMPTY (no src/)
ls -la src/ 2>/dev/null || echo "✓ Root src/ tidak ada"

# Should list ignored patterns
cat .vercelignore
```

## Performance Tips

- Favicon SVG scales untuk semua ukuran
- Dark mode preference di-save di localStorage
- CSS menggunakan CSS variables untuk efficient theming
- No external dependencies (pure vanilla JS)

## Production Checklist

- [ ] Root `src/` folder di-rename atau dihapus
- [ ] `vercel.json` benar
- [ ] `.vercelignore` benar
- [ ] `public/` folder punya semua files
- [ ] Vercel cache di-clear
- [ ] New deployment triggered
- [ ] index.html loads tanpa error
- [ ] favicon muncul
- [ ] Dark mode works
- [ ] S-AES encryption works

## Verify Success

Buka live URL dan cek:
1. **Network tab**: No 500 errors
2. **Favicon**: Shows di tab browser
3. **Console**: No JavaScript errors
4. **Functionality**: S-AES encryption/decryption works
5. **Dark Mode**: Toggle button works, preference saved
