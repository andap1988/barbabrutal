import useSessao from "./useSessao"

export default function UseAPI() {
    const { token } = useSessao()
    const urlBase = process.env.NEXT_PUBLIC_API_URL

    async function httpGet(caminho: string) {
        const uri = caminho.startsWith("/") ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resp = await fetch(urlCompleta, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return extrairDados(resp)
    }

    async function httpPost(caminho: string, body: any) {
        const uri = caminho.startsWith("/") ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resp = await fetch(urlCompleta, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })

        return extrairDados(resp)
    }

    async function extrairDados(resp: Response) {
        let conteudo = ""

        try {
            conteudo = await resp.text()
            return JSON.parse(conteudo)
        } catch (e) {
            return conteudo
        }
    }

    return { httpGet, httpPost }
}
