"use client"

import { useEffect, useState } from "react";
import api from "../../app/services/api";
import { useRouter } from "next/navigation";

interface Equipe {
    id: number,
    nome: string;
    // outras propriedades que você possa ter
}

export default function Avaliacoes() {
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const router = useRouter();

    useEffect(() => {
        api.get('/equipes')
          .then(response => {
            setEquipes(response.data);
          })
          .catch(error => {
            console.error('Erro ao chamar a API:', error);
          });
      }, []);

      const atribuirNota = (avaliacaoId: number) => {
        router.push(`/atribuir-nota/${avaliacaoId}`);
      };

      function voltar() {
        router.push("/");
      }

      return (
        <div className="min-h-screen bg-gray-800 py-6 text-center flex flex-col items-center sm:py-12">
            <button onClick={voltar} className="self-start ml-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Voltar</button>
            <h1 className="text-3xl font-bold text-center pt-2 pb-4 text-white">Avaliações</h1>
            <div>
                <section className="grid grid-cols-3 gap-4">
                    {equipes.length > 0 ? (
                        equipes.map((equipe: Equipe) => (
                            <div
                                key={equipe.id}
                                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6"
                            >
                                <div className="flex items-center justify-center text-center">
                                    <span className="inline-block bg-gray-200 px-6 py-4 text-sm font-semibold text-gray-700">
                                        {equipe.nome}
                                    </span>
                                </div>
                                <button
                                    onClick={() => atribuirNota(equipe.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 mt-4"
                                    >
                                Atribuir Nota
                                </button>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-white">Sem dados!</h1>
                    )}
                </section>
            </div>
        </div>
    );
}
