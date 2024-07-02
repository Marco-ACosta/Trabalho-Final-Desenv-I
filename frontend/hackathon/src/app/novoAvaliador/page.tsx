"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../app/services/api";

interface formAvaliador {
  nome: string,
  login: string,
  password: string
}

export default function NewUser() {
  const router = useRouter();
  const [formDataAvaliador, setFormDataAvaliador] = useState<formAvaliador>({
    nome: "",
    login: "",
    password: "",
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

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormDataAvaliador((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
        setFormDataAvaliador((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("/avaliadores", {
        ...formDataAvaliador,
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
          <label>Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={formDataAvaliador.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Login</label>
          <input
            type="text"
            name="login"
            value={formDataAvaliador.login}
            onChange={handleChange}
            placeholder="Login"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>senha</label>
          <input
            type="text"
            name="password"
            value={formDataAvaliador.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>


        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar avaliador
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