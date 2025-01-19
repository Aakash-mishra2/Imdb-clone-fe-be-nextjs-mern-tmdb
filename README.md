# 🚀 Movie App 🌐

This is a Full Stack Application  that allows users to search for their preferred movies or TV series and it has the functionality of bookmarking their favorites movie or TV series. 

## Tech used:
- **FRONTEND:** **ReactJs**, **Typescript**, **Tailwind**, **Redux State Management**.
- **BACKEND:** **Nodejs**, **ExpressJs**, **MongoDB**, **TMDB API**.

## Features and Functionality

- **Login and Signup. Validation for all inputs is also added**
  **Add New Movie. Multiple Actors/ One Producer/ Title/ Summary**
    *** Movies DB Relations: ***
    *** ONE Actor can Act in MANY Movies***
    *** ONE Producer can produce MANY  Movie ***
    *** ONE Movie can have MANY Actors and ONE Producer ***

    **Token Based Authentication by JWT**

  **Add or Remove Bookmarks from your favourite movies/tvShows**
  **Recommended movies based on Favourite User Genres**

- **A beautiful responsive UI using MaterialUI, TailwindCSS and Typescript**



- **Page to select favourite genres and save.**
- **Home page:**
    - **1. All trending videos including movie and tv series in card format.**
    - **2. Recommended videos based on the selected favourite genres. in card foramt**
    - **3. Searching functionality to find any specific movies or tv series.**
- **Movies Page:**
    - **1. List of all movies in card format.**
    - **2. Searching functionality to find any specific movies.**
    - **3. Pagination functionality.**
- **TV series page:**
    - **1. List of all tv series in card format.**
    - **2. Searching functionality to find any specific tv series.**
    - **3. Pagination functionality.**
- **Bookmark page:**
    - **1. List of all bookmark including tv series and movies in card format.**
    - **2. User can remove any video from bookmark.**
    - **3. Searhcing functionality to find any specific bookmark.**
- **Genres page:**
    - **1. List of all genres. Previous selected genres comes with auto selected.**
    - **2. User can update their favourite genres.**

## FRONTEND CLIENT FILETREE

```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜AuthGuard.tsx                 //HOC for authentication and redirect if not
 ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┗ 📜Register.tsx
 ┃ ┣ 📂customLoader
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📜Recommended.tsx
 ┃ ┃ ┗ 📜TrendingBox.tsx
 ┃ ┗ 📂reusable
 ┃ ┃ ┣ 📜CustomSnackbar.tsx
 ┃ ┃ ┣ 📜NothingToShow.tsx
 ┃ ┃ ┣ 📜Pagination.tsx
 ┃ ┃ ┣ 📜reusable.css
 ┃ ┃ ┣ 📜SkeletonLoader.tsx
 ┃ ┃ ┣ 📜VideoCard.tsx
 ┃ ┃ ┣ 📜VideoDetailsLoader.tsx
 ┃ ┃ ┗ 📜VideoDetailsPage.tsx
 ┣ 📂context
 ┃ ┗ 📜AppContext.tsx
 ┣ 📂layout
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜sidebar.tsx          //Side Menubar for screens toggle
 ┣ 📂pages                  
 ┃ ┣ 📜AddNewMovie.tsx      
 ┃ ┣ 📜AuthPage.tsx         //User login & signup toggle
 ┃ ┣ 📜BookmarkPage.tsx
 ┃ ┣ 📜FavGenres.tsx
 ┃ ┣ 📜HomePage.tsx
 ┃ ┣ 📜MoviePage.tsx        // Listing Newly Added & Existing Movies
 ┃ ┗ 📜TvSeriesPage.tsx
 ┣ 📂routes                 //HOC for routing 
 ┃ ┗ 📜index.tsx
 ┣ 📂store
 ┃ ┣ 📜index.js             //redux store 
 ┃ ┗ 📜reducerLogic.tsx     //redux slices for fetchProfile, CRUD Bookmarks, SetAppLoading state and more
 ┣ 📂types
 ┃ ┗ 📜types.ts
 ┣ 📜App.css
 ┣ 📜App.tsx                //App root component
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## BACKEND API SERVICE FILETREE

```
📦config
 ┣ 📜dbConnection.js            //db connection schema
 ┣ 📜generateSecretKeys.js      
 ┗ 📜validators.js              
 📦controllers
 ┣ 📜Authentication.js          //login , signup and get user profile
 ┣ 📜Bookmark.js                //create, remove and get all bookmarked movies/shows/tvseries
 ┣ 📜Dashboard.js               //Get recommendations, allTrendingVideos, addFavouriteGenres, getAllGenres
 ┣ 📜Movies.js                  //Get All movies, single movie, ADD NEW MOVIE
 ┗ 📜Person.js                  //Get person(actor,producer) by id, name or by search
📦middleware
 ┣ 📜resFromat.js
 ┗ 📜tokenVerify.js
📦models
 ┣ 📜actorModel.js
 ┣ 📜BookmarkModel.js
 ┣ 📜MovieModel.js     
 ┣ 📜producerModel.js
 ┣ 📜UserModel.js
 ┗ 📜VideoModel.js
📦router
 ┣ 📜authRouter.js
 ┣ 📜bookmarkRouter.js
 ┣ 📜dashboardRouter.js
 ┣ 📜movieRouter.js
 ┗ 📜personRouter.js
```


## Installation 🛠️

Follow these steps to set up the Github User Repo Explorer on your local machine:

- **Clone the repository.**
```bash
git clone https://github.com/absiemon/movie-app.git
```
- **Move to the project directory.**
```bash
cd yourProjectDirName
```
- **Install required packages.**
```bash
cd client
npm install

cd server
npm install
```

- **Naviage to server, create env file and add your credentials into it**
```bash
JWT_SECRET= your-jwt-secret-key
MONGO_URL= your-mongodb-uri
TMDB_API_KEY= your-tmdb-api-key
```

- **Run the app.**
```bash
cd client
npm run dev
cd ..
cd server
npm run dev
```

- **Refer to TMDB DOCS for info**
```bash
https://developer.themoviedb.org/docs/getting-started
```

- **Get a demo at below url to get the last booking detail.**
```bash

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
