import Image from "next/image";
import Header from "@/components/header/header";

const ClientForm = () => {
  return (
      <>
        <Header />
        <div className="w-[1200px] m-auto pt-2 flex justify-between">
          <div className="w-fit">
            <label className="mr-4">Destino:</label>
            <select className="border-2 p-2">
              <option>New York, USA</option>
            </select>
          </div>
          <div className="w-fit">
            <label className="mr-4">Perfil usuario:</label>
            <select className="border-2 p-2">
              <option>Familia</option>
              <option>Joven (Erasmus)</option>
              <option>Negocios</option>
            </select>
          </div>
        </div>
        <Image className="mt-4 m-auto" src="/placeholder.svg" alt="Placeholder image" width={1200} height={800}/>
      </>
  );
};

export default ClientForm;
