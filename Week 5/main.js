// Class pendaftar
class Pendaftar {
  constructor(nama, umur, uangSaku) {
    this.nama = nama;
    this.umur = umur;
    this.uangSaku = uangSaku;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Seleksi elemen-elemen HTML
  const form = document.querySelector("form");
  const listPendaftar = document.querySelector("#list_pendaftar tbody");
  const rataRataUmurElement = document.getElementById("rata_rata_umur");
  const rataRataUangSakuElement = document.getElementById(
    "rata_rata_uang_saku"
  );
  const pendaftarList = []; // Array untuk menyimpan pendaftar

  // Fungsi untuk menampilkan pesan kesalahan
  function showError(message) {
    alert(message);
  }

  // Fungsi untuk menambahkan pendaftar ke tabel
  function addPendaftarToTable(pendaftar) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${pendaftar.nama}</td>
        <td>${pendaftar.umur}</td>
        <td>${pendaftar.uangSaku}</td>
        <td><button class="btn btn-danger delete">Delete</button></td>
      `;

    // Tambahkan event listener untuk tombol delete
    newRow.querySelector(".delete").addEventListener("click", function () {
      // Hapus pendaftar dari array
      const index = pendaftarList.indexOf(pendaftar);
      if (index !== -1) {
        pendaftarList.splice(index, 1);
      }

      listPendaftar.removeChild(newRow);
      updateRataRata();
    });

    listPendaftar.appendChild(newRow);
    updateRataRata();
  }

  // Fungsi untuk menghitung dan menampilkan rata-rata umur dan uang saku
  function updateRataRata() {
    if (pendaftarList.length === 0) {
      rataRataUmurElement.textContent = "Tidak ada data";
      rataRataUangSakuElement.textContent = "Tidak ada data";
      return;
    }

    let totalUmur = 0;
    let totalUangSaku = 0;

    pendaftarList.forEach((pendaftar) => {
      totalUmur += pendaftar.umur;
      totalUangSaku += pendaftar.uangSaku;
    });

    const rataRataUmur = (totalUmur / pendaftarList.length).toFixed(2);
    const rataRataUangSaku = (totalUangSaku / pendaftarList.length).toFixed(2);

    rataRataUmurElement.textContent = rataRataUmur;
    rataRataUangSakuElement.textContent = rataRataUangSaku;
  }

  // Event listener untuk form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const namaInput = document.getElementById("nama").value;
    const umurInput = parseInt(document.getElementById("umur").value);
    const uangSakuInput = parseInt(document.getElementById("uang_saku").value);

    // Validasi data
    if (namaInput.length < 10) {
      showError("Nama harus minimal 10 karakter.");
    } else if (umurInput < 25) {
      showError("Umur harus minimal 25 tahun.");
    } else if (uangSakuInput < 100000 || uangSakuInput > 1000000) {
      showError("Uang saku harus antara 100 ribu dan 1 juta.");
    } else {
      // Buat objek Pendaftar
      const pendaftar = new Pendaftar(namaInput, umurInput, uangSakuInput);

      // Tambahkan pendaftar ke array
      pendaftarList.push(pendaftar);

      // Tambahkan pendaftar ke tabel
      addPendaftarToTable(pendaftar);

      // Bersihkan input
      document.getElementById("nama").value = "";
      document.getElementById("umur").value = "";
      document.getElementById("uang_saku").value = "";
    }
  });
});
