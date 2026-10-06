console.log("1. Synchronous code start");

setTimeout(() => {
    console.log("5. Timer callback")
}, 0)

Promise.resolve()
    .then(() => console.log(`3. promise microtask`))
    .then(() => console.log("4. chained microtask"))

async function loadHealth() {
    console.log("2. async function")
    await Promise.resolve();
    console.log("6? verify the actual order")
}

void loadHealth()
console.log("2b: synchronus end")