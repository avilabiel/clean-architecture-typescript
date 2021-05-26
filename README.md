# clean-architecture-typescript

The idea is to create a simple API where it will save leads from the website's contact form.

## SOLID Architecture in my words

> If you can't explain it simply, you don't understand it well enough.
>
> -- <cite>Albert Einstein</cite>

### Single Responsibility Principle

Each Class should have only one responbility and proporse. It's preferable to have simple and smaller classes.

### Open/Closed Principle

Each Class should be:

- Open for extensions (through Design Patterns)
- Closed for changes

### Liskov Substitution Principle

### Interface Segregation Principle

It's very similar to SRP, but more focused on Interfaces. Each Interface should have your own responsability and they should not have unnecessary items.

A Interface should be a contract with very strict and necessary terms (methods).

### Dependency Inversion Principle

Depends on Interfaces instead of Objects and Classes. With Interfaces you have:

- A Contract, so it doesn't matter external details (like database type, presentation, etc.);
- This Contract has only the necessary items. When we have unnecessary items being available and being able to be used, undesired problems could come

## Not SOLID, but important

### Demeter Principle

This principle doesn't belong to SOLID, but it's important to remind some concetps from it and apply them.

A Class should call only:

- Its methods
- Methods from objects (receiveds through params)
- Methods from objects (built by Class itself)

## Commits

The automated tests will be checked for every pre commit. It will not be allowed to commit if they don't pass.

## Improvements for next releases

- We use `paths`
- We use better modules for controllers
