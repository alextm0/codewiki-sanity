import ContactForm from '@/app/components/ContactForm';
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background-50 px-6 py-10">
      <div className="container max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-text-900 mb-4 animate-fadeIn">Contactează-ne</h1>
        <p className="text-lg text-text-500 mb-8 animate-fadeInDelay">
          Ne-ar plăcea să auzim de la tine! Feedback-ul tău este esențial pentru noi și ne ajută să îmbunătățim experiența utilizatorilor. Completează formularul de mai jos pentru a ne trimite un mesaj cu orice sugestie sau problemă pe care o întâmpini.
        </p>
        <ContactForm />
      </div>
    </main>
  );
};

export default ContactPage;
