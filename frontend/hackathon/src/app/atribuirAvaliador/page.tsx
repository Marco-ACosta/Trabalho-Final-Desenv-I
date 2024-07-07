"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import api from "../../app/services/api";
import axios from "axios";

interface Equipe {
  id: number;
  nome: string;
}

interface Avaliador {
  id: number;
  nome: string;
}

export default function NewUser() {
  const router = useRouter();
  const [equipe, setEquipe] = useState<Equipe[]>([]);
  const [avaliador, setAvaliador] = useState<Avaliador[]>([]);
  const [formData, setFormData] = useState({
    equipeId: "",
    avaliadorId: "",
  });

  useEffect(() => {
    api.get('/avaliadores')
      .then(response => {
        setAvaliador(response.data);
      })
      .catch(error => {
        console.error('Erro ao chamar a API:', error);
      });
  }, []);

  useEffect(() => {
    api.get('/equipes')
      .then(response => {
        setEquipe(response.data);
      })
      .catch(error => {
        console.error('Erro ao chamar a API:', error);
      });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const makePostRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/avaliacoes", {
        ...formData,
        notas: {} 
      });

      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Selecione a equipe</label>
          <select
            name="equipeId"
            value={formData.equipeId}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          >
            <option value="">Selecione uma equipe</option>
            {equipe.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Selecione o avaliador</label>
          <select
            name="avaliadorId"
            value={formData.avaliadorId}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          >
            <option value="">Selecione um avaliador</option>
            {avaliador.map((av) => (
              <option key={av.id} value={av.id}>
                {av.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar avaliação
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
