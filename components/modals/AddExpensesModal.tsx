import React, { useContext, useState } from "react";
import Modal from "../Modal";
import { useSearchParams } from "next/navigation";
import { financeContext } from "@/lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";

function AddExpensesModal({
  showAddExpenseModal,
  setShowAddExpenseModal,
}: any) {
  const [expenseAmount, setExpenseAmount] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { expenses } = useContext(financeContext);

  function addExpenseItemHandler() {
    const expense: any = expenses.find((item: any) => {
      return item.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + parseInt(expenseAmount),
      item: [
        ...expense.items,
        {
          amount: parseInt(expenseAmount),
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    setExpenseAmount("");
    setSelectedCategory(null);
    setShowAddExpenseModal();

    console.log("new: ", newExpense);
  }
  return (
    <Modal show={showAddExpenseModal} onclose={setShowAddExpenseModal}>
      <div className="flex flex-col gap-4">
        <label>Enter an amount...</label>

        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
      </div>

      {/* Expense categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl capitalize">Select expense category</h3>
          {expenses.map((expense: any) => (
            <button
              onClick={() => setSelectedCategory(expense.id)}
              key={expense.id}
            >
              <div
                style={{
                  boxShadow:
                    expense.id === selectedCategory ? "1px 1px 1px" : "",
                }}
                className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-[25px] h-[25px] rounded-full"
                    style={{ background: expense.color }}
                  ></div>
                  <h4 className="capitalize"> {expense.title}</h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button
            onClick={addExpenseItemHandler}
            className="btn btn-primary flex flex-col gap-4"
          >
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
