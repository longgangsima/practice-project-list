# 🧪 Testing Guides

Testing strategies, setup instructions, and best practices for React applications.

## 📋 Available Guides

### Setup & Configuration
- **[Test Setup Guide](./test-setup-guide.md)** - Initial testing environment setup

### Testing Strategies  
- **[Manual Testing Guide](./DisplayOrders.manual-test.md)** - Manual testing procedures for components

---

## 🎯 Testing Philosophy

Our testing approach focuses on:

1. **User-Centric Testing** - Test what users actually do
2. **Reliability** - Tests should be stable and predictable  
3. **Maintainability** - Easy to update as code changes
4. **Speed** - Fast feedback during development

## 🛠️ Testing Stack

### Unit Testing
- **Jest** - Test runner and assertion library
- **Testing Library** - React component testing utilities
- **@testing-library/user-event** - User interaction simulation

### Manual Testing
- **Test Scenarios** - Defined user workflows
- **Edge Cases** - Error conditions and boundary testing
- **Cross-browser** - Compatibility verification

## 📖 Testing Patterns

### Component Testing
```javascript
// Test user interactions, not implementation
test('user can submit order form', async () => {
  render(<OrderForm />);
  
  await user.type(screen.getByLabelText(/customer name/i), 'John Doe');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(screen.getByText(/order submitted/i)).toBeInTheDocument();
});
```

### API Testing
```javascript
// Mock external dependencies
test('displays orders from API', async () => {
  mockFetch.mockResolvedValueOnce({
    json: async () => [{ id: '1', customer: 'John' }]
  });
  
  render(<OrderList />);
  
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

---

## 🔗 Related Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

📚 **Related:** [React Concepts](../react-concepts/) | [Project Examples](../../projects/)
