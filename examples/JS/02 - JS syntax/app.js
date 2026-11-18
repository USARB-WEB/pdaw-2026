console.log("Hello, World!");
console.log("This is a JavaScript example.");
console.log("You can run this code in a browser console or a Node.js environment.");
console.log("JavaScript is a versatile programming language used for web development.");
console.log("It can be used for both front-end and back-end development.");

/* Variables in JavaScript */
let name = "John Doe";
const age = 30;
var isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);

name = "Jane Smith"; // Reassigning a new value to the variable 'name'
console.log("Updated Name:", name);

//age = 31; // This will throw an error because 'age' is a constant
console.log("Updated Age:", age); // This line will not be executed due to the error above

const pi = 3.14159; // Constant value for pi
let radius = 1; // Variable that can be reassigned

while (radius <= 5) {
    let area = pi * radius * radius; // Calculate area of a circle
    console.log(`Radius: ${radius}, Area: ${area}`);
    radius++; // Increment radius
}

/* Functions in JavaScript */

function calculateRoots(a, b, c) {
    let delta = b * b - 4 * a * c; // Calculate the discriminant
    if (delta > 0) {
        const root1 = (-b + Math.sqrt(delta)) / (2 * a);
        const root2 = (-b - Math.sqrt(delta)) / (2 * a);
        console.log(`The equation has two real roots: ${root1} and ${root2}`);
    } else if (delta === 0) {
        const root = -b / (2 * a);
        console.log(`The equation has one real root: ${root}`);
    } else {
        console.log("The equation has no real roots.");
    }
}

// Examples for each discriminant case
calculateRoots(1, 0, -1); // delta > 0: two real roots
calculateRoots(1, -2, 1); // delta === 0: one real root
calculateRoots(1, 0, 1); // delta < 0: no real roots



