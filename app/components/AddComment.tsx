"use client";
import { useForm } from "react-hook-form";

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
    <section className="mt-16 max-w-xs md:max-w-full bg-primary-50 dark:bg-gray-800 py-8 px-4 rounded-lg shadow-md">
      <div className="max-w-screen-md mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-4 text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Lasă un comentariu
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Ai citit articolul nostru și ai întrebări sau sugestii? Lasă un
          comentariu și spune-ne ce părere ai!
        </p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Numele tău
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              placeholder="Numele tău"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                Numele este obligatoriu.
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              placeholder="nume@exemplu.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                Te rugăm să introduci o adresă de email validă.
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mesajul tău
            </label>
            <textarea
              {...register("comment", { required: true, minLength: 2 })}
              id="comment"
              rows={4}
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              placeholder="Lasă un comentariu..."
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-xs mt-1">
                Comentariul trebuie să aibă minim 2 caractere.
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-primary-400 text-white rounded-md text-sm font-semibold transition-all duration-200 ease-in-out hover:bg-primary-500 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 active:bg-primary-600 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
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
