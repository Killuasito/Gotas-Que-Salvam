import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { FiDownload } from "react-icons/fi";

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const q = query(
          collection(db, "certificates"),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });

        setRegistrations(docs);
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const exportToCSV = () => {
    const headers = [
      "Nome",
      "Email",
      "RG",
      "Curso",
      "Semestre",
      "Doador Anterior",
      "Disposição para Doar",
      "Data de Registro",
    ];
    const data = registrations.map((reg) => [
      reg.name,
      reg.email,
      reg.rg || "N/A",
      reg.course || "N/A",
      reg.semester || "N/A",
      reg.previousDonor || "N/A",
      reg.donationIntent || "N/A",
      formatDate(reg.createdAt),
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registros-certificados.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Painel Administrativo</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <FiDownload />
          Exportar CSV
        </button>
      </div>

      {/* Registros */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RG
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Curso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semestre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Registro
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((registration) => (
              <tr key={registration.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.rg || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.course || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.semester
                    ? `${registration.semester} semestre`
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(registration.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedbacks Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Respostas dos Participantes</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {registrations.map((registration) => (
              <div
                key={`feedback-${registration.id}`}
                className="bg-white rounded-lg shadow p-4 space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-blue-600">
                  {registration.name}
                </div>
                <div className="text-sm text-gray-600">
                  {registration.course
                    ? `${registration.course} - ${registration.semester} semestre`
                    : "Participante Externo"}
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Doador
                    </span>
                    <p className="text-gray-700 text-sm ml-2">
                      {registration.previousDonor || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Disposição
                    </span>
                    <p className="text-gray-700 text-sm ml-2">
                      {registration.donationIntent || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
