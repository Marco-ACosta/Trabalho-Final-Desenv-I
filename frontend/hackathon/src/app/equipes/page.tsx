"use client"

import { useEffect, useState } from "react";
import api from "../../app/services/api";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface Equipes {
    id : number
    nome: string
  }


export default function Home() {
    const [equipe, setEquipe] = useState<Equipes[]>([]);
    const router = useRouter();

    useEffect(() => {
        api.get('/equipes')
          .then(response => {
            setEquipe(response.data);
          })
          .catch(error => {
            console.error('Erro ao chamar a API:', error);
          });
      }, [equipe]);

      const deleteEquipe  = async (equipeId: number) => {
        try {
          await api.delete(`/equipes/${equipeId}`);
          setEquipe(equipe)
        } catch (error) {
          console.error("Erro ao excluir avaliador:", error);
        }
      };

      function voltar() {
        router.push("/");
      }

      return (
        <div className="min-h-screen bg-gray-800 py-6 text-center flex flex-col items-center sm:py-12">
            <button onClick={voltar} className=" self-start ml-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Voltar</button>
            <h1 className="text-3xl font-bold text-center pt-2 pb-4 text-white">Equipes</h1>
            <div>
                <section className="grid grid-cols-3 gap-4">
                    {equipe ? (
                        equipe.map((equipe: Equipes) => (
                            <div
                                key={equipe.id}
                                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6"
                            >
                                <div className="flex items-center justify-center text-center">
                                    <span className="inline-block bg-gray-200 px-6 py-4 text-sm font-semibold text-gray-700">
                                        nome: {equipe.nome}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteEquipe(equipe.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                Excluir
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
