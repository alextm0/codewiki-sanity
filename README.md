
# CodeWiki CMS

CodeWiki CMS is a competitive programming blog platform designed for students to explore and learn about various topics in computer science.

## Features

- **Dynamic Content**: Write and display articles with rich text, including images, code blocks, and mathematical expressions.
- **Comments**: Engage with readers through comments and discussions on each post.
- **Theming**: Support for light and dark themes.
- **Sanity Integration**: Powered by Sanity for flexible content management.
- **TypeScript**: The project is built using TypeScript for type safety and better developer experience.

## Installation

To get started with CodeWiki CMS, clone the repository and install the dependencies:

```bash
git clone https://github.com/alextm0/codewiki-sanity.git
cd codewiki-sanity
npm install
```

## Development

To run the project locally, use:

```bash
npm run dev
```

This will start the development server on `http://localhost:3000`.

## Building for Production

To build the project for production, use:

```bash
npm run build
npm start
```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```plaintext
NEXT_PUBLIC_SANITY_PROJECT_ID=<Your Sanity Project ID>
NEXT_PUBLIC_SANITY_DATASET=<Your Sanity Dataset>
NEXT_PUBLIC_SANITY_API_VERSION=2023-06-01
NEXT_PUBLIC_SANITY_TOKEN=<Your Sanity Token>
```

## Usage

### Writing Articles

Articles are written in markdown and support rich text features such as images, code blocks, and mathematical expressions. 

### Adding Comments

Users can leave comments on articles. Comments are managed through Sanity and can be moderated via the Sanity dashboard.

### Theming

The platform supports both light and dark themes. Users can switch between themes using the theme toggle button.

## Contributing

If you'd like to contribute to CodeWiki CMS, please fork the repository and use a feature branch. Pull requests are welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Sanity.io](https://www.sanity.io/) for providing the content management system.
- [Next.js](https://nextjs.org/) for the React framework.
- [React Markdown](https://github.com/remarkjs/react-markdown) for rendering markdown content.
- [KaTeX](https://katex.org/) for rendering mathematical expressions.
- [Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) for code block syntax highlighting.
