# Build stage
FROM gradle:8-jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle bootJar --no-daemon

# Production stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar server.jar
# Create an empty .env file so Dotenv.load() does not throw an exception.
# Real configuration will be injected via environment variables.
RUN touch .env
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "server.jar"]
