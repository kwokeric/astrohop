# Astrohop

Astrohop, inspired by Winterbells, is a variation of a jumping game where the aim is to guide a astronaut with your cursor up a never-ending series of objects (circles) without falling.

![Game Layout](./docs/begin.png)

## Overview

Astrohop is built with JavaScript using jQuery for interaction between the back and front end, EaselJS for interacting with the canvas and mouse position tracking, and hand-rolled physics to simulate gravity and upward movement.

User's can toggle `easy-mode` which removes the delay that normally affects the astronaut when following the cursor.

## Design

The `Game` class holds the logic for setting up and running the game based on the game's refresh rate (60fps). The `Util` file contains constants and some logic - such as `isCollidedWith`, which checks whether the astronaut has touched a circle.

## Physics

The astronaut is affected by gravity, while circles themselves are not, which allows them to stay in the air. Technically, the circles move downwards in unision when the astronaut collides with a circle. Also, when Matt Damon makes contact with a circle, he doesn't actually collide with it - he passes straight through the circle and gains vertical velocity. When the player moves the mouse, the astronaut follows the mouse with or without a delay, depending on the selected settings.
