"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "@/lib/firebase/index";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

type FinanceContextProviderProps = {
  children: ReactNode;
};

type financeContextType = {
  income: any;
  expenses: any;
  addIncomeItem: (item: any) => Promise<void>;
  removeIncomeItem: (index: any) => Promise<void>;
  addExpenseItem: (index: any, index2: any) => Promise<void>;
  addCategory: (index: any) => Promise<void>;
};

export const financeContext = createContext<financeContextType>({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
});

export default function FinanceContextProvider({
  children,
}: FinanceContextProviderProps) {
  const [income, setIncome] = useState<any>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  async function addCategory(category: any) {
    try {
      const collectionRef = collection(db, "expenses");

      const docSnap = await addDoc(collectionRef, {
        ...category,
        item: [],
      });

      setExpenses((prevExpense) => {
        return [
          ...prevExpense,
          {
            id: docSnap.id,
            item: [],
            ...category,
          },
        ];
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function addIncomeItem(newIncome: any) {
    try {
      const collectionRef = collection(db, "Income");
      const docSnap = await addDoc(collectionRef, newIncome);

      setIncome([...income, { id: docSnap.id, ...newIncome }]);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeIncomeItem(incomeId: any) {
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

  async function addExpenseItem(expenseCategoryId: string, newExpense: any) {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { ...newExpense });

      setExpenses((prevState) => {
        const updateExpense = [...prevState];

        const foundIndex = updateExpense.findIndex((expense: any) => {
          return expense.id === expenseCategoryId;
        });

        updateExpense[foundIndex] = { id: expenseCategoryId, ...expenses };

        return updateExpense;
      });
    } catch (error) {
      console.error(error);
    }
  }

  const values = {
    income,
    addIncomeItem,
    removeIncomeItem,
    expenses,
    addExpenseItem,
    addCategory,
  };

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

    const getExpenses = async () => {
      const collectionRef = collection(db, "expenses");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setExpenses(data);
    };

    // call functions
    getIncomeData();
    getExpenses();
  }, []);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
