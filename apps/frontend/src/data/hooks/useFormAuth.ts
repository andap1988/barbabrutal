import { useEffect, useState } from "react"
import useAPI from "./useAPI"
import useSessao from "./useSessao"
import { useRouter, useSearchParams } from "next/navigation"

export default function useFormAuth() {
    const [modo, setModo] = useState<"login" | "cadastro">("login")

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [telefone, setTelefone] = useState("")

    const { httpGet, httpPost } = useAPI()
    const { usuario, iniciarSessao } = useSessao()
    const router = useRouter()
    const params = useSearchParams()

    useEffect(() => {
        if (usuario?.email) {
            const destino = params.get("destino") as string
            router.push(destino ? destino : "/")
        }
    }, [usuario, router, params])

    function alternarModo() {
        setModo(modo === "login" ? "cadastro" : "login")
    }

    async function submeter() {
        if (modo === "login") {
            await login()
        } else {
            await registrar()
            await login()
        }
        limparForm()
    }

    async function registrar() {
        await httpPost("auth/registrar", { nome, email, senha, telefone })
    }

    async function login() {
        const token = await httpPost("auth/login", { email, senha })
        iniciarSessao(token)
    }

    function limparForm() {
        setNome("")
        setEmail("")
        setSenha("")
        setTelefone("")
        setModo("login")
    }

    return {
        modo,
        nome,
        email,
        senha,
        telefone,
        alterarNome: setNome,
        alterarEmail: setEmail,
        alterarSenha: setSenha,
        alterarTelefone: setTelefone,
        alternarModo,
        submeter,
    }
}
