import { defineType } from "sanity";

export const feedbackComment = defineType({
  name: "feedbackComment",
  title: "Feedback Comment",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nume",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required().error('Numele este obligatoriu.'),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
      validation: (Rule) =>
        Rule.required().error('Email-ul este obligatoriu.').regex(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Adresa de email nu este validă.'
        ),
    },
    {
      name: "type",
      title: "Tip",
      type: "string",
      options: {
        list: [
          { title: 'Raportează o problemă', value: 'problem' },
          { title: 'Sugerează un articol', value: 'suggestion' },
        ],
      },
      readOnly: true,
      validation: (Rule) => Rule.required().error('Tipul feedback-ului este obligatoriu.'),
    },
    {
      name: "message",
      title: "Mesaj",
      type: "text",
      readOnly: true,
      validation: (Rule) =>
        Rule.required().min(10).error('Mesajul trebuie să aibă minim 10 caractere.'),
    }
  ],
});

export default feedbackComment;
