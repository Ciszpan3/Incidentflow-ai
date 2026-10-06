// export async function withTiemout<T>(
//     operation: (signal: AbortSignal) => Promise<T>,
//     timeoutMs: number,
// ): Promise<T> {
//     const controller = new AbortController();
//     const timer = setTimeout(() => controller.abort(), timeoutMs);
//     try {
//         return await operation(controller.signal)
//     } finally {
//         clearTimeout(timer)
//     }
// }

// export async function settleAll<T>(tasks: Array<Promise<T>>){
//     const results = await Promise.allSettled(tasks)
//     const values: T[] = []
//     const errors: unknown[] = []

//     for (const result of results){
//         if(result.status === "fulfilled") {
//             values.push(result.value)
//         } else {
//             errors.push(result.reason)
//         }
//     }
    
//     return {values,errors}
// }

export async function withTiemout<T>(
    task: Promise<T>, milliseconds: number
):Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Timed out")), milliseconds)
    })
    return Promise.race([task, timeout])
}

export async function settleAll<T>(tasks: Promise<T>[]) {
    return Promise.allSettled(tasks)
}

console.log(await withTiemout(Promise.resolve(42), 0))