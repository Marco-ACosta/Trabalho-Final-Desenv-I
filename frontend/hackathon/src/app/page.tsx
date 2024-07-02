"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../app/services/api";

export default function Home() {
    const [avaliadores, setAvaliadores] = useState([]);
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
      api.get('/avaliadores')
        .then(response => {
          setAvaliadores(response.data);
        })
        .catch(error => {
          console.error('Erro ao chamar a API:', error);
        });
    }, []);

    useEffect(() => {
      api.get('/equipes')
        .then(response => {
          setEquipes(response.data);
        })
        .catch(error => {
          console.error('Erro ao chamar a API:', error);
        });
    }, []);

  return (
    <div className="min-h-screen bg-gray-800 py-6 text-center flex flex-row justify-center sm:py-12 ">
      <div className="max-w-sm rounded overflow-hidden  mx-4">
        <div className="px-6 py-4 bg-white">
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
      </div>

      <div className="max-w-sm rounded overflow-hidden ">
        <div className="px-6 py-4 bg-white">
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
      </div>

      
    </div>
  );
}
