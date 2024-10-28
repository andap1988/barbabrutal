import Image from "next/image"
import Link from "next/link"

export default function AgendadoComSucesso() {
    return (
        <div className="flex flex-col items-center">
            <Image
                src="/agendamento.png"
                height={400}
                width={400}
                alt="Agendado com sucesso"
            />
            <h2 className="text-3xl font-black">Iradooo! Tudo marcado!</h2>
            <h3 className="text-zinc-400 text-lg font-thin w-96 text-center">
                Tudo certo por aqui! Seu horário está garantido e agora é só
                aguardar para brilhar!
            </h3>
            <Link href="/" className="button mt-7 bg-green-600">
                Voltar para o início
            </Link>
        </div>
    )
}