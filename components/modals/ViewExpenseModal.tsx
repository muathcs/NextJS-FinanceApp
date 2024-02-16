import React, { useContext } from "react";
import Modal from "../Modal";
import { currencyFormatter } from "@/lib/utils";
import { FaTrashAlt } from "react-icons/fa";
import { financeContext } from "@/lib/store/finance-context";

function ViewExpenseModal({ show, onclose, expense }: any) {
  const { removeExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);
  console.log("expensxx: ", expense);

  async function deleteExpenseHandler(expenseItem: any) {
    console.log("hgere");
    try {
      const updatedItems = expense.items.filter(
        (item: any) => item.id !== expenseItem.id
      );

      //   update epxense balance

      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - expenseItem.amount,
      };

      await removeExpenseItem(updatedExpense, expense.id);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteExpense() {
    try {
      await deleteExpenseCategory(expense.id);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal show={show} onclose={onclose}>
      <div className="flex items-center justify-between">
        <h3>{expense.title}</h3>
        <button onClick={deleteExpense} className="btn btn-danger">
          Delete
        </button>
      </div>

      <div className="my-4 text-2xl">
        <h3>Expense history</h3>
        {expense.items.map((item: any) => (
          <div key={item.id} className="flex items-center justify-between">
            <small>
              {item.createdAt.toMillis
                ? new Date(item.createdAt.toMillis()).toISOString()
                : item.createdAt.toISOString()}
            </small>
            <p className="flex items-center gap-2">
              {currencyFormatter(item.amount)}
            </p>
            <button
              onClick={() => {
                deleteExpenseHandler(item);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
