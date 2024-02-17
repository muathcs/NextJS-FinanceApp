"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext, useEffect, useRef, useState } from "react";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import { financeContext } from "@/lib/store/finance-context";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import { authContext } from "@/lib/store/AuthContext";
import SignIn from "@/components/SignIn";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState<number>(0);

  const { expenses, income } = useContext(financeContext);
  const { user, loading } = useContext(authContext);

  useEffect(() => {
    const totalIncome = income.reduce((total: number, item: any) => {
      return total + item.amount;
    }, 0);

    const totalExpense = expenses.reduce((total: number, item: any) => {
      return total + item.total;
    }, 0);

    const newBalance = totalIncome - totalExpense;

    setBalance(newBalance);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      {/*AddIncomeModal */}
      <AddIncomeModal
        showAddIncomeModal={showAddIncomeModal}
        setShowAddIncomeModal={setShowAddIncomeModal}
      />

      {/* AddExpenseModal */}

      <AddExpensesModal
        showAddExpenseModal={showAddExpenseModal}
        setShowAddExpenseModal={setShowAddExpenseModal}
      />

      <main className="container max-w-2xl px-6 mx-auto  ">
        <section className="py-3">
          <small className=" text-gray-400">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              setShowAddExpenseModal(true);
            }}
          >
            + Expenses
          </button>
          <button
            onClick={() => setShowAddIncomeModal(true)}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* Expenses */}

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="input-group mt-6">
            {expenses.length > 0 &&
              expenses.map((item: any) => (
                <ExpenseItem key={item.id} expense={item} />
              ))}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl" id="stats">
            Stats
          </h3>
          <div className="w-1/2  mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((item: any) => item.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((item: any) => item.total),
                    backgroundColor: expenses.map((item: any) => item.color),
                    borderColor: ["black"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
