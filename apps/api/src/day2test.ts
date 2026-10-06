const ok1 = Promise.resolve('okej')
const ok2 = Promise.resolve('super')

async function Test() {
    try{
        console.log(await Promise.all([ok1,ok2]))
    } catch(error){
        console.log('blad', error)
    }

    console.log(await Promise.allSettled([ok1,ok2]))
}

void Test()
