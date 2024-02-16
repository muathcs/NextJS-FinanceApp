import React, { useContext, useState, useRef } from "react";
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
  const [showAddExpense, setShowAddExpense] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  async function addExpenseItemHandler() {
    const expense: any = expenses.find((item: any) => {
      return item.id === selectedCategory;
    });

    console.log("expenses: ", expense);

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + parseInt(expenseAmount),
      items: [
        ...expense.items,
        {
          amount: parseInt(expenseAmount),
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);
      setExpenseAmount("");
      setSelectedCategory(null);
      setShowAddExpenseModal();
    } catch (error) {
      console.error(error);
    }
  }

  async function addCategoryHandler() {
    const title = titleRef.current!.value;
    const color = colorRef.current!.value;

    try {
      await addCategory({ title, color, total: 0 });
    } catch (error) {
      console.error(error);
    }
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category</h3>
            <button
              onClick={() => setShowAddExpense(true)}
              className="text-lime-400"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter title" ref={titleRef} />
              <label>Pick Color</label>
              <input type="color" ref={colorRef} className="w-24 h-10" />
              <button
                onClick={addCategoryHandler}
                className="btn btn-primary-outline"
              >
                Create
              </button>
              <button
                onClick={(e) => setShowAddExpense(false)}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          )}
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
