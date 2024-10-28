"use client"

import { Servico } from "@barbabrutal/core"
import UseAPI from "./useAPI"
import { useCallback, useEffect, useState } from "react"

export default function useServicos() {
    const { httpGet } = UseAPI()
    const [servicos, setServicos] = useState<Servico[]>([])

    const carregarServicos = useCallback(
        async function () {
            const servicos = await httpGet("servicos")
            setServicos(servicos)
        },
        [httpGet]
    )

    useEffect(() => {
        carregarServicos()
    }, [carregarServicos])

    return { servicos }
}
