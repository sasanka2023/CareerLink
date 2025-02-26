# syntax=docker/dockerfile:experimental

# Stage 1: Build the application with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /workspace/app

# Copy only necessary files first for better caching
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline

# Copy the source code and build the JAR file
COPY src src
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight image for running the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
VOLUME /tmp

# Copy the built JAR from the build stage
COPY --from=build /workspace/app/target/*.jar app.jar

# Expose the application port
EXPOSE 8091

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
