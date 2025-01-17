# 🚀 Movie App 🌐

This is a Full Stack Application  that allows users to search for their preferred movies or TV series and it has the functionality of bookmarking their favorites movie or TV series. 

## Tech used:
- **FRONTEND:** **ReactJs**, **Typescript**, **Tailwind**.
- **BACKEND:** **Nodejs**, **ExpressJs**, **MongoDB**, **TMDB API**.

## Features

- **Login and Signup. Validation for all inputs is also added**
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
- **A beautiful responsive UI.**


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

