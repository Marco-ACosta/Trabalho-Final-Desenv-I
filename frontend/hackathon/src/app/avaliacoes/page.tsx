"use client";

import { useEffect, useState } from "react";
import api from "../../app/services/api";
import { useRouter } from "next/navigation";
import Sobre from "../../public/sobre.jpg";

interface Notas {
  notas: {}
  originalidade: number;
  impacto: number;
  execucao: number;
  apresentacao: number;
  viabilidade: number;
}

interface Avaliacao {
  id: number;
  avaliador_id: number;
  equipe_id: number;
  notas: Notas;
}

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get('/avaliacoes')
      .then(response => {
        const filteredAvaliacoes = response.data.filter((avaliacao: Avaliacao) =>
          avaliacao.notas && Object.keys(avaliacao.notas.notas || {}).length > 0
        ).map((avaliacao: Avaliacao) => ({
          ...avaliacao,
          notas: avaliacao.notas.notas
        }));
        setAvaliacoes(filteredAvaliacoes);
      })
      .catch(error => {
        console.error('Erro ao chamar a API:', error);
      });
  }, []);

  function voltar() {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-800 py-6 text-center flex flex-col items-center sm:py-12">
      <button onClick={voltar} className="self-start ml-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Voltar</button>
      <h1 className="text-3xl font-bold text-center pt-2 pb-4 text-white">Avaliações já realizadas</h1>
      <div>
        <section className="grid grid-cols-3 gap-4">
          {avaliacoes.length > 0 ? (
            avaliacoes.map((avaliacao: Avaliacao) => (
              <div
                key={avaliacao.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6"
              >
                <div className="flex items-center justify-center text-center mb-4">
                  <span className="inline-block bg-gray-200 px-6 py-4 text-sm font-semibold text-gray-700">
                    Avaliação ID: {avaliacao.id}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-gray-700">Originalidade: {avaliacao.notas.originalidade ?? 'N/A'}</p>
                  <p className="text-gray-700">Impacto: {avaliacao.notas.impacto ?? 'N/A'}</p>
                  <p className="text-gray-700">Execução: {avaliacao.notas.execucao ?? 'N/A'}</p>
                  <p className="text-gray-700">Apresentação: {avaliacao.notas.apresentacao ?? 'N/A'}</p>
                  <p className="text-gray-700">Viabilidade: {avaliacao.notas.viabilidade ?? 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-white">Sem avaliações com notas atribuídas</h1>
          )}
        </section>
      </div>
    </div>
  );
}
