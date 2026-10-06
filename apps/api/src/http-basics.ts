async function readJson<T>(response: Response): Promise<T> {
    if (!response.ok){
        throw new Error(`HTTP ${response.status}: ${await response.text()}`)
    }
    return (await response.json() as T) // T dla ts (niepotrzebne)
}

type Health = { status: "ok" }
const response = new Response(JSON.stringify({ status: "ok" }), {
    status: 200, headers: { "content-type": "application/json" }
})

void readJson<Health>(response).then(console.log)

