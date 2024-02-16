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
  removeExpenseItem: (index: any, index2: any) => Promise<void>;
  deleteExpenseCategory: (index: any) => Promise<void>;
};

export const financeContext = createContext<financeContextType>({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  removeExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
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
        items: [],
      });

      setExpenses((prevExpense) => {
        return [
          ...prevExpense,
          {
            id: docSnap.id,
            items: [],
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

      // Update State
      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });

        updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };

        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  }

  async function removeExpenseItem(
    updatedExpense: any,
    expenseCategoryId: any
  ) {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, {
        ...updatedExpense,
      });
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );
        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  }

  async function deleteExpenseCategory(expenseCategoryId: any) {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);

      await deleteDoc(docRef);
      setExpenses((prevExpenses: any) => {
        const updatedExpenses = prevExpenses.filter(
          (item: any) => item.id != expenseCategoryId
        );

        return [...updatedExpenses];
      });
    } catch (error) {
      throw error;
    }
  }

  const values = {
    income,
    addIncomeItem,
    removeIncomeItem,
    expenses,
    addExpenseItem,
    addCategory,
    removeExpenseItem,
    deleteExpenseCategory,
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
