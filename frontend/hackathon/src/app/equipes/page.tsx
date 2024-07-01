"use client"

import { useEffect, useState } from "react";
import api from "../../app/services/api";
import { AxiosResponse } from "axios";

interface Equipes {
    id : number
    nome: string
  }

// async function getEquipes(): Promise<any> {
//     const result = await api.get("/equipes");
//     return result.data;
// }

export default async function Home() {
    const [equipe, setEquipe] = useState<Equipes[]>([]);
    //const avaliadores = await getEquipes()

    useEffect(() => {
        api.get('/equipes')
          .then(response => {
            setEquipe(response.data);
            console.log(equipe)
          })
          .catch(error => {
            console.error('Erro ao chamar a API:', error);
          });
      }, []);

  return (
    <div className="min-h-screen bg-gray-800 py-6 text-center flex flex-row justify-center sm:py-12 ">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-12">
            <h1 className="text-3xl font-bold text-center pt-2 pb-4">Equipes</h1>
            <section className="grid grid-cols-3 gap-4 ">
            {equipe ? (
                equipe.map((equipe: Equipes) => {
                    return (
                    <div
                        key={equipe.id}
                        className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
                    >
                        <div className="px-6 pt-4  pb-4 flex items-center justify-center text-center">
                        <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            nome: {equipe.nome}
                        </span>
                        </div>
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
