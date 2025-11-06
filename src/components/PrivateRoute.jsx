import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ALLOWED_ADMIN_EMAIL = "tififerreira@gmail.com";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  // Verifica se o usuário está autenticado E se o email é o permitido
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.email !== ALLOWED_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h2>
          <p className="text-gray-700">
            Você não tem permissão para acessar esta área.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return children;
}

export default PrivateRoute;
