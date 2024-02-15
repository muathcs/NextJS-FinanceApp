import Navigation from "@/components/Navigation";
import Image from "next/image";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseItem";

const DUMY_DATA = [
  {
    color: "red",
    text: "Gym",
    amount: 20,
  },
  {
    color: "green",
    text: "electricity",
    amount: 210,
  },
  {
    color: "orange",
    text: "Netflix",
    amount: 220,
  },
  {
    color: "brown",
    text: "Films",
    amount: 12,
  },
];
export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto ">
      <section className="py-3">
        <small className=" text-gray-400 text-emerald-50">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(10000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+ Expenses</button>
        <button className="btn btn-primary-outline">+ Income</button>
      </section>

      {/* Expenses */}

      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {DUMY_DATA.map((item) => (
            <ExpenseItem
              color={item.color}
              title={item.text}
              amount={item.amount}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
