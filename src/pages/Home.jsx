import React from "react";
import { Link } from "react-router-dom";
import { FiAward } from "react-icons/fi";

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-0">
      <div className="max-w-3xl text-center my-8 sm:my-0">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6">
          Certificados de Participação
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          Gere seu certificado do Sarau FICS de forma rápida e simples.
        </p>

        <Link
          to="/certificate"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 text-lg font-medium shadow-lg hover:shadow-xl"
        >
          <FiAward className="text-2xl" />
          <span>Gerar Certificado</span>
        </Link>

        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">
            Como funciona?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="text-blue-600 text-3xl font-bold mb-3">1</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Preencha seus dados
              </h3>
              <p className="text-gray-600">Informe seu nome e dados do curso</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="text-blue-600 text-3xl font-bold mb-3">2</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Confirmação
              </h3>
              <p className="text-gray-600">
                Verifique se as informações estão corretas
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="text-blue-600 text-3xl font-bold mb-3">3</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Download
              </h3>
              <p className="text-gray-600">Baixe seu certificado em PDF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
