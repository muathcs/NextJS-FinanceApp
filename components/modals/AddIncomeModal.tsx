import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { currencyFormatter } from "@/lib/utils";
// icons
import { FaTrashAlt } from "react-icons/fa";

// firebase
import { db } from "@/lib/firebase/index";

import { financeContext } from "@/lib/store/finance-context";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
interface Income {
  amount: number;
  description: string;
  createdAt: Date;
}

function AddIncomeModal({ showAddIncomeModal, setShowAddIncomeModal }: any) {
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);

  async function addIncomeHandler(e: any) {
    e.preventDefault();

    const newIncome: Income = {
      amount: parseInt(amountRef.current!.value),
      description: descriptionRef.current!.value,
      createdAt: new Date(),
    };

    try {
      await addIncomeItem(newIncome);

      descriptionRef.current!.value = "";
      amountRef.current!.value = "";
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteIncomeEntry(incomeId: string) {
    try {
      await removeIncomeItem(incomeId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal show={showAddIncomeModal} onclose={setShowAddIncomeModal}>
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
              <small className="text-sm">{item.createdAt.toISOString()}</small>
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
  );
}

export default AddIncomeModal;
