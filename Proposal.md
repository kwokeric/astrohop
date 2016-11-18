# Astrohop

## Background

Astrohop is a variation of a jumping game where the aim is to guide a astronaut with your cursor up a never-ending series of platforms (satellites) without falling.

The platforms are stationary apart from one, a meteor, that moves horizontally. Jumping on the meteor doubles the player's score. In this game, the left and right sides are not connected.

## Functionality & MVP

In Astrohop, users will be able to:

- Start and reset the game
- Move the astronaut around
- Make the astronaut jump off of satellites
- View their score and watch it update in real-time
- Bonus: Particle affects when jumping off of platforms
- Bonus: Platforms are random satellite objects
- Bonus: Toggle between color sets

In addition, this project will include:

- A "how to play" modal describing the rules of the game
- A production Readme

## Wireframe

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn, and the About modal. Game controls will only consist of a Start button. The whole page is clickable, which will begin the game. The astronaut will follow the user's cursor. All the control is through the mouse.

![Game Layout](https://github.com/kwokeric/astrohop/blob/master/docs/astrohop.png)

## Architecture and Technologies

This project will be implemented with Vanilla JavaScript and jquery for overall structure and game logic, HTML5 Canvas for DOM manipulation and rendering, and Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`map.js`: this script will handle the logic for creating and updating the map and rendering them to the DOM.

`satellite.js`: this script will handle the logic for creating and updating the platform elements (satellites and meteors) and rendering them to the DOM.

`astronaut.js`: this script will handle the logic for moving the astronaut around. The astronaut object will hold the acceleration and maximum speed parameters as well as it's current location and if it has collided with a platform.

## Implementation Timeline

### Phase 1: Node Modules (1 day)

- Set up all necessary Node modules, including webpack
- Create `webpack.config.js` as well as `package.json`
- Write a basic entry file and the bare bones of both scripts outlined above
  - `map.js` - stores satellite locations
  - `astronaut.js` - stores it's movement information and position

### Phase 2: Movement and Platform Creation (2 days)

- Create the logic in `satellite.js` that places satellites at random positions on the map
- Moving the astronaut with the cursor with given maximum acceleration and velocity
- Scrolling the map upwards with the astronaut

### Phase 3: Score and Styling (1 days)

- Add scoring algorithm to `map.js`
- Install the "how to play" modal
- Style the frontend, making it polished and professional

### Bonus features

- Add secondary platform that moves and doubles score
- Include buttons on the side to toggle the color scheme
