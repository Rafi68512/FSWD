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

function calculation(arr1, arr2) {
  // Menghitung nilai Min
  function getMin(arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;
  }

  // Menghitung nilai Max
  function getMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }

  // Menghitung nilai Total
  function getTotal(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    return total;
  }

  // Menghitung nilai Rata-rata
  function getAverage(arr) {
    if (arr.length === 0) {
      return 0;
    }
    const total = getTotal(arr);
    return total / arr.length;
  }

  const minValue = getMin([...arr1, ...arr2]);
  const maxValue = getMax([...arr1, ...arr2]);
  const totalValue = getTotal([...arr1, ...arr2]);
  const averageValue = getAverage([...arr1, ...arr2]);

  return {
    min: minValue,
    max: maxValue,
    total: totalValue,
    average: averageValue,
  };
}

const statistics = calculation(evenIndexArray, oddIndexArray);

console.log("Statistik dari kedua array:");
console.log("Nilai Minimum:", statistics.min);
console.log("Nilai Maksimum:", statistics.max);
console.log("Total:", statistics.total);
console.log("Rata-rata:", statistics.average);

const statisticsEven = calculation(evenIndexArray, []);
const statisticsOdd = calculation([], oddIndexArray);

console.log("\nStatistik dari array pada index genap:");
console.log("Nilai Minimum:", statisticsEven.min);
console.log("Nilai Maksimum:", statisticsEven.max);
console.log("Nilai Total:", statisticsEven.total);
console.log("Nilai Rata-rata:", statisticsEven.average);

console.log("\nStatistik dari array pada index ganjil:");
console.log("Nilai Minimum:", statisticsOdd.min);
console.log("Nilai Maksimum:", statisticsOdd.max);
console.log("Nilai Total:", statisticsOdd.total);
console.log("Nilai Rata-rata:", statisticsOdd.average);
