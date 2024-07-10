import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import ClientForm from "@/components/client-form/client-form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <ClientForm />;
}
