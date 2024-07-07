"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../app/services/api";

interface formEquipe {
  nome: string,
}

export default function NewUser() {
  const router = useRouter();
  const [formDataEquipe, setFormDataEquipe] = useState<formEquipe>({
    nome: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.type);

     setFormDataEquipe((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("/equipes", {
        ...formDataEquipe,
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
          <label>Nome da equipe</label>
          <input
            type="text"
            name="nome"
            value={formDataEquipe.nome}
            onChange={handleChange}
            placeholder="Nome da equipe"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>


        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar equipe
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