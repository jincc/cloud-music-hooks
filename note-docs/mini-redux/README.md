We learned a few valuable things in this experience:

- We must protect and stabilize the state of the store. The only way a user should be able to mutate state is through actions.

- Reducers are pure functions in a state tree. Your app’s state properties are each represented by a function that provides updates to their state. Each reducer is unique to each state property and vice versa.

- The store is singular and contains the entire state of the app. When we use it this way, we can track each and every change to the state of the app.

- Reducers can be thought of as behavioral definitions of state tree properties.
