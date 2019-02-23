// module.exports = () => {
//   // ...


// };
// let readLincks= require ("readLincks")
// md.readLincks("./readme.md",function(err){
//   if (err){
//     console.log(err)
//   }
// })
// const result= md.readLincks("","")


const fs= require("fs");
fs.readFile('./README.md',function(err, data){
  if (err){
    console.log(err);
  }
  console.log(data.toString());
})
