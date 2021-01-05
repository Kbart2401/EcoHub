# EcoHub

This app is designed to make its users more environmentally-minded citizens, wherever they reside.

## MVP

1. Ability to add/remove friends
2. Ability to makes posts (or "report issues")
3. Ability to comment on posts
4. Gain XP through completing actions to help environment
5. Display various data points
6. Search feature to find other users


## Bonus Features

1. Upload profile photo/photo for posts and show activity
2. weather radar map
3. Map with natural water spring locations

## Routes 

### User Routes
1. Route to add/remove friend
  - This should only add you to them, but not them to you until they confirm. 
2. Route to return a friend when you go to their profile
3. Route to return a filtered list of users
4. Route to log in which should fill all relevant info for logged in user

### Post Routes
1. Route to return all posts ordered by created date and limited in size
2. Route to return all posts by a particular user
3. Route to filter posts by a certain region
- All post routes should also return their comments
4. Route to create a post

### Comment Routes
1. Route to add/remove a comment

### Likes Routes
1. Route to like a post or comment
- Liking a user's post or comment should add xp to the creator of the post or comment

### API Routes
1. Route to retrieve local weather, air quality, etc
2. Route to retrieve local water conditions
3. Route to retrieve locations for water springs and possibly recylce centers

## Components

### Signup
1. Signup Page

### Login
1. Login Page

### Home
1. Navbar 
2. Side panel (sliding?)
3. Main feed

### Local weather(Home)
1. Weather conditions (changing background)

### Profile
1. Profile page
2. Activity area (like gardens on github)

### Map 
- Should display info on water springs, etc

### Create task modal
1. Create task form

### Report an issue modal
1. Report an issue form
