"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import PageDivider from "./PageDivider";

interface Props {
  postId: string;
}

const AddComment = ({ postId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { name, email, comment } = data;

    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ name, email, comment, postId }),
    });
    if (!res.ok) {
      console.log("Failed to add comment");
      return;
    }

    reset();
  };

  return (
    <section className="bg-white dark:bg-gray-900 mt-20">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Lasă un comentariu
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Ai citit articolul nostru și ai întrebări sau sugestii? Lasă un
          comentariu și spune-ne ce părere ai! Feedback-ul tău ne ajută să
          îmbunătățim conținutul pentru tine și ceilalți elevi.
        </p>
        <form
          className="space-y-8"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Numele tău
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Numele tău"
            />
            {errors.name && (
              <p className="text-red-600 text-xs">Numele este obligatoriu.</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email-ul tău{" "}
              <span className="text-xs">(Email-ul tău nu va fi publicat!)</span>
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              id="email"
              type="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="nume@exemplu.com"
            />
            {errors.email && (
              <p className="text-red-600 text-xs">
                Te rugăm să introduci o adresă de email validă.
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Mesajul tău
            </label>
            <textarea
              {...register("comment", { required: true, minLength: 2 })}
              id="comment"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Lasă un comentariu..."
            ></textarea>
            {errors.comment && (
              <p className="text-red-600 text-xs">
                Comentariul trebuie să aibă minim 2 caractere.
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddComment;
