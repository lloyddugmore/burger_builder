
# Summary

This is a complete end to end react project that allows a user to log in and create and order a burger.

It uses Redux, Authentication, Firebase, AXIOS, React hooks, React Router etc...

The project was built by following this course on Udemy. 

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8231828?start=465#content

## Startup

```npm install```
 
```npm start```


## Firebase notes
Because this project uses a very simple firebase setup, there is no actual config required. You simply have to setup a new basic firebase DB in your google account and replace the firebase URL in ```axios-orders.js``` with your specific URL.

### Data for firebase (ingredients)
```
{
  "bacon" : 0,
  "cheese" : 0,
  "meat" : 0,
  "salad" : 0
}
```

## Branches

complete build is on ```main``` branch

redux build is on ```redux_phase``` branch

authentication build is on ```auth phase``` branch


