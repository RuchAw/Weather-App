
# Welcome to your new Weather App!

> A React Native project built using the Ignite boilerplate for fast and scalable development.

This is a weather application using [Ignite](https://infinite.red/ignite), a structure I have used in many projects for rapid development.  
The app fetches weather data from the [OpenWeatherMap](https://openweathermap.org/api) service.

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Ignite Documentation](https://github.com/infinitered/ignite/blob/master/docs/README.md)

## Getting Started

```bash
yarn install
```

Then, depending on your platform:

```bash
yarn android # Build for Android
yarn ios     # Build for iOS
```

After the initial build, you can simply run:

```bash
yarn start
```

Make sure to copy the `.env.example` file to `.env`.  
It contains the main API URL and a placeholder where you should paste your OpenWeatherMap API key.  
**The API key will be provided.**

## Building for Production

To generate a production APK for Android:

First, generate the keystore:

```bash
yarn genKeyStore
```

Then build the release APK:

```bash
yarn release:android
```

## Additional Information

- This project uses **Yarn** as the package manager.
- A **video demonstration** of the app running is available at the root of the project.
