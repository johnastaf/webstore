FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY WebStore.csproj WebStore.csproj
RUN dotnet restore WebStore.csproj

COPY . .
WORKDIR /src
RUN dotnet build WebStore.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish WebStore.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY webstore.db webstore.db

ENTRYPOINT ["dotnet", "WebStore.dll"]