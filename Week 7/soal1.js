// Soal 1

const rumus = require("./rumus");

const sisiPersegi = 5;
const panjangPersegiPanjang = 8;
const lebarPersegiPanjang = 4;

console.log(
  `Luas Persegi dengan sisi ${sisiPersegi}: ${rumus.luasPersegi(sisiPersegi)}`
);
console.log(
  `Keliling Persegi dengan sisi ${sisiPersegi}: ${rumus.kelilingPersegi(
    sisiPersegi
  )}`
);
console.log(
  `Luas Persegi Panjang dengan panjang ${panjangPersegiPanjang} dan lebar ${lebarPersegiPanjang}: ${rumus.luasPersegiPanjang(
    panjangPersegiPanjang,
    lebarPersegiPanjang
  )}`
);
console.log(
  `Keliling Persegi Panjang dengan panjang ${panjangPersegiPanjang} dan lebar ${lebarPersegiPanjang}: ${rumus.kelilingPersegiPanjang(
    panjangPersegiPanjang,
    lebarPersegiPanjang
  )}`
);
