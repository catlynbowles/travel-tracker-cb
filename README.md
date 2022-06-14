# Travel Tracker

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Set Up](#set-up)
- [Features](#features)
- [Organizational Resources](#organizational-resources)
- [Future Features](#future-features)
- [Reflection](#reflection)
- [Contributor](#contributors)
- [Project Specifications](#project-specifications)

### Introduction
It's the summer of 2022, and in this pre-pandemic life you're ready to travel! The problem is, no one can keep up with you. What if you could hire someone to do that? We've found the perfect candidate for you with Travel Tracker. View the trips you've taken, along with upcoming trips, pending trips, and trips you may currently be on. With the ability to book new trips, you can also jet off to any destination, and view your trip's estimated cost before booking. Travel Tracker is accessible to a wide variety of users, and currently supporting pride month. Clone down this repo to get started: 

### Set Up
1. Clone this repository.
2. `cd` into the directory.
3. Run `npm install`.
4. To run tests, run `npm test`.
5. Start the server by running `npm start` and view at http://localhost:8080/.

### Set Up the Backend Database
1. Go to https://github.com/turingschool-examples/travel-tracker-api
2. Clone down this repo in a seperate directory, within a seperate tab of your terminal. 
3. Run `npm install`
4. Run `npm start`
5. Keep both the front end and back end servers running while you access the app. 

### Login: 
- Login to the site using the the username 'traveler' + a number 1 - 50. Use the password 'travel'. 

### Check It Out!
![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/98493391/173706465-509c2559-388b-490a-894e-a268561f6ae8.gif)

### Features
- Traveler logs in using 'traveler' + the id number, and the password 'travel.' 
- Upon login in, the traveler can select 'Past Experiences,' 'Present Encounters,' 'Upcoming Destinations', or 'Pending Destinations.'
- When selecting one of the following, the user can view the Date, Location, and Trip Duration of each trip that matches the criteria on trip cards. 
- Selecting a personalized date, location, traveler number, and trip duration, the user can book a new trip.
- A traveler will be able to view the fees of the trip before commiting to the booking. 
- If the traveler agrees to the fees, all trip displays will update considering the new information. 
- On the traveller dashboard, the user can see the total amount of money spent for the current year. 


### Organizational Resources
- [Excalidraw Wireframe](https://excalidraw.com/#json=h1BAg784FEfQykh6mhs3E,jGvkkMGuDF_uruCpsa4vXA)
- [GitHub Project Board](https://github.com/catlynbowles/travel-tracker-cb/projects/1)

### Future Features
- A seperate login to be created for the Agent, who can approve trips and view user information. 
- Personalized passwords for each user. 
- Traveller can modify or delete trips. 

### Reflection
- Overall, I've learned how useful iterator methods can be. This project would have been incredibly difficult, (if not impossible!) to complete with  proper functionality without them. Even though they were difficult to learn, I'm incredibly grateful that I had a decent understanding of them before beginning this project. 
- Writing code for and completing this project, I have had a realization of how many things I learned. Many concepts that were incredibly fuzzy in Mod 1 and Mod 2 began to make sense as I applied them here. It has finally started to feel like I have a toolbox to draw upon while writing new applications. 
-  Mistakes I had made in past projects turned out to be a blessing when writing this more extensive implementation of code. One of my favorite mistakes that I made early on in Mod 2 was writing functions that manipulated my data model, which turned out to be awfully difficult further down the road. Even though I manipulated dates extensively in this project, I did not do so in the data model. I kept those functions within my scripts!
-  I'm really proud of myself. After completing this project confidently, I feel like growth model is real and i'm capable of learning anything !

### Technologies
- JavaScript
- HTML
- CSS
- API Fetch
- API Post
- Chai/Mocha testing
- Webpack

### Contributor
- [Catlyn Bowles](https://www.linkedin.com/in/catlyn-bowles/)

### Project Specifications
- Project specs can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).
