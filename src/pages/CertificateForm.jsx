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
    semester: "1°",
    previousDonor: "",
    donationIntent: "",
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
          date={new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
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
            Sarau FICS
          </p>
        </div>

        {message && (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">{message}</p>
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
                className="focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
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
                className="focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
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
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-150 ease-in-out"
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
                    className="focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
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
                    className="focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                  >
                    <option value="1°">1° Semestre</option>
                    <option value="2°">2° Semestre</option>
                    <option value="3°">3° Semestre</option>
                    <option value="4°">4° Semestre</option>
                    <option value="5°">5° Semestre</option>
                    <option value="6°">6° Semestre</option>
                    <option value="7°">7° Semestre</option>
                    <option value="8°">8° Semestre</option>
                  </select>
                </div>

                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 transition duration-150 ease-in-out"
                    placeholder="RG"
                    value={formData.rg}
                    onChange={(e) =>
                      setFormData({ ...formData, rg: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mt-6">
                1. Você já era doador de sangue antes da palestra?
                <span className="text-blue-500 ml-1">*</span>
              </label>
              <div className="space-y-2">
                {[
                  { value: "Sim", label: "Sim" },
                  { value: "Não", label: "Não" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`previousDonor-${option.value}`}
                      name="previousDonor"
                      value={option.value}
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={formData.previousDonor === option.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousDonor: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor={`previousDonor-${option.value}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>

              <label className="block text-sm font-medium text-gray-700 mt-6">
                2. Após a palestra, qual é a sua disposição para doar sangue?
                <span className="text-blue-500 ml-1">*</span>
              </label>
              <div className="space-y-2">
                {[
                  { value: "certeza", label: "Com certeza pretendo doar" },
                  {
                    value: "interessado",
                    label: "Fiquei interessado, mas ainda tenho dúvidas",
                  },
                  {
                    value: "provavelmente-nao",
                    label: "Provavelmente não vou doar",
                  },
                  { value: "nao-pretendo", label: "Pretendo não doar" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`donationIntent-${option.value}`}
                      name="donationIntent"
                      value={option.value}
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={formData.donationIntent === option.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          donationIntent: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor={`donationIntent-${option.value}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed"
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
