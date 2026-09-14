// Homework 9: Using map, filter, and reduce

const numbers = [5, 10, 15, 20, 25];

const newArr = numbers.map(number => number ** 2);
console.log(newArr);

const newArrEven = numbers.filter(evenNumber => evenNumber % 2 === 0);

console.log(newArrEven);


const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(sum);

const students = [
  { id: 1, name: 'Alice', grade: 85 },
  { id: 2, name: 'Bob', grade: 75 },
  { id: 3, name: 'Charlie', grade: 95 },
  { id: 4, name: 'David', grade: 60 }
];

const newArrStudentsNames = students.map(student => student.name);
console.log(newArrStudentsNames);

const passedStudents = students.filter(student => student.grade >= 70);
console.log(passedStudents);

const averageGrade = students.reduce((total, student) => {
  return total + student.grade;
}, 0) / students.length;
console.log(averageGrade);

const products = [
  { id: 1, name: 'Laptop', price: 800 },
  { id: 2, name: 'Mouse', price: 20 },
  { id: 3, name: 'Keyboard', price: 50 },
  { id: 4, name: 'Monitor', price: 150 }
];

const totalValue = products
    .filter(product => product.price >= 100)
    .map(product => product.price * 2)
    .reduce((sum, price) => sum + price, 0);

console.log(`ผลลัพธ์สุดท้ายคือ: ${totalValue}`);