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

  const exportToCSV = () => {
    const headers = [
      "Nome",
      "Email",
      "RG",
      "Curso",
      "Semestre",
      "Data de Criação",
    ];
    const data = registrations.map((reg) => [
      reg.name,
      reg.email,
      reg.rg || "N/A",
      reg.course || "N/A",
      reg.semester ? `${reg.semester}º` : "N/A",
      new Date(reg.createdAt).toLocaleDateString(),
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Painel Administrativo</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <FiDownload />
          Exportar CSV
        </button>
      </div>

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
                  {registration.semester ? `${registration.semester}º` : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(registration.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
