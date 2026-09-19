# Downloads Directory (`assets/downloads/`)

You can place downloadable files directly in this folder (e.g. installers, ZIP files, PDF templates, and manuals).

### Example Files:
- `assets/downloads/ResultDesk-Setup.exe`
- `assets/downloads/ResultDesk-Portable.zip`
- `assets/downloads/Nigerian-Grading-Scale-Guide.pdf`

---

## How to Link Files in Downloads Page:

1. **Local Files (< 50MB - 100MB):**
   - Save your file inside this `assets/downloads/` folder.
   - In `assets/js/db.js` (or via the CMS), set:
     `downloadUrl: "assets/downloads/ResultDesk-Setup.exe"`
   - Push to GitHub. When visitors click **Download Now ↓**, the browser downloads the file directly from your website!

2. **Large Files (50MB - 2GB):**
   - Upload the file to **GitHub Releases** (100% free with unlimited bandwidth).
   - Copy the direct download link from GitHub Releases (e.g., `https://github.com/divineleadsmedia/.../releases/download/.../Setup.exe`).
   - Set `downloadUrl` to that link!
