# React x Valtio sample
- An experimental sample project to implement a React x Valtio app.

# What is this?
- [Article here (in Japanese)]()
- This is to experiment how can we extract the control of business logic and state management to outside of React realm.
- Trying to accomplish it with [Valtio](https://github.com/pmndrs/valtio);

# Things that needs an improvement
## Poor implementation mechanism for forms
- Unlike react-query, tanstack form does not provide framework agnostic bits that allows service class to manage form.
- For now the implementation is kept simple, but hopefully we could do something like we did with http request client.

# Todo
- [x] implement projects page
    - create wizard
- [x] Fill out the readme
    - make it looking better
