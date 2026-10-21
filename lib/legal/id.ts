import { LEGAL_COMPANY, type LegalContent } from "./types";

const { name: COMPANY, email: EMAIL, whatsapp: WA, whatsappUrl: WA_URL } = LEGAL_COMPANY;

export const legalContentId: LegalContent = {
  ui: {
    eyebrow: "Legal",
    lastUpdated: "Terakhir diperbarui",
    summaryTitle: "Ringkasnya",
    tocTitle: "Daftar isi",
    contactTitle: "Ada pertanyaan?",
    contactBody: "Tim kami siap membantu menjelaskan dokumen ini atau menindaklanjuti permintaan Anda.",
    relatedTitle: "Dokumen terkait",
    docLabels: {
      termsAndConditions: "Syarat & Ketentuan",
      termsOfService: "Ketentuan Layanan",
      privacyPolicy: "Kebijakan Privasi",
      dataDeletion: "Penghapusan Data",
      cookiePolicy: "Kebijakan Cookie",
    },
  },
  documents: {
    // ------------------------------------------------------------------ Syarat & Ketentuan
    termsAndConditions: {
      title: "Syarat & Ketentuan",
      intro: `Halaman ini adalah perjanjian antara Anda dan ${COMPANY} ("Postmatic", "kami") sebagai pengelola Postmatic. Dengan mendaftar atau menggunakan Postmatic, Anda dianggap telah membaca, memahami, dan menyetujui syarat di bawah ini.`,
      summary: [
        "Tidak ada batas usia minimal. Jika Anda belum dewasa, gunakan Postmatic dengan persetujuan orang tua atau wali.",
        "Jaga keamanan akun Anda. Semua aktivitas di akun Anda menjadi tanggung jawab Anda.",
        "Postmatic memakai sistem **bayar sesuai pemakaian** dengan **Postmatic Token**, tanpa langganan bulanan.",
        "Data, logo, dan foto bisnis Anda tetap milik Anda. Hasil konten dari Postmatic boleh Anda pakai untuk bisnis Anda.",
        "Kami dapat membatasi atau menonaktifkan akun yang melanggar aturan atau hukum.",
      ],
      sections: [
        {
          id: "tentang-perjanjian",
          title: "Tentang perjanjian ini",
          blocks: [
            {
              type: "p",
              text: "Syarat & Ketentuan ini berlaku untuk semua layanan Postmatic, termasuk situs postmatic.id, halaman masuk (auth.postmatic.id), workspace (workspace.postmatic.id), dan dokumentasi (docs.postmatic.id).",
            },
            {
              type: "p",
              text: "Dokumen berikut juga menjadi bagian dari perjanjian ini: [Ketentuan Layanan](/terms-of-service), [Kebijakan Privasi](/privacy-policy), [Kebijakan Cookie](/cookie-policy), dan [Penghapusan Data](/data-deletion).",
            },
            { type: "p", text: "Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan Postmatic." },
          ],
        },
        {
          id: "siapa-boleh-menggunakan",
          title: "Siapa yang boleh menggunakan Postmatic",
          blocks: [
            {
              type: "list",
              items: [
                "Postmatic **tidak menetapkan batas usia minimal**.",
                "Jika Anda belum dewasa menurut hukum yang berlaku, Anda wajib mendapat **persetujuan orang tua atau wali** sebelum mendaftar. Orang tua atau wali ikut bertanggung jawab atas penggunaan akun Anda, termasuk pembelian token.",
                "Jika Anda mendaftar atas nama bisnis atau perusahaan, Anda menyatakan berwenang mewakili bisnis tersebut.",
                "Anda tidak sedang dilarang menggunakan layanan kami karena pelanggaran sebelumnya.",
              ],
            },
          ],
        },
        {
          id: "akun-anda",
          title: "Akun Anda",
          blocks: [
            {
              type: "list",
              items: [
                "Isi data pendaftaran dengan benar, lalu verifikasi email Anda. Anda juga bisa masuk dengan akun Google.",
                "Jaga kerahasiaan kata sandi Anda dan jangan bagikan akun kepada orang lain. Untuk bekerja bersama, gunakan fitur undang anggota tim.",
                "Anda bertanggung jawab atas semua aktivitas yang terjadi di akun Anda.",
                "Satu akun dapat mengelola lebih dari satu bisnis.",
                `Jika Anda curiga akun Anda dipakai orang lain, segera ganti kata sandi dan hubungi kami di ${EMAIL}. Di halaman Profil Anda juga bisa melihat dan mengakhiri sesi login di perangkat lain.`,
              ],
            },
          ],
        },
        {
          id: "token-dan-pembayaran",
          title: "Postmatic Token, harga, dan pembayaran",
          blocks: [
            {
              type: "p",
              text: "Postmatic memakai sistem **bayar sesuai pemakaian**. Anda membeli **Postmatic Token**, lalu token terpakai saat Anda menggunakan fitur tertentu, misalnya membuat gambar atau konten dengan AI. Jumlah token untuk setiap fitur ditampilkan di aplikasi.",
            },
            {
              type: "list",
              items: [
                "Harga, biaya admin, pajak, dan diskon (jika ada) ditampilkan sebelum Anda membayar.",
                "Pembayaran diproses oleh mitra pembayaran kami, **Midtrans**, melalui metode yang tersedia seperti transfer Virtual Account bank atau e-wallet/QRIS.",
                "Selesaikan pembayaran sebelum batas waktu yang tertera. Pesanan yang tidak dibayar akan otomatis dibatalkan.",
                "Token masuk ke akun Anda secara otomatis setelah pembayaran berhasil. Kami juga mengirimkan invoice ke email Anda.",
                "Postmatic Token **tidak memiliki masa berlaku**. Token tetap tersimpan selama akun Anda aktif.",
                "Token tidak dapat ditukar dengan uang tunai dan tidak dapat dipindahkan ke akun lain.",
                "Bonus token, promo, dan kode referral berlaku sesuai syarat masing-masing program. Kami dapat membatalkan bonus yang diperoleh dengan cara curang.",
              ],
            },
          ],
        },
        {
          id: "pengembalian-dana",
          title: "Pengembalian dana",
          blocks: [
            {
              type: "p",
              text: "Karena token bisa langsung dipakai setelah dibeli, pembelian token pada dasarnya **tidak dapat dikembalikan**.",
            },
            {
              type: "p",
              text: `Kami akan membantu jika terjadi kesalahan dari sisi kami, misalnya Anda tertagih dua kali atau token tidak masuk padahal pembayaran berhasil. Hubungi kami di ${EMAIL} dengan menyertakan Order ID. Jika terbukti ada kesalahan, kami akan menambahkan token yang seharusnya Anda terima atau mengembalikan dana melalui mitra pembayaran.`,
            },
          ],
        },
        {
          id: "hak-kekayaan-intelektual",
          title: "Kepemilikan konten dan hak kekayaan intelektual",
          blocks: [
            {
              type: "list",
              items: [
                `**Milik kami:** aplikasi, kode, desain, merek, dan logo Postmatic adalah milik ${COMPANY}. Anda tidak boleh menyalin atau menggunakannya tanpa izin tertulis.`,
                "**Milik Anda:** data bisnis, logo, foto produk, dan materi lain yang Anda unggah tetap milik Anda. Anda memberi kami izin terbatas untuk menyimpan dan memprosesnya, hanya untuk menjalankan layanan untuk Anda.",
                "**Hasil konten:** gambar dan caption yang dihasilkan Postmatic untuk Anda boleh Anda gunakan untuk keperluan bisnis, termasuk keperluan komersial. Kami tidak mengklaim kepemilikan atas hasil tersebut.",
                "Anda bertanggung jawab memastikan materi yang Anda unggah dan konten yang Anda publikasikan tidak melanggar hak orang lain, seperti hak cipta, merek, atau hak atas foto seseorang.",
              ],
            },
          ],
        },
        {
          id: "larangan",
          title: "Hal yang tidak boleh dilakukan",
          blocks: [
            {
              type: "list",
              items: [
                "Menggunakan Postmatic untuk kegiatan yang melanggar hukum, termasuk penipuan dan perjudian.",
                "Mencoba meretas, membobol, mengganggu, atau membebani sistem kami secara berlebihan.",
                "Membongkar (reverse engineering), menyalin, atau mengambil data dari aplikasi secara otomatis tanpa izin.",
                "Menjual ulang atau menyewakan akses Postmatic tanpa persetujuan tertulis dari kami.",
                "Membuat akun palsu, memakai identitas orang lain, atau menyalahgunakan promo dan program referral.",
                "Membuat atau menyebarkan konten yang dilarang, seperti dijelaskan di [Ketentuan Layanan](/terms-of-service).",
              ],
            },
          ],
        },
        {
          id: "penangguhan",
          title: "Penangguhan dan penghentian akun",
          blocks: [
            {
              type: "p",
              text: "Kami dapat membatasi, menangguhkan, atau menonaktifkan akun yang melanggar Syarat & Ketentuan ini, Ketentuan Layanan, atau hukum yang berlaku. Untuk pelanggaran ringan, kami akan berusaha memberi tahu Anda terlebih dahulu.",
            },
            {
              type: "p",
              text: "Anda dapat berhenti menggunakan Postmatic kapan saja dan meminta penghapusan akun. Caranya ada di halaman [Penghapusan Data](/data-deletion).",
            },
          ],
        },
        {
          id: "batasan-tanggung-jawab",
          title: "Batasan tanggung jawab",
          blocks: [
            {
              type: "list",
              items: [
                "Postmatic disediakan sebagaimana adanya. Kami terus berusaha agar layanan berjalan baik, tetapi tidak dapat menjamin layanan selalu bebas gangguan atau bebas kesalahan.",
                "Kami tidak menjamin hasil pemasaran tertentu, seperti jumlah penjualan, pengikut, atau interaksi.",
                "Kami tidak bertanggung jawab atas gangguan, perubahan aturan, atau tindakan dari platform pihak ketiga, seperti Facebook, Instagram, LinkedIn, atau mitra pembayaran.",
                "Sejauh diizinkan hukum, total tanggung jawab kami atas kerugian Anda dibatasi sebesar jumlah yang Anda bayarkan kepada kami dalam 3 bulan terakhir sebelum kejadian.",
              ],
            },
          ],
        },
        {
          id: "ganti-rugi",
          title: "Tanggung jawab Anda terhadap pihak lain",
          blocks: [
            {
              type: "p",
              text: "Jika ada pihak lain yang menuntut kami karena konten yang Anda unggah atau publikasikan, atau karena Anda melanggar perjanjian ini, Anda setuju untuk bertanggung jawab atas tuntutan tersebut dan membebaskan kami dari kerugian yang timbul.",
            },
          ],
        },
        {
          id: "hukum-dan-sengketa",
          title: "Hukum yang berlaku dan penyelesaian masalah",
          blocks: [
            { type: "p", text: "Perjanjian ini tunduk pada hukum Republik Indonesia." },
            {
              type: "p",
              text: `Jika terjadi perselisihan, kita akan mencoba menyelesaikannya secara musyawarah terlebih dahulu. Silakan hubungi kami di ${EMAIL}. Jika dalam 30 hari tidak tercapai kesepakatan, perselisihan akan diselesaikan melalui Pengadilan Negeri Sleman.`,
            },
          ],
        },
        {
          id: "perubahan",
          title: "Perubahan Syarat & Ketentuan",
          blocks: [
            {
              type: "p",
              text: "Kami dapat memperbarui Syarat & Ketentuan ini dari waktu ke waktu. Jika perubahannya penting, kami akan memberi tahu melalui email atau pemberitahuan di aplikasi. Dengan tetap menggunakan Postmatic setelah perubahan berlaku, Anda dianggap menyetujui versi terbaru.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Ketentuan Layanan
    termsOfService: {
      title: "Ketentuan Layanan",
      intro:
        "Halaman ini menjelaskan cara layanan Postmatic bekerja dan aturan saat Anda menggunakannya. Ketentuan ini melengkapi [Syarat & Ketentuan](/terms-and-conditions) kami.",
      summary: [
        "Postmatic membantu Anda membuat gambar dan caption dengan AI, menjadwalkan konten, dan mempostingnya otomatis ke akun media sosial bisnis Anda.",
        "Konten buatan AI bisa saja kurang tepat. **Selalu periksa hasilnya** sebelum dipublikasikan.",
        "Anda yang memutuskan konten mana yang dipublikasikan, dan Anda bertanggung jawab atas konten tersebut.",
        "Saat Anda menghubungkan akun media sosial, Postmatic hanya memposting konten sesuai izin dan pengaturan yang Anda buat.",
        "Konten yang melanggar hukum atau merugikan orang lain dilarang.",
      ],
      sections: [
        {
          id: "layanan-kami",
          title: "Layanan yang kami sediakan",
          blocks: [
            {
              type: "list",
              items: [
                "**Business Knowledge:** tempat menyimpan profil bisnis, produk, logo, warna brand, target audiens, dan gaya bahasa. Data ini menjadi dasar pembuatan konten.",
                "**Isi otomatis dari website:** Postmatic membaca website bisnis yang Anda masukkan untuk membantu mengisi profil bisnis. Anda tetap bisa memeriksa dan mengubah hasilnya.",
                "**Pembuatan konten dengan AI:** membuat desain gambar, caption, dan hashtag berdasarkan data bisnis serta ide atau tren yang Anda pilih.",
                "**Penjadwalan dan posting otomatis:** menjadwalkan dan memposting konten ke akun yang Anda hubungkan. Saat ini platform yang didukung adalah Facebook Page, Instagram (akun profesional), dan LinkedIn.",
                "**Kerja tim:** mengundang anggota tim ke bisnis Anda dan mengatur peran serta aksesnya.",
              ],
            },
          ],
        },
        {
          id: "konten-ai",
          title: "Tentang konten buatan AI",
          blocks: [
            {
              type: "p",
              text: "Konten di Postmatic dibuat dengan bantuan kecerdasan buatan (AI) dari mitra penyedia AI kami. Agar hasilnya aman dipakai, perhatikan hal berikut:",
            },
            {
              type: "list",
              items: [
                "Hasil AI bisa kurang akurat, misalnya salah menulis harga, nama produk, atau detail lainnya. **Periksa kembali** sebelum dipublikasikan.",
                "Hasil AI bisa mirip dengan konten lain yang sudah ada di internet. Hindari memakai hasil yang jelas meniru merek atau karya orang lain.",
                "Jangan gunakan konten AI untuk membuat klaim yang menyesatkan, seperti janji kesehatan atau keuntungan yang tidak benar.",
                "Token terpakai saat proses pembuatan konten dijalankan. Jika menurut Anda token terpotong tidak semestinya, hubungi kami.",
              ],
            },
          ],
        },
        {
          id: "akun-media-sosial",
          title: "Menghubungkan akun media sosial",
          blocks: [
            {
              type: "list",
              items: [
                "Akun dihubungkan melalui halaman izin resmi dari platform (Meta untuk Facebook dan Instagram, serta LinkedIn). Kami **tidak pernah meminta atau menyimpan kata sandi** akun media sosial Anda.",
                "Dengan menghubungkan akun, Anda mengizinkan Postmatic memposting konten atas nama akun tersebut, sebatas izin yang Anda setujui di halaman platform.",
                "Postmatic hanya memposting konten yang Anda buat, jadwalkan, atau aktifkan untuk diposting otomatis.",
                "Koneksi bisa kedaluwarsa atau dicabut oleh platform. Jika itu terjadi, Anda perlu menghubungkannya kembali di halaman Business Knowledge.",
                "Anda wajib mematuhi aturan masing-masing platform. Kami tidak bertanggung jawab jika platform menolak, menghapus konten, atau membatasi akun Anda.",
                "Anda bisa memutuskan koneksi kapan saja dari Postmatic, atau mencabut akses dari pengaturan platform. Caranya ada di halaman [Penghapusan Data](/data-deletion).",
              ],
            },
          ],
        },
        {
          id: "jadwal-dan-posting",
          title: "Jadwal dan posting otomatis",
          blocks: [
            {
              type: "list",
              items: [
                "Pastikan konten, akun tujuan, dan jadwal sudah benar sebelum menyimpan jadwal.",
                "Konten dapat terlambat terposting atau gagal karena gangguan dari platform, koneksi akun yang kedaluwarsa, atau pemeliharaan sistem. Status setiap posting dapat Anda lihat di aplikasi.",
                "Fitur otomatis, seperti pembuatan konten otomatis, menggunakan token sesuai pengaturan yang Anda aktifkan. Matikan fitur tersebut jika tidak ingin token terpakai.",
              ],
            },
          ],
        },
        {
          id: "konten-dilarang",
          title: "Konten yang dilarang",
          blocks: [
            { type: "p", text: "Anda tidak boleh menggunakan Postmatic untuk membuat, menyimpan, atau mempublikasikan konten yang:" },
            {
              type: "list",
              items: [
                "melanggar hukum Indonesia atau hukum di tempat konten dipublikasikan;",
                "mengandung ujaran kebencian, diskriminasi SARA, perundungan, atau ancaman kekerasan;",
                "berisi pornografi, konten seksual, atau apa pun yang melibatkan eksploitasi anak;",
                "mempromosikan perjudian, penipuan, investasi bodong, narkoba, senjata ilegal, atau barang terlarang lainnya;",
                "melanggar hak cipta, merek dagang, atau privasi orang lain, termasuk memakai foto atau data pribadi seseorang tanpa izin;",
                "menyebarkan hoaks atau informasi menyesatkan yang dapat membahayakan orang lain;",
                "berupa spam atau aktivitas yang melanggar aturan platform media sosial.",
              ],
            },
            {
              type: "p",
              text: "Kami dapat menghapus konten tersebut dari sistem kami serta membatasi atau menonaktifkan akun yang melanggar.",
            },
          ],
        },
        {
          id: "tim-dan-peran",
          title: "Tim dan peran akses",
          blocks: [
            {
              type: "list",
              items: [
                "Pemilik bisnis dapat mengundang anggota tim, mengatur peran, dan mengeluarkan anggota.",
                "Pemilik bisnis bertanggung jawab atas siapa saja yang diberi akses ke bisnisnya dan apa yang mereka lakukan di dalamnya.",
                "Anggota yang dikeluarkan dari tim tidak lagi bisa mengakses bisnis tersebut, tetapi akun Postmatic pribadinya tetap aktif.",
              ],
            },
          ],
        },
        {
          id: "data-yang-anda-masukkan",
          title: "Data yang Anda masukkan",
          blocks: [
            {
              type: "p",
              text: "Pastikan Anda berhak memakai semua data dan gambar yang Anda unggah, termasuk logo dan foto produk. Jika ada orang di dalam foto, pastikan Anda sudah mendapat izin dari orang tersebut. Cara kami menjaga data Anda dijelaskan di [Kebijakan Privasi](/privacy-policy).",
            },
          ],
        },
        {
          id: "ketersediaan",
          title: "Ketersediaan dan perubahan layanan",
          blocks: [
            {
              type: "list",
              items: [
                "Kami berusaha agar Postmatic dapat diakses setiap saat, tetapi layanan bisa sesekali terganggu karena pemeliharaan, gangguan teknis, atau gangguan dari mitra kami.",
                "Kami dapat menambah, mengubah, atau menghentikan fitur tertentu. Jika perubahan berdampak besar bagi Anda, kami akan memberi tahu terlebih dahulu.",
                "Untuk mencegah penyalahgunaan, kami menerapkan batas wajar pemakaian, misalnya jumlah permintaan dalam waktu tertentu.",
              ],
            },
          ],
        },
        {
          id: "bantuan",
          title: "Bantuan dan dukungan",
          blocks: [
            {
              type: "p",
              text: `Panduan penggunaan tersedia di [docs.postmatic.id](https://docs.postmatic.id). Untuk bantuan langsung, hubungi kami melalui email ${EMAIL} atau [WhatsApp ${WA}](${WA_URL}).`,
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Kebijakan Privasi
    privacyPolicy: {
      title: "Kebijakan Privasi",
      intro: `Kebijakan ini menjelaskan data apa yang kami kumpulkan saat Anda menggunakan Postmatic, untuk apa data itu dipakai, dengan siapa data dibagikan, dan hak Anda atas data tersebut. Postmatic dikelola oleh ${COMPANY}, yang bertindak sebagai pengendali data pribadi Anda sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).`,
      summary: [
        "Kami hanya mengumpulkan data yang dibutuhkan untuk menjalankan Postmatic: data akun, data bisnis, konten, dan transaksi.",
        "**Kami tidak menjual data pribadi Anda.**",
        "Data hanya dibagikan ke mitra yang membantu layanan berjalan, seperti penyedia AI, mitra pembayaran, penyimpanan data, dan platform media sosial yang Anda hubungkan.",
        "Kami tidak pernah meminta atau menyimpan kata sandi akun media sosial Anda.",
        "Anda dapat melihat, memperbaiki, dan meminta penghapusan data Anda kapan saja.",
      ],
      sections: [
        {
          id: "data-yang-dikumpulkan",
          title: "Data yang kami kumpulkan",
          blocks: [
            { type: "p", text: "**Data yang Anda berikan langsung:**" },
            {
              type: "list",
              items: [
                "**Data akun:** nama, alamat email, kata sandi (disimpan dalam bentuk terenkripsi, bukan teks asli), foto profil, serta nomor telepon jika Anda mengisinya.",
                "**Jika Anda masuk dengan Google:** nama, alamat email, dan foto profil dari akun Google Anda.",
                "**Data bisnis:** nama bisnis, logo, kategori, deskripsi, website, nomor telepon bisnis, warna brand, target audiens, gaya bahasa, hashtag, produk dan foto produk, avatar, dokumen pengetahuan, serta sumber berita (RSS) yang Anda ikuti.",
                "**Konten:** ide atau perintah (prompt) yang Anda tulis, gambar dan caption yang dibuat, jadwal posting, serta riwayat posting.",
                "**Anggota tim:** alamat email orang yang Anda undang ke bisnis Anda.",
                "**Komunikasi:** pesan yang Anda kirim ke tim dukungan melalui website, email, atau WhatsApp.",
              ],
            },
            { type: "p", text: "**Data dari layanan yang Anda hubungkan:**" },
            {
              type: "list",
              items: [
                "**Akun media sosial (Facebook Page, Instagram profesional, LinkedIn):** nama dan ID akun atau halaman, foto profil akun, serta token akses yang diberikan platform agar Postmatic bisa memposting atas izin Anda.",
                "**Pembayaran:** nomor pesanan, produk, jumlah token, nominal, metode pembayaran, nomor Virtual Account atau kode pembayaran, dan status pembayaran. **Kami tidak menyimpan data kartu** Anda. Data tersebut diproses langsung oleh Midtrans.",
                "**Website bisnis:** jika Anda memakai fitur isi otomatis dari website, kami membaca halaman publik website yang Anda masukkan dan menyimpan ringkasan informasinya.",
              ],
            },
            { type: "p", text: "**Data yang tercatat otomatis:**" },
            {
              type: "list",
              items: [
                "**Data teknis dan keamanan:** alamat IP, jenis perangkat dan browser, waktu akses, sesi login, serta catatan aktivitas penting di akun.",
                "**Pemeriksaan anti-bot:** halaman masuk dan daftar memakai Cloudflare Turnstile untuk memastikan yang mendaftar adalah manusia.",
                "**Program referral:** kode referral yang Anda gunakan atau bagikan, beserta pemakaiannya.",
              ],
            },
          ],
        },
        {
          id: "penggunaan-data",
          title: "Untuk apa data Anda digunakan",
          blocks: [
            {
              type: "list",
              items: [
                "Menjalankan fitur Postmatic, seperti membuat konten yang sesuai dengan bisnis Anda, menyimpan jadwal, dan memposting ke akun yang Anda hubungkan.",
                "Memproses pembayaran, menambahkan token, dan mengirim invoice.",
                "Mengirim email penting, seperti verifikasi akun, reset kata sandi, undangan tim, notifikasi keamanan, dan konfirmasi pembayaran.",
                "Menjaga keamanan, misalnya mencegah login mencurigakan, spam, dan penyalahgunaan.",
                "Membantu Anda saat menghubungi tim dukungan.",
                "Memperbaiki dan mengembangkan layanan.",
                "Mengirim informasi atau promo Postmatic. Anda dapat meminta untuk berhenti menerimanya kapan saja.",
              ],
            },
            {
              type: "p",
              text: "Kami memproses data atas dasar persetujuan Anda, untuk menjalankan perjanjian layanan dengan Anda, untuk memenuhi kewajiban hukum, dan untuk kepentingan yang sah seperti keamanan layanan.",
            },
          ],
        },
        {
          id: "berbagi-data",
          title: "Dengan siapa data dibagikan",
          blocks: [
            {
              type: "p",
              text: "**Kami tidak menjual atau menyewakan data pribadi Anda.** Data hanya dibagikan kepada mitra yang membantu kami menjalankan layanan, sebatas yang mereka butuhkan:",
            },
            {
              type: "list",
              items: [
                "**Penyedia AI** (OpenAI, Google Gemini, dan penyedia model AI lain yang kami gunakan): menerima perintah Anda serta data bisnis dan produk yang relevan untuk membuat gambar dan teks.",
                "**Mitra pembayaran** (Midtrans): menerima nama, email, rincian pesanan, dan nominal untuk memproses pembayaran.",
                "**Platform media sosial yang Anda hubungkan** (Meta untuk Facebook dan Instagram, serta LinkedIn): menerima konten yang Anda publikasikan.",
                "**Google:** jika Anda memilih masuk dengan akun Google.",
                "**Penyimpanan dan infrastruktur:** layanan cloud untuk menyimpan file dan gambar, server, serta layanan email untuk mengirim pesan.",
                "**Dukungan pelanggan:** layanan email dan WhatsApp yang kami pakai untuk membalas pesan Anda.",
                "**Keamanan:** Cloudflare untuk pemeriksaan anti-bot.",
                "**Pihak berwenang:** jika diwajibkan oleh hukum atau perintah resmi.",
              ],
            },
            {
              type: "p",
              text: "Sebagian mitra kami berada di luar Indonesia, sehingga data Anda dapat diproses di luar negeri. Kami hanya bekerja dengan mitra yang menerapkan perlindungan data yang memadai.",
            },
          ],
        },
        {
          id: "keamanan-data",
          title: "Bagaimana kami menjaga data Anda",
          blocks: [
            {
              type: "list",
              items: [
                "Semua koneksi ke Postmatic memakai HTTPS (terenkripsi).",
                "Kata sandi disimpan dalam bentuk terenkripsi satu arah, sehingga kami pun tidak dapat melihatnya.",
                "Akses ke data dibatasi hanya untuk tim yang membutuhkannya.",
                "Saat Anda memutuskan koneksi akun media sosial, token aksesnya langsung kami hapus.",
              ],
            },
            {
              type: "p",
              text: "Meski begitu, tidak ada sistem yang 100% aman. Jika terjadi kebocoran data yang berdampak pada Anda, kami akan memberi tahu Anda dan pihak berwenang sesuai ketentuan UU PDP.",
            },
          ],
        },
        {
          id: "lama-penyimpanan",
          title: "Berapa lama data disimpan",
          blocks: [
            {
              type: "list",
              items: [
                "Data akun dan bisnis disimpan selama akun Anda aktif.",
                "Setelah Anda meminta penghapusan akun, data akan dihapus atau dianonimkan sesuai proses di halaman [Penghapusan Data](/data-deletion).",
                "Catatan transaksi dan invoice tetap kami simpan selama diwajibkan oleh peraturan perpajakan dan akuntansi.",
                "Catatan keamanan disimpan dalam jangka waktu terbatas untuk mencegah dan menyelidiki penyalahgunaan.",
              ],
            },
          ],
        },
        {
          id: "hak-anda",
          title: "Hak Anda atas data pribadi",
          blocks: [
            { type: "p", text: "Sesuai UU PDP, Anda berhak untuk:" },
            {
              type: "list",
              items: [
                "mengetahui dan mendapatkan salinan data pribadi Anda;",
                "memperbaiki data yang salah atau tidak lengkap, sebagian besar bisa langsung Anda ubah di aplikasi;",
                "meminta penghapusan data;",
                "menarik persetujuan yang sudah Anda berikan;",
                "meminta kami membatasi atau berhenti memproses data Anda untuk tujuan tertentu;",
                "mengajukan keberatan atas cara kami memproses data Anda.",
              ],
            },
            {
              type: "p",
              text: `Untuk menggunakan hak ini, kirim email ke ${EMAIL} dari alamat email yang terdaftar di Postmatic. Kami mungkin akan memverifikasi identitas Anda terlebih dahulu.`,
            },
          ],
        },
        {
          id: "anak-anak",
          title: "Pengguna di bawah umur",
          blocks: [
            {
              type: "p",
              text: "Postmatic tidak menetapkan batas usia minimal. Sesuai UU PDP, pendaftaran dan pemrosesan data pengguna yang belum dewasa harus dengan persetujuan orang tua atau wali. Jika kami mengetahui data anak terdaftar tanpa persetujuan tersebut, kami dapat meminta konfirmasi dari orang tua atau wali, atau menghapus data tersebut.",
            },
          ],
        },
        {
          id: "cookie",
          title: "Cookie",
          blocks: [
            {
              type: "p",
              text: "Kami memakai cookie dan penyimpanan di browser agar Anda tetap masuk dan pengaturan Anda tersimpan. Penjelasan lengkapnya ada di [Kebijakan Cookie](/cookie-policy).",
            },
          ],
        },
        {
          id: "perubahan-kebijakan",
          title: "Perubahan kebijakan ini",
          blocks: [
            {
              type: "p",
              text: "Kebijakan ini dapat kami perbarui jika ada perubahan layanan atau aturan. Tanggal pembaruan terakhir selalu tercantum di bagian atas halaman. Untuk perubahan penting, kami akan memberi tahu melalui email atau pemberitahuan di aplikasi.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Penghapusan Data
    dataDeletion: {
      title: "Penghapusan Data",
      intro:
        "Anda berhak menghapus data Anda dari Postmatic. Halaman ini menjelaskan apa saja yang bisa Anda hapus sendiri, cara meminta penghapusan akun, dan cara mencabut akses Postmatic dari Facebook, Instagram, Google, dan LinkedIn.",
      summary: [
        "**Hapus sendiri:** produk, konten, avatar, sumber berita, anggota tim, koneksi media sosial, sampai bisnis Anda dapat dihapus langsung di workspace.",
        `**Hapus akun:** kirim email ke ${EMAIL} dari alamat email yang terdaftar.`,
        "**Facebook dan Instagram:** jika Anda menghapus Postmatic dari pengaturan Facebook atau Instagram, data koneksinya kami hapus otomatis.",
        "Konten yang sudah terposting di media sosial tetap ada di platform tersebut dan perlu dihapus langsung di sana.",
      ],
      sections: [
        {
          id: "hapus-sendiri",
          title: "Data yang bisa Anda hapus sendiri",
          blocks: [
            { type: "p", text: "Masuk ke [workspace Postmatic](https://workspace.postmatic.id), lalu pilih bisnis Anda. Dari sana Anda dapat:" },
            {
              type: "list",
              items: [
                "**Menghapus produk, konten, avatar, dan sumber berita (RSS)** dari halaman masing-masing.",
                "**Memutuskan akun media sosial** di halaman Business Knowledge, bagian platform. Token akses akun tersebut langsung kami hapus.",
                "**Mengeluarkan anggota tim** di pengaturan anggota bisnis.",
                "**Menghapus bisnis** (khusus pemilik bisnis). Setelah dihapus, bisnis beserta isinya langsung tidak dapat diakses oleh siapa pun, termasuk anggota tim.",
                "**Mengakhiri sesi login** di perangkat lain melalui halaman Profil.",
              ],
            },
          ],
        },
        {
          id: "hapus-akun",
          title: "Menghapus akun Postmatic sepenuhnya",
          blocks: [
            { type: "steps", items: [
              `Kirim email ke **${EMAIL}** dari alamat email yang terdaftar di Postmatic.`,
              "Gunakan judul email **Permintaan Penghapusan Akun**.",
              "Tuliskan alamat email akun Anda. Jika ada, sertakan juga nama bisnis yang ingin ikut dihapus.",
              "Kami akan memastikan bahwa permintaan benar-benar berasal dari pemilik akun, lalu memprosesnya sesuai jangka waktu yang diatur peraturan perundang-undangan.",
              "Anda akan menerima email konfirmasi setelah penghapusan selesai.",
            ] },
            { type: "p", text: "**Data yang dihapus:** akun dan profil, bisnis yang Anda miliki beserta produk, konten, avatar, dan jadwal, koneksi media sosial, serta sesi login." },
            {
              type: "p",
              text: "**Data yang tetap disimpan:** catatan transaksi dan invoice, selama diwajibkan oleh peraturan perpajakan dan akuntansi, serta catatan keamanan dalam jangka waktu terbatas. Data ini tidak lagi dipakai untuk keperluan lain.",
            },
            {
              type: "note",
              text: "Perlu diketahui: sisa Postmatic Token di akun akan hangus dan tidak dapat dikembalikan setelah akun dihapus. Jika Anda hanya anggota tim (bukan pemilik), menghapus akun akan mengeluarkan Anda dari tim, sedangkan bisnisnya tetap dimiliki oleh pemiliknya.",
            },
          ],
        },
        {
          id: "facebook-instagram",
          title: "Mencabut akses dari Facebook dan Instagram",
          blocks: [
            {
              type: "p",
              text: "Anda dapat menghapus Postmatic langsung dari pengaturan Facebook atau Instagram. Saat Anda melakukannya, Meta mengirimkan permintaan penghapusan ke Postmatic, lalu data koneksi akun tersebut (termasuk token akses) **kami hapus otomatis**.",
            },
            { type: "p", text: "**Facebook:**" },
            {
              type: "steps",
              items: [
                "Buka Facebook, lalu masuk ke **Pengaturan & privasi → Pengaturan**.",
                "Pilih **Aplikasi dan situs web**.",
                "Cari **Postmatic**, lalu klik **Hapus**.",
              ],
            },
            { type: "p", text: "**Instagram:**" },
            {
              type: "steps",
              items: [
                "Buka Instagram, lalu masuk ke **Pengaturan dan privasi**.",
                "Pilih **Aplikasi dan situs web** (pada beberapa versi berada di menu Pusat Akun).",
                "Cari **Postmatic**, lalu pilih **Hapus**.",
              ],
            },
            {
              type: "p",
              text: "Setelah permintaan diproses, Facebook akan menampilkan kode konfirmasi dan tautan untuk memeriksa status penghapusan. Nama menu dapat sedikit berbeda tergantung versi aplikasi.",
            },
          ],
        },
        {
          id: "google-linkedin",
          title: "Mencabut akses Google dan LinkedIn",
          blocks: [
            {
              type: "list",
              items: [
                "**Google:** buka [myaccount.google.com/permissions](https://myaccount.google.com/permissions), pilih Postmatic, lalu hapus akses. Langkah ini menghentikan login dengan Google, tetapi tidak menghapus akun Postmatic Anda. Untuk menghapus akun, ikuti langkah di bagian sebelumnya.",
                "**LinkedIn:** putuskan koneksi di halaman Business Knowledge, atau cabut akses Postmatic dari pengaturan LinkedIn di bagian **Data privacy → Permitted services**.",
              ],
            },
          ],
        },
        {
          id: "konten-terposting",
          title: "Konten yang sudah dipublikasikan",
          blocks: [
            {
              type: "p",
              text: "Menghapus data di Postmatic tidak menghapus postingan yang sudah tampil di Facebook, Instagram, atau LinkedIn. Postingan tersebut berada di platform masing-masing dan perlu Anda hapus langsung dari akun media sosial Anda.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Kebijakan Cookie
    cookiePolicy: {
      title: "Kebijakan Cookie",
      intro:
        "Halaman ini menjelaskan cookie dan penyimpanan browser yang dipakai di situs Postmatic (postmatic.id), halaman masuk, dan workspace, beserta cara mengaturnya.",
      summary: [
        "Kami memakai cookie terutama agar Anda **tetap masuk ke akun** dan pengaturan Anda (bahasa, tema, pilihan cookie) tersimpan.",
        "**Saat ini kami tidak memasang cookie iklan atau pelacak dari pihak ketiga** di situs kami.",
        "Jika nanti kami menambahkan alat analitik atau iklan, alat tersebut hanya aktif setelah Anda menyetujuinya.",
        "Anda dapat mengatur atau menghapus cookie kapan saja melalui browser.",
      ],
      sections: [
        {
          id: "apa-itu-cookie",
          title: "Apa itu cookie",
          blocks: [
            {
              type: "p",
              text: "Cookie adalah file kecil yang disimpan browser saat Anda membuka sebuah situs. Selain cookie, situs juga bisa memakai **penyimpanan lokal** (local storage) di browser untuk mengingat pengaturan. Keduanya membantu situs mengenali Anda dan mengingat pilihan Anda.",
            },
          ],
        },
        {
          id: "cookie-wajib",
          title: "Cookie wajib (agar Anda tetap masuk)",
          blocks: [
            { type: "p", text: "Cookie ini diperlukan agar fitur login berjalan. Tanpa cookie ini, Anda tidak dapat masuk ke Postmatic." },
            {
              type: "list",
              items: [
                "**postmaticAccessToken** dan **postmaticRefreshToken**: menjaga Anda tetap masuk di halaman masuk dan workspace Postmatic. Keduanya berlaku sampai sesi berakhir atau Anda keluar.",
                "**postmaticGoogleLoginPending**: melindungi proses masuk dengan Google dari penyalahgunaan. Berlaku hanya 15 menit.",
                "**Cloudflare Turnstile**: halaman masuk dan daftar memakai Turnstile untuk membedakan manusia dan bot. Layanan ini dapat menggunakan cookie atau penyimpanan browser miliknya sendiri.",
              ],
            },
          ],
        },
        {
          id: "cookie-preferensi",
          title: "Cookie dan penyimpanan untuk preferensi",
          blocks: [
            {
              type: "list",
              items: [
                "**NEXT_LOCALE**: mengingat bahasa yang Anda pilih lewat tombol bahasa di situs.",
                "**theme**: mengingat tampilan terang atau gelap yang Anda pilih.",
                "**cookieConsent** dan **cookiePrefs**: mengingat pilihan Anda pada pemberitahuan cookie, agar pemberitahuan tidak muncul terus-menerus.",
                "**Pengaturan tampilan workspace**: menyimpan pengaturan kecil di browser, misalnya pilihan tampilan, agar tetap sama saat Anda kembali.",
              ],
            },
          ],
        },
        {
          id: "analitik-iklan",
          title: "Cookie analitik dan iklan",
          blocks: [
            {
              type: "p",
              text: "Pemberitahuan cookie di situs kami menyediakan pilihan untuk cookie analitik dan iklan. **Saat ini kami belum memasang alat analitik maupun iklan dari pihak ketiga**, sehingga pilihan tersebut belum mengaktifkan apa pun.",
            },
            {
              type: "p",
              text: "Jika nanti kami menambahkannya, alat tersebut hanya akan aktif jika Anda menyetujuinya, dan kebijakan ini akan kami perbarui terlebih dahulu.",
            },
          ],
        },
        {
          id: "mengatur-cookie",
          title: "Cara mengatur cookie",
          blocks: [
            {
              type: "list",
              items: [
                "Gunakan tombol **Kelola cookie** pada pemberitahuan cookie di situs kami.",
                "Hapus atau blokir cookie melalui pengaturan browser Anda (Chrome, Safari, Firefox, Edge, dan lainnya).",
                "Jika Anda menghapus cookie wajib, Anda akan keluar dari akun dan perlu masuk kembali.",
              ],
            },
          ],
        },
        {
          id: "perubahan-cookie",
          title: "Perubahan kebijakan ini",
          blocks: [
            {
              type: "p",
              text: "Kami akan memperbarui halaman ini jika ada perubahan cookie yang kami gunakan. Tanggal pembaruan terakhir tercantum di bagian atas halaman. Baca juga [Kebijakan Privasi](/privacy-policy) kami.",
            },
          ],
        },
      ],
    },
  },
};
