# CV Portfolio Component

Komponen CV Portfolio lengkap yang menggabungkan 6 section dalam satu file untuk kemudahan penggunaan.

## 🚀 Cara Penggunaan

### 1. Import di App.js
```javascript
import CVPortfolio from "./component/sections/index";

function App() {
  return (
    <div className="App">
      <CVPortfolio />
    </div>
  );
}
```

### 2. Dengan React Router (Recommended)
```javascript
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CVPortfolio from "./component/sections/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CVPortfolio />} />
        <Route path="/cv" element={<CVPortfolio />} />
      </Routes>
    </Router>
  );
}
```

## 📋 Sections yang Tersedia

1. **Hero Section** - Landing page dengan animasi
2. **About Section** - Profil pribadi dan statistik
3. **Experience Section** - Pengalaman kerja
4. **Education Section** - Pendidikan dan sertifikasi
5. **Skills Section** - Keahlian teknis dan soft skills
6. **Projects Section** - Portfolio proyek
7. **Contact Section** - Form kontak dan informasi

## 🎨 Fitur

- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Navigation Menu** - Sticky navigation dengan smooth scroll
- ✅ **Mobile Menu** - Hamburger menu untuk mobile
- ✅ **Scroll to Top** - Button untuk kembali ke atas
- ✅ **Professional Footer** - Footer lengkap dengan social links
- ✅ **Print Friendly** - Optimized untuk print/PDF
- ✅ **Smooth Animations** - Loading dan hover animations
- ✅ **SEO Ready** - Semantic HTML dan proper structure

## 🛠️ Kustomisasi

### Mengubah Data Pribadi
Edit data di masing-masing section file:
- `hero.js` - Nama, title, kontak
- `about.js` - Profil dan statistik
- `exp.js` - Pengalaman kerja
- `edu.js` - Pendidikan
- `skill.js` - Keahlian
- `project.js` - Portfolio proyek

### Mengubah Warna Theme
Edit variabel CSS di `index.module.css`:
```css
/* Primary Colors */
--primary-color: #3498db;
--secondary-color: #2c3e50;
--accent-color: #e74c3c;
```

### Menambah/Mengurangi Section
Edit array sections di `index.js`:
```javascript
// Menambah section baru
<section id="testimonials" className={styles.section}>
  <Testimonials />
</section>
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px

## 🖨️ Print Support

Component sudah dioptimasi untuk print/PDF:
- Navigation dan footer disembunyikan saat print
- Layout disesuaikan untuk format kertas
- Warna dan shadow dioptimasi untuk print

## 📝 Notes

- Pastikan semua file CSS module (.module.css) ada
- Gunakan React 18+ untuk compatibility terbaik
- Test responsive di berbagai device
- Customize sesuai kebutuhan personal branding

## 🎯 Tips Penggunaan

1. **Untuk Portfolio Pribadi**: Gunakan sebagai homepage utama
2. **Untuk Multi-page App**: Buat route terpisah `/cv`
3. **Untuk Print CV**: Buka di browser dan print to PDF
4. **Untuk Sharing**: Deploy dan share link langsung

Selamat menggunakan! 🚀
