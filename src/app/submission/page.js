"use client";

import { useForm } from "react-hook-form";

export default function Submission() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("/api/abstract", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      alert("Abstract Submitted Successfully!");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4 font-bold">Submit Abstract</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className="input"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        <div>
          <input
            {...register("authors", { required: true })}
            placeholder="Authors"
            className="input"
          />
          {errors.authors && <p className="text-red-500">Authors required</p>}
        </div>

        <div>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="input"
          />
          {errors.email && <p className="text-red-500">Email required</p>}
        </div>

        <div>
          <textarea
            {...register("abstract", { required: true, minLength: 50 })}
            placeholder="Abstract"
            className="input"
          />
          {errors.abstract && <p className="text-red-500">Min 50 characters</p>}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
