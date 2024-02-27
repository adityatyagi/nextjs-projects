import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
      <Link href="/users">Users</Link>
      <Link href="/users/new">New Users</Link>
      <ProductCard />
    </main>
  );
}
