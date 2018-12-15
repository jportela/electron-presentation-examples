# Desktop Applications with Electron

This is a work in progress, support materials for a talk.

## Start

First example, just a minimal quickstart to show how can you get started with Electron

## File System

An example of how Node APIs can be accessed on a Browser Window

## Multiple Windows

Explores how can we define a Menu for our application, as well as the relationship between
the Electron Main and Renderer processes, and how to communicate with them via IPC.

## Custom Protocol

As a result of profiling, we switch to using a Custom Protocol to load images via a Stream,
and use the Image.decode API to load the image in a micro-task, in order to optimize the FPS delivered.
