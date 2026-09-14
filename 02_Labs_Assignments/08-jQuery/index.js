/*/$("input").keypress( (event) => console.log(event.key));
$(document).keypress( (event) => $("h1").text(event.key));
$("h1").on("mouseover mouseout", function () {
 $("h1").toggleClass("to-purple")
});


let mutiply = (a, b) => a * b;
console.log(mutiply(2, 3));

let hello = (name) => `Hello ${name}!`;
console.log(hello("Keyes"));

const students = [ 
{ name: 'Quincy', grade: 96 }, { name: 'Jason', grade: 84 }, { name: 'Alexis', grade: 100 }, { name: 'Sam', grade: 65 }, { name: 'Katie', grade: 90 } ]; 
const studentGrades = students.filter(student => 
student.grade >= 90
); 
console.log(studentGrades);// [ { name: 'Quincy', grade: 96 }, { name: 'Alexis', grade: 100 }, { name: 'Katie', grade: 90 } ]

let a = [1,2,3,4,5];

let sum = a.reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum)/*/