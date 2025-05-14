import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { FiUser, FiMail, FiFileText } from "react-icons/fi";
import { pdf } from "@react-pdf/renderer";
import CertificateTemplate from "../components/CertificateTemplate";

function CertificateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rg: "",
    isInstitutionStudent: false,
    course: "",
    semester: "2023.2", // Add default semester
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "certificates"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      // Generate PDF
      const blob = await pdf(
        <CertificateTemplate
          name={formData.name}
          date={new Date().toLocaleDateString("pt-BR")}
          course={formData.course}
          semester={formData.semester}
        />
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificado-${formData.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessage("Certificado gerado com sucesso!");
    } catch (error) {
      console.error(error);
      setMessage("Erro ao gerar certificado. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-2xl mt-32">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Certificado de Participação
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Palestra sobre Doação de Sangue
          </p>
        </div>

        {message && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{message}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                className="focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex items-center py-2">
              <input
                type="checkbox"
                id="isStudent"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded transition duration-150 ease-in-out"
                checked={formData.isInstitutionStudent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isInstitutionStudent: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="isStudent"
                className="ml-2 block text-sm text-gray-900"
              >
                Sou aluno da instituição
              </label>
            </div>

            {formData.isInstitutionStudent && (
              <div className="space-y-5">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
                    placeholder="Nome do Curso"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                  />
                </div>

                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                  >
                    <option value="1">Primeiro</option>
                    <option value="2">Segundo</option>
                    <option value="3">Terceiro</option>
                    <option value="4">Quarto</option>
                    <option value="5">Quinto</option>
                    <option value="6">Sexto</option>
                    <option value="7">Sétimo</option>
                    <option value="8">Oitavo</option>
                  </select>
                </div>

                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
                    placeholder="RG"
                    value={formData.rg}
                    onChange={(e) =>
                      setFormData({ ...formData, rg: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Gerando...
              </span>
            ) : (
              "Gerar Certificado"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CertificateForm;
