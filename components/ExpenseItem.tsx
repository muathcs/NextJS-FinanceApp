import React, { useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

type ExpenseItemProp = {
  expense: {
    color: string;
    title: string;
    total: number;
  };
};

function ExpenseItem({ expense }: ExpenseItemProp) {
  console.log("expense: ", expense);
  const [viewExpenseModal, setViewExpenseModal] = useState(false);
  return (
    <>
      <ViewExpenseModal
        show={viewExpenseModal}
        onclose={setViewExpenseModal}
        expense={expense}
      />

      <button onClick={(e) => setViewExpenseModal(true)}>
        <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ background: expense.color }}
            />
            <h4 className=" capitalize">{expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
}

export default ExpenseItem;
