# FlashCardsApp

FlashCardsApp is simple web application for creating flash cards and decks to store them. The application is created with Asp .Net with React template. 

## Table of Contents
1. [Technology stack](https://github.com/miraDask/FlashCardsApp#technology-stack)
2. [Application Configurations](https://github.com/miraDask/FlashCardsApp#application-configurations)


## Technology stack

Main languages & libraries :

### Front End:

- React

- reactstrap

- Bootstrap


### Back End:

- ASP.NET Core 3.1

- Entity Framework Core 3.1

- SQL Server


## Application Configurations

- Check connection string in appsettings.json.
   If you don't use SQLEXPRESS you should replace "Server=.\\SQLEXPRESS..." with "Server=.;...".

- Add your own secret (needed for generating JWT for authentication) in appsettings.json. 
	>"ApplicationSettings": {
    >"Secret": "Your secret here"
    >}
