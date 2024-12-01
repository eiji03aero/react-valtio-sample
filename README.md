# React x Valtio sample
- article link will be here

# Needs improvement
## Rendering optimization when state updates
- For now the valtio state update triggers rendernig for components regardless of the state they need.
- Some sort of useSelector implementation is needed for further optimization

## Poor implementation mechanism for forms
- Unlike react-query, tanstack form does not provide framework agnostic bits that allows service class to manage form.
- For now the implementation is kept simple, but hopefully we could do something like we did with http request client.

# Todo
- [x] implement projects page
    - create wizard
- [ ] write test for service
    - create wizard service

## Memo

```
Because I'm such an awful xxxx---.
(Oh thank you)
```
