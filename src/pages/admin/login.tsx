import Header from "@/components/header/header";
import {useRouter} from "next/router";

const AdminLoginPage = () => {
  const router = useRouter();

  return (
      <>
        <Header/>
        <div className="w-[1200px] mt-20 m-auto pt-2">
          <div className="w-fit m-auto flex flex-col gap-2">
            <input placeholder="username"/>
            <input type="password" placeholder="password" />
            <button onClick={() => router.push("/admin")}>Log in</button>
          </div>
        </div>
      </>
  );
};

export default AdminLoginPage;
