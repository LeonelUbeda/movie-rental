
### Installation

Install the dependencies and devDependencies.

```shell script
yarn install
```

Configure the environment variables.

in the project there is a file called env.example with an example of all environment variables.

before running the server, you need to have created the database.

to start the server run the following command.
```shell script
yarn dev
```

## project structure
The project consists of:
* model layer
* service layer
* middleware layer
* controller layer

#### middlewares
This project has 2 middlewares, one for sessions and one for permissions.
The first one assigns a series of permissions to the req based on the role that the user has.
If the user is not authenticated, is ANONYMOUS type by default. 

The permission system is quite simple but extendable, by default it has 3 types of permissions: 
administrator, default, anonymous

The second middleware checks if the user is allowed to access the current route.
This middleware receives two parameters, the name of the section and the action corresponding to that route
```js
router.get('/', permissionsMiddleware(SECTION.MOVIE, ACTION.READ), (req, res) => res.send('Hi'))
```
SECTION.MOVIE is a string constant that represents a section. 
ACTION.READ is a string constant that represents an action
In example case user must have permissions of type ACTION.READ in SECTION.MOVIE, otherwise, the requests ends with 403 code

```js
[PERMISSION_TYPES.ANONYMOUS]: {
        name: "Anonymous",
        permissions: {
            [SECTION.MOVIE]: {
                [ACTION.READ]: ["title", "description", "stock", "salePrice", "likes", "id"],
            },
            [SECTION.USER]: {
                [ACTION.INSERT]: ["username" ,"password", "firstName", "lastName", "password", "email"]
            }
        }
    }
```
In this example, the type Anonymous has read permission in the fields title, description, store, salePrice, likes, id.
The possible valid values would be an array of fields that user have allowed, a boolean or if nothing is specified, will be denied for that action in that section

#### services
The project has authentication services, users, movies and movie items.
The service layer provides a small system of error messages, commonly for 404 errors. When invoked, they return an object with two possible values, "error" and "value". Error is the message coming from the service
Sometimes it is necessary to perform some side effects in the service layers, for this we use events.


###movie endpoint
you can sort by the fields your role is allowed. Example
```
/movies?sort=rentalPrice
```
you can also perform filtering. Example:
```
/movies?rentalPrice=50
/movies?rentalPrice__lte=50
/movies?rentalPrice__gte=30
/movie?title__substring=Trial
```
btw, __substring is case sensitive
