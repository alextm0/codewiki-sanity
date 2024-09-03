"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FeedbackFormInputs {
  name: string;
  email: string;
  type: "problem" | "suggestion" | "other";
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormInputs>();

  const onSubmit: SubmitHandler<FeedbackFormInputs> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Failed to submit feedback");
        return;
      }

      reset();
      alert("Feedback trimis cu succes!");
    } catch (error) {
      console.error("An error occurred while submitting the feedback:", error);
    }
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto animate-fadeIn font-inter">
      <h2 className="text-2xl font-semibold mb-4 text-text-800 text-center">
        Ajută-ne să îmbunătățim aplicația!
      </h2>
      <p className="text-sm text-text-600 mb-6 text-center">
        Feedback-ul tău este foarte important pentru noi. Indiferent dacă
        întâmpini o problemă sau ai o sugestie pentru un articol nou, te rugăm
        să ne spui. Ne dorim să creăm o experiență cât mai bună pentru tine!
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-700 mb-1"
          >
            Numele tău
          </label>
          <input
            {...register("name", { required: "Numele este obligatoriu." })}
            id="name"
            type="text"
            className="mt-1 block w-full p-2 text-sm placeholder:text-sm border border-text-300 rounded-md bg-background-100 text-text-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-shadow duration-300 hover:shadow-sm"
            placeholder="Introdu numele tău"
          />
          {errors.name && (
            <p className="text-secondary-600 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-700 mb-1"
          >
            Email-ul tău
          </label>
          <input
            {...register("email", {
              required: "Email-ul este obligatoriu.",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Te rugăm să introduci o adresă de email validă.",
              },
            })}
            id="email"
            type="email"
            className="mt-1 block w-full p-2 text-sm placeholder:text-sm border border-text-300 rounded-md bg-background-100 text-text-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-shadow duration-300 hover:shadow-sm"
            placeholder="nume@exemplu.com"
          />
          {errors.email && (
            <p className="text-secondary-600 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-text-700 mb-1 "
          >
            Tipul mesajului
          </label>
          <select
            {...register("type", {
              required: "Te rugăm să selectezi o opțiune.",
            })}
            id="type"
            className="mt-1 text-sm block w-full p-2 border border-text-300 rounded-md bg-background-100 text-text-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-shadow duration-300 hover:shadow-sm"
          >
            <option value="">Selectează o opțiune</option>
            <option value="problem">Raportează o problemă</option>
            <option value="suggestion">Sugerează un articol</option>
            <option value={"other"}>Altceva</option>
          </select>
          {errors.type && (
            <p className="text-secondary-600 text-xs mt-1">
              {errors.type.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-text-700 mb-1"
          >
            Mesajul tău
          </label>
          <textarea
            {...register("message", {
              required: "Mesajul este obligatoriu.",
              minLength: {
                value: 10,
                message: "Mesajul trebuie să aibă minim 10 caractere.",
              },
            })}
            id="message"
            rows={4}
            className="mt-1 block w-full text-sm placeholder:text-sm p-2 border border-text-300 rounded-md bg-background-100 text-text-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-shadow duration-300 hover:shadow-sm"
            placeholder="Scrie mesajul tău aici..."
          ></textarea>
          {errors.message && (
            <p className="text-secondary-600 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full py-2 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-md text-base font-medium transition-all duration-300 ease-in-out hover:from-primary-500 hover:to-primary-700 hover:shadow-md transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Se trimite..." : "Trimite feedback"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
