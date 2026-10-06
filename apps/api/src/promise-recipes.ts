import { readFile } from "node:fs";

export function readFileText(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        readFile(path, "utf-8", (error, text) => {
            if(error) {
                reject(error)
                return
            } 
            resolve(text)
        })
    })
}

export function showFileLength(path: string): Promise<void> {
    return readFileText(path)
        .then((text) => console.log(text.length))
        .catch((error) => {
            console.error('Read failed', error)
            throw(error)
        })
        .finally(() => console.log("Read attempt finished"))
}

export async function loadDashboard() {
    try {
        const [health, incidents] = await Promise.all([
            fetch("/api/health").then((response) => response.json()),
            fetch("/api/incidents").then((response) => response.json()),
        ]);
        return { health, incidents };
    } catch (error: unknown) {
        throw new Error("Dashboard data could not be loaded", { cause: error });
    }

}
export async function firstAvailableMirror(urls: string[]) {
    return Promise.any(
        urls.map((url) =>
            fetch(url).then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            }),
        ),
    );
}
