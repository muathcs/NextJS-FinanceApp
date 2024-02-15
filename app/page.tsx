"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";

// icons
import { FaTrashAlt } from "react-icons/fa";

// firebase
import { db } from "@/lib/firebase/index";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);
const DUMY_DATA = [
  {
    color: "red",
    title: "Gym",
    total: 13,
    id: 1,
  },
  {
    color: "green",
    title: "electricity",
    total: 22,
    id: 2,
  },
  {
    color: "orange",
    title: "Netflix",
    total: 17,
    id: 3,
  },
  {
    color: "brown",
    title: "Films",
    total: 6,
    id: 4,
  },
];

interface Income {
  amount: string;
  description: string;
  createdAt: Date;
}
export default function Home() {
  const [income, setIncome] = useState<any>();
  console.log(income);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  async function addIncomeHandler(e: any) {
    e.preventDefault();

    const newIncome: Income = {
      amount: amountRef.current!.value,
      description: descriptionRef.current!.value,
      createdAt: new Date(),
    };

    try {
      const collectionRef = collection(db, "Income");
      const docSnap = await addDoc(collectionRef, newIncome);

      setIncome([...income, { id: docSnap.id, ...newIncome }]);

      descriptionRef.current!.value = "";
      amountRef.current!.value = "";
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteIncomeEntry(incomeId: string) {
    const docRef = doc(db, "Income", incomeId);

    try {
      await deleteDoc(docRef);

      let tempIncome = [...income];
      tempIncome = tempIncome.filter((item) => item.id !== incomeId);

      setIncome(tempIncome);
    } catch (error) {
      console.error(deleteDoc);
    }
  }

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "Income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };

    getIncomeData();
  }, []);

  return (
    <>
      {/*AddIncomeModal */}
      <Modal
        modalIsOpen={showAddIncomeModal}
        setModalIsOpen={setShowAddIncomeModal}
      >
        <form onSubmit={addIncomeHandler} className="input-group">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              className=""
              ref={amountRef}
              type="number"
              name="amount"
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              className=""
              ref={descriptionRef}
              type="text"
              name="description"
              placeholder="Enter description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add entry
          </button>
        </form>

        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>
          {income?.map((item: any) => (
            <div className="flex items-center justify-between" key={item.id}>
              <div>
                <p className="font-semibold">{item.description}</p>
                <small className="text-sm">
                  {item.createdAt.toISOString()}
                </small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(item.amount)}
                <button onClick={() => deleteIncomeEntry(item.id)}>
                  <FaTrashAlt />
                </button>
              </p>
            </div>
          ))}
        </div>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto  ">
        <section className="py-3">
          <small className=" text-gray-400 text-emerald-50">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(10000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            className="btn btn-primary"
            onClick={(e) => setShowAddIncomeModal(true)}
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
            {DUMY_DATA.map((item) => (
              <ExpenseItem
                key={item.id}
                color={item.color}
                title={item.title}
                total={item.total}
              />
            ))}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2  mx-auto">
            <Doughnut
              data={{
                labels: DUMY_DATA.map((item) => item.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMY_DATA.map((item) => item.total),
                    backgroundColor: DUMY_DATA.map((item) => item.color),
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
