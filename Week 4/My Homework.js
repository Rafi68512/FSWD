/*
SOAL
- Buatlah 100 nilai random (1 sampai 50) pada 1 array
- Pecahlah menjadi 2 array berdasarkan indexnya, yakni array pada index genap dan array pada index ganjil, gunakan method push() untuk menambahkan 
nilai baru pada array
- Gunakan 2 array yang telah dibuat untuk mendapatkan
- Min
- Max
- Total
- Rata rata
- Bandingkan kedua buah array, contoh
- Min lebih besar array genap
- Max lebih besar array ganjil
- Total memiliki nilai sama antara array genap dan ganjil
- Rata rata lebih besar array ganjil

Output dari aplikasi:

- Array dengan jumlah index 100
- Array genap dengan jumlah index 50
- Array ganjil dengan jumlah index 50
- Min, Max, Total, Rata rata pada setiap array (genap dan ganjil)
- Perbandingan nilai min, max, total dan rata rata

Catatan :

- Dilarang menggunakan fungsi bawaan untuk min, max, total dan rata rata
- Buatlah menjadi beberapa fungsi agar kode dapat digunakan kembali
- Push ke REPO dan upload link REPO, tolong repo dalam status public
*/

/*
Nama : Muhammad Rafi
FSWD : 2B
*/

// Random Values
let randomValues = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 50) + 1
);

// Even and Odd Values
let [evenIndexArray, oddIndexArray] = randomValues.reduce(
  ([even, odd], value, index) => {
    index % 2 === 0 ? even.push(value) : odd.push(value);
    return [even, odd];
  },
  [[], []]
);

console.log("Array nilai acak:", randomValues);
console.log("Array pada index genap:", evenIndexArray);
console.log("Array pada index ganjil:", oddIndexArray);
