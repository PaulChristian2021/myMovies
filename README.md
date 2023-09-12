<h1>myMovies</h1>

<p>A sample application utilizing the React JS library, the omDB(Open movie database) API, localStorage, [more coming soon]</p>

- last searched text in title and year is used next time the app is opened if those text returned a movie (localStorage)
- search inputs requires minimum of 2 characters before calling API.
- input searching has a 1 second delay to lessen API calls while typing.
- dynamic site title (changes based on movie selected)
- year input (Only calls API if there is a title)
- shows a placeholder image for movie posters not available/missing
- uses localStorage to store the user's movies list
- CRUD operations

display
todo : revert title when not viewing movie

choices
todo : results pages

performance
todo : separately call the poster

todo: create user's movie list (watched, to watch, )

todo: use react router

todo: translations feasibility analysis

todo: reflect user's rating of a movie

todo: reflect in the search's movie detail if a movie exist in user list (maybe a tag or starRating)

todo: update movie rating if listed

=========================

<!-- todo: change page tab logo -->
<!-- todo: make the add-to-list functional -->
<!-- todo: prevent duplicate item in list -->

=========================

Redux

<!-- API -->

Router
TypeScript
Translations
Responsive/Mobile-friendly
Performant
CSS Library
Reusable component

<!-- Children props -->

<!-- Error handling -->

Error handling (Try catch, etc)
-saerchMovies/
-searchMovie

Documentation
Consistent design
Best practices

=========================

myMovies:
/Search for movies
/see movie detail
User's list of movies
/-localStorage user's movie list
{
movie details from API, userRating
}
-watched category
-to watch category
/-add C: add movie
/-update U: update movie rating
/-deletion D: remove movie from list
List of movies sorting
List of movies search

.
