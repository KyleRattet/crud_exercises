# Full Stack CRUD Assessment - todo



## Server-Side

1. Create the project structure

1. Write mocha and chai tests - [example](http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.VfXQblNViko)

1. Utilize the following resource - `exercises` (yes, this is for class exercises)

1. Create the RESTful route structure:
  - GET (ALL exercises) - `/api/v1/exercises`
  - GET (a single exercise) - `/api/v1/exercise/:id`
  - POST - `/api/v1/exercises`
  - PUT - `/api/v1/exercise/:id`
  - DELETE - `/api/v1/exercise/:id`
1. Setup MongoDB, Mongoose, and define your schema:

  ```javascript
  var Exercise = new Schema({
    name: String,
    description: String,
    tags: [String]
  });
  ```

  > Example tags - "javascript", "jquery", "mongo", "node"

1. Update each route to connect to the database and return JSON. *Make sure to test along the way.*
1. Use [dotenv](https://www.npmjs.com/package/dotenv) to manage environment variables (for the `MONGO_URI` variable - [example](https://github.com/gSchool/g11-course-curriculum/blob/master/week10/10_exercises/_solutions/crud-assessment/server/models/beer.js#L12))

## Client-Side

1. Render a single *index.html* file, which includes-
  - a form for adding (POST) a new exercise to the collection
  - all exercises below the form
  - a delete button next to each exercise to, well, delete it
  - an edit button to update each exercise (this could display a form in the HTML document or, even better, a modal)
1. Handle client-side form validation with HTML5 attributes.
1. Handle the form submission with jQuery. This *must* be a SPA (single page application)

## Deployment

1. Deploy to Heroku

## Bonus

1. Add in all of the [exercises](https://students.galvanize.com/instructor/cohorts/15/cohort_exercises) up to this point to create an exercise API!
1. Add Angular
