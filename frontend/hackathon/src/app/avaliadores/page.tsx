"use client"
import { useEffect, useState } from "react";
import api from "../../app/services/api";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface Avaliadores {
    id : number
    nome: string
  }

export default function Home() {
    const [avaliadores, setAvaliador] = useState<Avaliadores[]>([]);
    const router = useRouter();

    useEffect(() => {
        api.get('/avaliadores')
          .then(response => {
            setAvaliador(response.data);
          })
          .catch(error => {
            console.error('Erro ao chamar a API:', error);
          });
      }, [avaliadores]);

      const deleteAvaliador  = async (avaliadorId: number) => {
        try {
          await api.delete(`/avaliadores/${avaliadorId}`);
          setAvaliador(avaliadores)
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
      <h1 className="text-3xl font-bold text-center pt-2 pb-4 text-white">Avaliadores</h1>
        <div>    
            <section className="flex flex-row justify-center gap-8">
            {avaliadores ? (
                avaliadores.map((avaliador: Avaliadores) => {
                    return (
                    <div
                        key={avaliador.id}
                        className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6 w-64"
                    >
                        <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                        <span className="inline-block bg-gray-200 px-6 py-4 text-sm font-semibold text-gray-700">
                            {avaliador.nome}
                        </span>
                        </div>
                        <button
                            onClick={() => deleteAvaliador(avaliador.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                          Excluir
                        </button>
                    </div>
                    );
                })
                ) : (
          <h1>Sem dados!</h1>
            )}
            </section>
        </div>
    </div>
  );
}
