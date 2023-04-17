# Museum of Art

This project showcases a museum website featuring various artworks and exhibitions. Users can browse and search for artworks, view details about them, and add them to their favorite list. Also, they can explore artist details and find related works. Finally, the website includes a contact page where users can get in touch with the museum staff.

## Features

- Users can register for a new account and log in.

- After log in, user may search through "Advance Search" or "Search"
    - For "Advance Search", user may specific the "Search Query", "Title / Tags / Artist or Culture", "Geo Location", "Medium"
    - For "Search", it is a basic search by "Search Query".
    - Each search is stored in "Search History".
- List of results would be prompted if search is successful.

- User may click to view the details and add to favourite.
    - Favorite List would be stored in the "Favourites"
    
- After log out, session would be destroyed.

##Live Demo (Vercel) :

   https://web-422-a6-zvvi-52ubo6ww2-asuraxo.vercel.app

##Github Link :

   https://github.com/asuraxo/Museum-of-Art

## Dependencies

This project was developed using React.js and Next.js frameworks for the client-side and server-side rendering, respectively. Also, it uses:

- React Bootstrap for the responsive layout and UI components;
- MongoDB / Mongoose for the database hosting, modeling and querying;
- useState, useEffect for the update of changes.
- Jotai for the favourites and search history.
- JWT for authentication

## Local Installation

    To install and run this project on your local machine, please follow these steps:

    1. Clone the repository from GitHub:

        `https://web-422-a6-zvvi-52ubo6ww2-asuraxo.vercel.app`


    2. Change to the project directory:

       `cd Museum-of-Art`

    3. Install the dependencies:

        `npm install`

    4. Set the environment variables for the MongoDB connection string and the session secret (in a .env.local file):

       `NEXT_PUBLIC_API_URL=https://web-422-a6-zvvi-52ubo6ww2-asuraxo.vercel.app/api`

       `DB_CONNECTION_STRING=mongodb+srv://...`

       `SESSION_SECRET=...`

    5. Start the development server:

        `npm run dev`

    6. Open your browser and go to http://localhost:3000 to access the website.

## Author

David So

## License

This project is licensed under the MIT License.



