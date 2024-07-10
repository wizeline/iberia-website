import Header from '@/components/header/header';
import { PROFILES } from '@/constants';

const AdminPage = () => {
  return (
    <>
      <Header />
      <div className="w-[1200px] m-auto pt-2">
        <h1>Página de administración de Gen-AI</h1>
        <div>
          <label className="mr-4">Perfil usuario:</label>
          <select className="border-2 p-2">
            {PROFILES.map((PROFILE) => (
              <option>{PROFILE}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Prompt:</label>
          <textarea className="border-2 p-2 w-full"></textarea>
        </div>
        <div className="text-right">
          <button>Generar</button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
