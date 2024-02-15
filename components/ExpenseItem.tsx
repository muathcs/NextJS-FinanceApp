import React from "react";
import { currencyFormatter } from "@/lib/utils";

type ExpenseItemProp = {
  color: string;
  title: string;
  total: number;
};

function ExpenseItem({ color, title, total }: ExpenseItemProp) {
  return (
    <button>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ background: color }}
          />
          <h4 className=" capitalize">{title}</h4>
        </div>
        <p>{currencyFormatter(total)}</p>
      </div>
    </button>
  );
}

export default ExpenseItem;
