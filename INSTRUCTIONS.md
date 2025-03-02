<img width="150px" src="https://w0244079.github.io/nscc/nscc-jpeg.jpg" >

# PROG 5010 - RestAPI Creation Assignment - Phase 1

## Overview

In this phase, you will expand your skills by building a new backend for your Single Page Application (SPA) using a framework or library other than Express.js. To explore your options for many of the requirements, you can visit the [annual State of JavaScript survey site](https://2024.stateofjs.com/en-US/) which highlights popular frameworks, libraries, and tools along with usage trends over the past year. This is an opportunity to explore different tools and approaches while adhering to the core principles of backend development.

## Objectives

- Build a RESTful API using a backend framework other than Express.js.
- Implement CRUD operations for your SPA’s database which you have already created in an earlier assignment.
- Use MongoDB as the database backend. (You created this from a previous assignment)
- Ensure your API adheres to RESTful design principles.

## Requirements

### Backend Framework

Select a backend framework or library other than Express.js. Examples include (but are not limited to):

- Node.js-based frameworks such as Koa, Hapi, NestJS, Fastify, or Sails.js
- Frameworks or libraries that run on Bun, Deno, or Cloudflare Workers
- Serverless solutions such as AWS Lambda, Azure Functions, or Vercel

The framework must support JavaScript as the development language.

IMPORTANT - Once you think you have narrowed down your choices, run them by your instructor either verbally, via email or via DM on Teams to ensure that your choices are acceptable for the requirements.

### CRUD Endpoints

Create endpoints to handle Create, Read, Update, and Delete operations for your SPA’s core data model.

The endpoints must:

- Accept and validate incoming data. How your data validates is up to you but should make sense given the nature of your data. This includes:
  - Checking for required fields and ensuring they are not empty.
  - Validating data types (e.g., ensuring a field expected to be a number is not a string).
  - Using validation libraries or built-in tools provided by your chosen framework (e.g., Joi for Hapi, decorators in NestJS, or custom middleware).
  - Implementing custom validation rules for fields with specific constraints (e.g., checking email formats or ensuring a value falls within a certain range).
  - Returning meaningful error messages when validation fails.
  - Don't overdo the validation portions...keep it simple to start for this phase.

- Interact with the MongoDB database.
- Return appropriate HTTP status codes and JSON responses.

### Database

Use MongoDB as the database that you will connect to with this application.

Ensure the database is properly structured to support your application’s data needs.

## Deliverables

### Code Repository

- Push your code to the provided GitHub repository as you progress with the requirements.

## Grading Criteria

Your submission will be graded according to an accompanying rubric on Brightspace.

### Functionality Checklist...

- All required CRUD endpoints are implemented and functional.
- The API correctly interacts with the MongoDB database.

### Code Quality Checklist...

- Code is clean and readable.
- Proper error handling is implemented.

## Additional Notes

- Feel free to experiment and explore different frameworks, but ensure your API meets the functional requirements.
- Use online resources, documentation, and community forums to learn about your chosen framework.

Good luck, and have fun exploring new backend technologies!

