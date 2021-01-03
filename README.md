
# Summary

This is a complete end to end react project that allows a user to log in and create and order a burger.

It uses Redux, Authentication, Firebase, AXIOS, React hooks, React Router etc...

The project was built by following this course on Udemy. 

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8231828?start=465#content

## Startup

```npm install```
 
```npm start```


## Firebase notes
Because this project uses a very simple firebase setup, there is no actual config required. You simply have to setup a new basic firebase DB in your google account and create a .env file in the root of your project with the following entries.

```
REACT_APP_FIREBASE_API_KEY=<place your api key here>
REACT_APP_FIREBASE_URL=<place your firebase db url here>
```

Note--See this for help - https://codesandbox.io/s/env-vars-create-react-app-mr0rl?file=/src/App.js:85-135



### Data for firebase (ingredients)
```
{
  "bacon" : 0,
  "cheese" : 0,
  "meat" : 0,
  "salad" : 0
}
```

### Rules for firebase
```
{
  "rules": {
     "ingredients" : {
        ".read": "true",
        ".write": "true",
      },
      "orders" : {
        ".read": "auth != null",
        ".write": "auth != null",
          ".indexOn" : ["userId"]
      }
  }
}
```

### Authentication setup - firebase
Select & enable ```Email/Password``` in ```Authentication``` section on Firebase.com

Grab the signup with email and password endpoint URL from here - https://firebase.google.com/docs/reference/rest/auth and replace api token value in your .env file. 


## Branches

complete build is on ```main``` branch

redux build is on ```redux_phase``` branch

authentication build is on ```auth phase``` branch


## Build (Production)

To build the project for production use the following command.

```npm run build```

This will create a ```build``` directory in your project.

## Deployment/Hosting
This project is hosted and deployed on firebase at https://burgerbuilderv3.web.app/
Instructions for how to do this can be found on Firebase in the hosting section.

Typically, you would need to install the ```firebase cli``` and then connect the cli to your ```google account``` and ```google project``` using ```firebase init``` command in the cli.

After that is complete, you will simply run a simple firebase command like follows

```firebase deploy```

On successful deployment you will be given the URL the project was deployed on. 




