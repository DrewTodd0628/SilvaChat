# Hello World API: Spring Boot + Java Sample

This repository contains a Sprint Boot project that defines an API server using Java and Gradle. You'll secure this API with Auth0 to practice making secure API calls from a client application.

## Configuration

To configure the application, add a `.env` file to the root of the project. No worries, this file is ignored by the VCS so each collaborator can use their own configuration. You can use the `.env.example` file as template too. The `.env` file should contain the following environment variables:

* `PORT:`: The port number in which the API server should start.
* `CLIENT_ORIGIN_URL`: The client origin URL (including port) that will be allowed by the CORS configuration.
* `AUTH0_DOMAIN`: Your Auth0 domain name. It follows the pattern `tenant-name.region.auth0.com`.
* `AUTH0_AUDIENCE`: Your Auth0 API Audience value. Also refered as the API identifier.

Here's an example of how your `.env` file could look:

```sh
PORT=6060
CLIENT_ORIGIN_URL=http://localhost:4040
AUTH0_DOMAIN=tenant-name.region.auth0.com
AUTH0_AUDIENCE=https://hello-world.example.com
```

Spring Boot does not natively provide a way of reading configuration properties from a `.env` file since all properties usually come from the `application.yml` file. We're using [me.paulschwarz:spring-dotenv](https://github.com/paulschwarz/spring-dotenv) library to bind environment variables defined in `.env` to the `application.yml` used by Spring Boot.

##  Starting the server

You can start the server in a terminal using the command:

```sh
./gradlew bootRun
```

It's also possible to start the server using [Spring Tools][1] and the IDE of your preference (VSCode, Eclipse, etc.)

## Development

This section adds helpful tips and information for development and contribution to this repository.

### Dependencies

Gradle manages all dependencies along with their versions, which are locked so we can ensure reproducible builds. If you need to include another dependency or plugin, you can always add them to the `build.gradle` file. Then you'll need to run the following command to update the lock files:

```sh
./gradlew dependencies --write-locks
```

### Checking

The check task will run both `Checkstyle` and `Sonarlint` tasks for the main and test sources. You can run the check task with the command:

```sh
./gradlew check
```

### Hot Swapping

Spring Boot offers a great way to live reload the code as you change it. This feature is called [Hot Swapping][2], which is shipped with the [spring-boot-devtools][3] dependency.

Hot Swapping can be used mainly in 2 ways:

1. Using [Spring Tools][1] and the IDE of your choice. Spring Tools will handle watching the files, recompiling, and restarting the server for you.
2. Using the Gradle Wrapper and your favorite terminal. One terminal to watch and recompile, another to run the server.

Option **(1)** is usually more straightforward if you already have [Spring Tools][1] installed, just run the server from your IDE and Hot Swapping should be enabled. However, if you prefer option **(2)** you just need to follow two simple steps:

#### Step 1

Open a terminal to watch/compile the project:

```sh
./gradlew compileJava -t
```

#### Step 2

Open a second terminal to start the server:

```sh
./gradlew bootRun
```

And that's it! With both terminals running those Gradle tasks, Hot Swapping should work and the server will automatically restart when you change something in the code.

[1]: https://spring.io/tools
[2]: https://docs.spring.io/spring-boot/docs/2.5.5/reference/html/howto.html#howto.hotswapping
[3]: https://docs.spring.io/spring-boot/docs/2.5.5/reference/html/using.html#using.devtools
