"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../app/services/api";

interface Avaliacoes {
  id: number;
  avaliador_id: number;
  equipe_id: number;
  notas: {
    originalidade: number;
    impacto: number;
    execucao: number;
    apresentacao: number;
    viabilidade: number;
  };
}

export default function Home() {
  const [avaliadores, setAvaliadores] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacoes[]>([]);
  const [loadingAvaliadores, setLoadingAvaliadores] = useState(true);
  const [loadingEquipes, setLoadingEquipes] = useState(true);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(true);

  useEffect(() => {
    api.get('/avaliadores')
      .then(response => {
        setAvaliadores(response.data);
        setLoadingAvaliadores(false);
      })
      .catch(error => {
        console.error('Erro ao chamar a API de avaliadores:', error);
        setLoadingAvaliadores(false);
      });
  }, []);

  useEffect(() => {
    api.get('/equipes')
      .then(response => {
        setEquipes(response.data);
        setLoadingEquipes(false);
      })
      .catch(error => {
        console.error('Erro ao chamar a API de equipes:', error);
        setLoadingEquipes(false);
      });
  }, []);

  useEffect(() => {
    api.get('/avaliacoes')
      .then(response => {
        const filteredAvaliacoes = response.data.filter((avaliacao: Avaliacoes) =>
          Object.keys(avaliacao.notas).length > 0
        );
        setAvaliacoes(filteredAvaliacoes);
        setLoadingAvaliacoes(false);
      })
      .catch(error => {
        console.error('Erro ao chamar a API de avaliações:', error);
        setLoadingAvaliacoes(false);
      });
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-800 py-6 text-center flex flex-row justify-center sm:py-12"
      style={{ backgroundImage: `url('/sobre.jpg')`, backgroundPosition: 'center' }}
    >
      <div className="max-w-sm rounded overflow-hidden mx-4">
        <div className="px-6 py-4 bg-white">
          {loadingAvaliadores ? (
            <div className="font-bold text-xl mb-2 text-gray-800">Carregando...</div>
          ) : (
            <div>
              <div className="font-bold text-xl mb-2 text-gray-800">Avaliadores</div>
              <p className="text-gray-700 text-base">
                Total de avaliadores: {avaliadores.length}
              </p>
              <div className="flex justify-center">
                <Link href="/avaliadores/">
                  <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-5">
                    Avaliadores
                  </button>
                </Link>
                <Link href="/novoAvaliador/">
                  <button className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-5">
                    Cadastrar avaliador
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-sm rounded overflow-hidden">
        <div className="px-6 py-4 bg-white">
          {loadingEquipes ? (
            <div className="font-bold text-xl mb-2 text-gray-800">Carregando...</div>
          ) : (
            <div>
              <div className="font-bold text-xl mb-2 text-gray-800">Equipes</div>
              <p className="text-gray-700 text-base">
                Total de equipes: {equipes.length}
              </p>
              <div className="flex justify-center">
                <Link href="/equipes">
                  <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-5">
                    Equipes
                  </button>
                </Link>
                <Link href="/novaEquipe">
                  <button className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-5">
                    Cadastrar equipe
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-sm rounded overflow-hidden ml-5">
        <div className="px-6 py-4 bg-white">
          {loadingAvaliacoes ? (
            <div className="font-bold text-xl mb-2 text-gray-800">Carregando...</div>
          ) : (
            <div>
              <div className="font-bold text-xl mb-2 text-gray-800">Avaliações</div>
              <p className="text-gray-700 text-base">
                Total de notas já atribuídas: {avaliacoes.length}
              </p>
              <div className="flex justify-center">
                <Link href="/avaliacoes">
                  <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-5">
                    Avaliações
                  </button>
                </Link>
                <Link href="/atribuirAvaliador">
                  <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-5">
                    Atribuir avaliador
                  </button>
                </Link>
                <Link href="/atribuirNota">
                  <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-5">
                    Atribuir nota
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
