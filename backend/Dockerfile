# Base image with Python
FROM mcr.microsoft.com/dotnet/sdk:9.0

# Work directory setup
WORKDIR /app

# Dependency installation
COPY HikeExplorer.sln .
COPY HikeExplorer.API/HikeExplorer.API.csproj HikeExplorer.API/

RUN dotnet restore HikeExplorer.sln

# Copying rest of the app
COPY HikeExplorer.API/ HikeExplorer.API/

WORKDIR /app/HikeExplorer.API

# Exposing frontend port
EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

# Starting the app
CMD ["dotnet", "run", "--no-launch-profile"]
