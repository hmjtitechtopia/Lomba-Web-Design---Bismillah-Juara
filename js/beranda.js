// Skrip halaman Beranda
// Menyusun pintasan topik, pilihan bacaan, dan ide singgah berdasarkan waktu.

// Empat pintu menuju halaman utama
const PINTU_HALAMAN = [
  {
    halaman: "sejarah",
    judul: "Sejarah",
    keterangan: "Linimasa, Tugu, dan Sumbu Filosofi",
    warna: "#6b4a33",
    pola: "daun",
    foto: "images/beranda-tugu-jogja-baru.webp",
  },
  {
    halaman: "budaya",
    judul: "Budaya",
    keterangan: "Batik, gamelan, tari, dan tradisi",
    warna: "#a85732",
    pola: "kawung",
    foto: "images/budaya-batik-baru.webp",
  },
  {
    halaman: "kuliner",
    judul: "Kuliner",
    keterangan: "Makanan, minuman, dan angkringan",
    warna: "#9c6d21",
    pola: "ceplok",
    foto: "images/kuliner-gudeg-baru.webp",
  },
  {
    halaman: "wisata",
    judul: "Wisata",
    keterangan: `${daftarWisata.length} tempat, peta, dan rencana rute`,
    warna: "#2f5d3a",
    pola: "parang",
    foto: "images/beranda-prambanan-baru.webp",
  },
];

function tampilkanPintu() {
  ambilId("doors").innerHTML = PINTU_HALAMAN.map((pintu, indeks) => {
    const nomor = String(indeks + 1).padStart(2, "0");
    return `
      <a class="pintu-topik" href="${pintu.halaman}.html"
        style="--cover-color: ${pintu.warna}; --cover-pattern: var(--pattern-${pintu.pola})">
        <img class="foto-pintu" src="${pintu.foto}" alt="" loading="lazy" decoding="async" />
        <span class="nomor-pintu" aria-hidden="true">${nomor}</span>
        <small>${nomor} / 04</small>
        <h3>${pintu.judul}</h3>
        <p>${pintu.keterangan}</p>
      </a>`;
  }).join("");
}

// Sorotan pilihan (carousel)
const DAFTAR_SOROTAN = [
  { item: daftarBudaya[0], foto: "images/budaya-batik-baru.webp" },
  { item: daftarWisata[0], foto: "images/beranda-prambanan-baru.webp" },
  { item: daftarKuliner[0], foto: "images/kuliner-gudeg-baru.webp" },
  { item: daftarBudaya[4], foto: "images/budaya-wayang-baru.webp" },
  { item: daftarWisata[2], foto: "images/beranda-keraton-baru.webp" },
];

function pasangSorotan() {
  const kotakSorotan = ambilId("carousel");
  const kotakTitik = ambilId("carousel-dots");
  let indeksAktif = 0;

  function tampilkanSlide(indeks) {
    indeksAktif = (indeks + DAFTAR_SOROTAN.length) % DAFTAR_SOROTAN.length;
    const { item, foto } = DAFTAR_SOROTAN[indeksAktif];

    kotakSorotan.style.cssText = gayaSampul(item);
    kotakSorotan.classList.add("memakai-foto");
    kotakSorotan.innerHTML = `
      <img class="foto-sorotan" src="${foto}" alt="${item.foto?.alt || item.judul}" loading="lazy" decoding="async" />
      <div class="isi-sorotan">
        <span class="label-kecil">${item.kategori}</span>
        <h3>${item.judul}</h3>
        <p>${item.cerita}</p>
        <button class="tombol tombol-terang" type="button"
          data-type="${item.jenis}" data-index="${item.urutan}">
          Baca selengkapnya
        </button>
      </div>`;

    kotakTitik.querySelectorAll("button").forEach((titik, urutan) => {
      titik.setAttribute("aria-current", urutan === indeksAktif);
    });
  }

  function pindahKe(indeks) {
    tampilkanSlide(indeks);
  }

  DAFTAR_SOROTAN.forEach((item, indeks) => {
    const titik = document.createElement("button");
    titik.type = "button";
    titik.setAttribute("aria-label", `Sorotan ${indeks + 1}: ${item.judul}`);
    titik.addEventListener("click", () => pindahKe(indeks));
    kotakTitik.appendChild(titik);
  });

  ambilId("carousel-prev").addEventListener("click", () => pindahKe(indeksAktif - 1));
  ambilId("carousel-next").addEventListener("click", () => pindahKe(indeksAktif + 1));

  tampilkanSlide(0);
}

// Ide singgah yang dikelompokkan berdasarkan waktu
const RENCANA_SEHARI = {
  Pagi: [
    ["Sarapan gudeg di Wijilan", "Beberapa warung buka sejak pagi; cek jam buka tempat yang kamu pilih.", "images/kuliner-gudeg-baru.webp"],
    ["Keraton Yogyakarta", "Periksa jam kunjungan dan jadwal pertunjukan sebelum berangkat.", "images/wisata-keraton-donopratono.jpg"],
    ["Pasar Beringharjo", "Pasar berada di pusat kota, tidak jauh dari kawasan Malioboro.", "images/wisata-beringharjo-commons.jpg"],
  ],
  Siang: [
    ["Taman Sari", "Jelajahi bagian kompleks yang dibuka untuk pengunjung.", "images/beranda-taman-sari-baru.webp"],
    ["Makan siang di sekitar Kraton", "Pilih tempat makan sesuai selera dan waktu yang tersedia.", "images/kuliner-gudeg-baru.webp"],
    ["Jalan-jalan di Kotagede", "Sisihkan waktu untuk perjalanan dari pusat kota dan menghormati lingkungan warga.", "images/beranda-kotagede-baru.webp"],
  ],
  Sore: [
    ["Candi Prambanan", "Periksa jam masuk terakhir dan sisihkan waktu untuk berkeliling kompleks.", "images/beranda-prambanan-baru.webp"],
    ["Tebing Breksi", "Lokasinya berada di kawasan Prambanan; atur perjalanan dan tiket secara terpisah.", "images/beranda-tebing-breksi-baru.webp"],
    ["Atur waktu pulang", "Perhitungkan waktu tempuh kembali dan cek pilihan transportasi.", ""],
  ],
  Malam: [
    ["Malioboro", "Jelajahi kawasan pedestrian dan perhatikan aturan setempat.", "images/sejarah-malioboro-baru.webp"],
    ["Makan malam di pusat kota", "Pilih tempat yang masih buka saat kamu tiba.", "images/kuliner-angkringan-baru.webp"],
    ["Angkringan", "Menu dan harga berbeda di tiap warung; tanyakan sebelum memesan.", "images/kuliner-kopi-joss-baru.webp"],
  ],
};

function pasangRencanaSehari() {
  const daftarTab = ambilId("day-tabs");
  const panelIsi = ambilId("day-plan");

  function pilihWaktu(waktu) {
    daftarTab.querySelectorAll("button").forEach((tab) => {
      const dipilih = tab.textContent === waktu;
      tab.setAttribute("aria-selected", dipilih);
      tab.tabIndex = dipilih ? 0 : -1;
    });

    panelIsi.setAttribute("aria-labelledby", `day-tab-${waktu.toLowerCase()}`);
    panelIsi.innerHTML = RENCANA_SEHARI[waktu]
      .map(
        ([tempat, catatan, foto], indeks) => `
        <div class="tempat-singgah${foto ? "" : " tempat-singgah-catatan"}">
          ${foto ? `<img class="foto-singgah" src="${foto}" alt="" loading="lazy" decoding="async" />` : ""}
          <span class="label-kecil">${foto ? `Perhentian ${indeks + 1}` : "Catatan rute"}</span>
          <h4>${tempat}</h4>
          <p>${catatan}</p>
        </div>`,
      )
      .join("");
  }

  Object.keys(RENCANA_SEHARI).forEach((waktu) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.textContent = waktu;
    tab.id = `day-tab-${waktu.toLowerCase()}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "day-plan");
    tab.addEventListener("click", () => pilihWaktu(waktu));
    tab.addEventListener("keydown", (event) => {
      const daftarWaktu = Object.keys(RENCANA_SEHARI);
      const indeksSaatIni = daftarWaktu.indexOf(waktu);
      let indeksBerikutnya;

      if (event.key === "ArrowRight") {
        indeksBerikutnya = (indeksSaatIni + 1) % daftarWaktu.length;
      } else if (event.key === "ArrowLeft") {
        indeksBerikutnya =
          (indeksSaatIni - 1 + daftarWaktu.length) % daftarWaktu.length;
      } else if (event.key === "Home") {
        indeksBerikutnya = 0;
      } else if (event.key === "End") {
        indeksBerikutnya = daftarWaktu.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      const waktuBerikutnya = daftarWaktu[indeksBerikutnya];
      pilihWaktu(waktuBerikutnya);
      daftarTab.querySelector(`#day-tab-${waktuBerikutnya.toLowerCase()}`).focus();
    });
    daftarTab.appendChild(tab);
  });

  pilihWaktu("Pagi");
}

// Jalankan semua fungsi beranda
ambilId("topic-count").dataset.count =
  daftarBudaya.length + daftarKuliner.length + daftarWisata.length;

tampilkanPintu();
amatiSemuaAngka();
pasangSorotan();
pasangRencanaSehari();
