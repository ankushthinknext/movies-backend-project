const jwt = require("jsonwebtoken");

//token creation
let result = jwt.sign(
	{ name: "Ram", id: 1, address: "Mohali", role: "Admin" },
	"sercetkey",
);
console.log(result);
//token verification
// let token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFtIiwiaWQiOjEsImFkZHJlc3MiOiJNb2hhbGkiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MjQ2MTcwMDd9.WRFqhViPlnUI1XSZ4fLX8rS37_rNRZNm_4Uno3NEfMw";

// let decodedInfo = jwt.verify(token, "sercetkey");
// console.log(decodedInfo);
