import ContactForm from '@/app/components/form/ContactForm';
import React from 'react';

export const metadata = {
  title: 'Contactează-ne - CodeWiki',
  description: 'Descoperă articole detaliate despre programare competitivă pe CodeWiki. Învață algoritmi, structuri de date și pregătește-te pentru concursuri de programare cu ghidurile și tutorialele noastre experte.',
  keywords: 'blog informatica, blog olimpiada informatica, articole olimpiada informatica, tutoriale algoritmi, olimpiada de informatica, structuri de date, pregătire olimpiada de informatica, informatică, olimpiada, CodeWiki, codewiki',
};

const ContactPage: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background-50 px-4 py-8">
      <div className="container max-w-lg mx-auto">
        {/* <h1 className="text-3xl font-semibold text-text-900 mb-3 animate-fadeIn">Contactează-ne</h1>
        <p className="text-base text-text-600 mb-6 animate-fadeInDelay">
          Ne-ar plăcea să auzim de la tine! Feedback-ul tău este esențial pentru noi și ne ajută să îmbunătățim experiența utilizatorilor. Completează formularul de mai jos pentru a ne trimite un mesaj cu orice sugestie sau problemă pe care o întâmpini.
        </p> */}
        <ContactForm />
      </div>
    </main>
  );
};

export default ContactPage;
