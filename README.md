# Bubble Save

A hook to save request data locally when there is no connection to the internet. It continuously polls for an internet connection and when the app goes online makes the request with the saved data.

## How do I run it?

After installing the dependencies, you can run the application simply by running the `yarn start` or `npm start` command.

## How do I use it?

Start off by wrapping your application with the `BubbleSaveProvider`:

```tsx
    <BubbleSaveProvider>
        <...>
    </BubbleSaveProvider>
```

Then to handle requests with bubble save, use the hook. The only required option is the actual request function that bubble save will try using to make the request.

```tsx
const { bubbleUp, online, result } = useBubbleSave({
    request: async () => {
        // You can use any client here, doesn't have to be fetch
        const result = await fetch('some.url', { method: 'GET' });

        // Make sure to return the data from the request.
        return await result.blob();
    },
});
```

Before anything can happen with bubble up you'll need to use the given function to try and make the request. If the application doesn't have an internet connection it will start polling for one, and when it finds one will make the request.

```tsx
const handleSave = () => bubbleSave(/* Pass in any arguments for the request */);
```

Finally, update the component when it actually makes the request and gets a result.

```tsx
useEffect(() => {
    if (result) {
        // Here is where the magic happens.
    }
}, [result]);
```

## Hod do I test it?

After installing the dependencies, you can run the tests simply by running the `yarn test` or `npm run test` command.

## Bubble Save Hook Props

| prop        | type                            | required | default  | description                                                |
| ----------- | ------------------------------- | :------: | :------: | ---------------------------------------------------------- |
| request     | (requestBody?: S) => Promise<T> |   true   |    -     | Function to handle the request.                            |
| url         | string                          |  false   |   '/'    | URL to ping to test internet connection.                   |
| pollingRate | number                          |  false   | 30000 ms | Frequency to at which the hook tries and makes the request |