FROM openjdk:17.0.1-slim-buster@sha256:c5a264f4adb92b19961b4d79f9ac2b5df3ce8932413688851cd221b7939a0736 as build
RUN groupadd auth0 && useradd -m developer -g auth0
USER developer
RUN mkdir /home/developer/app
WORKDIR /home/developer/app
COPY ./gradle ./gradle
COPY ./build.gradle ./
COPY ./buildscript-gradle.lockfile ./
COPY ./gradle.lockfile ./
COPY ./gradlew ./
COPY ./gradlew.bat ./
COPY ./settings.gradle ./
RUN ./gradlew dependencies --no-daemon
COPY ./config ./config
COPY ./src ./src
RUN ./gradlew build --no-daemon

FROM gcr.io/distroless/java17-debian11@sha256:ab37242e81cbc031b2600eef4440fe87055a05c14b40686df85078cc5086c98f
USER 1000
EXPOSE 6060
COPY --from=build /home/developer/app/build/libs/helloworld-0.0.1.jar ./helloworld-0.0.1.jar
CMD ["./helloworld-0.0.1.jar"]
