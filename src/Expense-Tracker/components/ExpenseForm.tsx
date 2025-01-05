import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  description: z.string().min(3, {message:"Description Must be of 3 characters" }).max(50),
  amount: z.number({invalid_type_error: "Amount must be a Numeric value" }).min(0.01,).max(100_000),
  category: z.enum(categories),
});
type ExpenseFormdData = z.infer<typeof schema>;

interface Props{
    onSubmit: (data: ExpenseFormdData) => void;
}
const ExpenseForm = ({onSubmit}:Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormdData>({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(data =>{
        onSubmit(data);
        reset();
    })}>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Description
        </label>
        <input {...register('description')}id="description" type="text" className="form-control" />
      {errors.description && <p className="text-danger">{errors.description.message} </p>}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Amount
        </label>
        <input {...register('amount', { valueAsNumber: true})}id="amount" type="number" className="form-control" />
        {errors.amount && <p className="text-danger">{errors.amount.message} </p>}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Category
        </label>
        <select {...register('category')} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-danger">{errors.category.message} </p>}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
