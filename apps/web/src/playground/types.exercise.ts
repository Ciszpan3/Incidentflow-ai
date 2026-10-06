type LoadState<T> = {status: "loading"} | {status: "success"; data: T} | {status: "error"; message: string}

export function label<T>(state: LoadState<T>): string {
    switch(state.status) {
        case "loading": return "Pobieranie";
        case "success": return `Gotowe: ${JSON.stringify(state.data)}`;
        case "error": return state.message;
        default: {
            const exhaustive: never = state;
            return exhaustive
        }
    }
}

const example: LoadState<number> = {status:"success", data: 42}
console.log(label(example))