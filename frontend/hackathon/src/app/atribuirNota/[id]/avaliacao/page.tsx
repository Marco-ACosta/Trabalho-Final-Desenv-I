"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../services/api";

interface Avaliacao {
  id: number;
  notas: {
    originalidade: number;
    impacto: number;
    execucao: number;
    apresentacao: number;
    viabilidade: number;
  };
}

export default function AvaliarEquipe() {
  const params = useParams();
  const idAvaliacao = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10); //sim, essa parte tive q pegar do chatgpt, a maneira de usar o useparams como visto em aula nao tava dando certo
  const router = useRouter();
  const [formData, setFormData] = useState<Avaliacao>({
    id: idAvaliacao,
    notas: {
      originalidade: 0,
      impacto: 0,
      execucao: 0,
      apresentacao: 0,
      viabilidade: 0,
    },
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: idAvaliacao,
    }));
  }, [idAvaliacao]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, pergunta: string) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      notas: {
        ...prevFormData.notas,
        [pergunta]: parseInt(value),
      },
    }));
  };

  const makePutRequest = async () => {
    try {
      const response = await api.put(`/avaliacoes/${idAvaliacao}`, {
        notas: formData.notas,
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
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2 mb-8">
        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label className="text-white">Originalidade do Projeto: Qual a inovação e originalidade do projeto apresentado pela equipe?</label>
          <input
            type="number"
            name="originalidade"
            value={formData.notas.originalidade}
            onChange={(e) => handleChange(e, "originalidade")}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            min="0"
            max="10"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label className="text-white">Impacto Potencial: Qual o impacto potencial do projeto na sociedade ou no mercado?</label>
          <input
            type="number"
            name="impacto"
            value={formData.notas.impacto}
            onChange={(e) => handleChange(e, "impacto")}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            min="0"
            max="10"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label className="text-white">Execução Técnica: Qual a qualidade da execução técnica e da implementação do projeto?</label>
          <input
            type="number"
            name="execucao"
            value={formData.notas.execucao}
            onChange={(e) => handleChange(e, "execucao")}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            min="0"
            max="10"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label className="text-white">Apresentação e Demonstração: Quão clara e eficaz foi a apresentação e demonstração do projeto pela equipe?</label>
          <input
            type="number"
            name="apresentacao"
            value={formData.notas.apresentacao}
            onChange={(e) => handleChange(e, "apresentacao")}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            min="0"
            max="10"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label className="text-white">Viabilidade e Sustentabilidade: Quão viável e sustentável é o projeto a longo prazo?</label>
          <input
            type="number"
            name="viabilidade"
            value={formData.notas.viabilidade}
            onChange={(e) => handleChange(e, "viabilidade")}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            min="0"
            max="10"
          />
        </div>

        <button
          type="button"
          onClick={makePutRequest}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Atribuir notas
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
