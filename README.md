# Books Store VueJS

The server provides an API for the application's core operations, as well as a Swagger endpoint for easy documentation. 
- FE Demo - https://share.vidyard.com/watch/tor4yYhEK6udabGvowMoFh
- BE: https://circlesoftware-be-4104a8d601d4.herokuapp.com/books

# Folder Structure
- src/ The main source folder
    - assets/ where images folder
    - components/ 
        - layout/ where the common elements are ex. header, footer 
        - ui/ This is where the small components like cards, button etc
    - views/  where the page components are
    - router/ where the vueJs route urls

# Unit tests
    - src/tests/
        books 
        menu
    - Demo - https://share.vidyard.com/watch/o32gWvjYdmX4sv8ZytiRax

# Best practices for VueJS
    - Project and file structures to organize
    - Naming conventions
    - Create unit test
    - Define clear interfaces (Typescript)
    - Use computed hooks when states are calculated (useMemo im comparison to reactJs)
    - proper cleanup (unmounting) 
    - use keys for mapping/for loop
    - descriptive Functions and event handlers
    - Use proper state management like Pinia
    - Error handling and validation
    - if heavy data use v-memo
    - implement lazy loading and only show the data that user needs in the browser

## Getting Started

-   Clone the repository
-   Install its dependencies using npm:

```bash
$ npm install
```

-   Run the development server locally with the following command:

```bash
$ npm run dev
```