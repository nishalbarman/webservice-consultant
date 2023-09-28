# Webservice Consultant

## SERVER - How to setup

### local server

### Commands

```
- cd server
- npm install
- replace .env.example to .env
- modify the .env data
- You are ready to visit http//localhost:8000/
```

## API usage

- ###### Access Token is needed...

### Projects

#### API for creating and updating the project

- ##### Create A Project --> http://localhost:{PORT}/projects/create
- ##### Update A Project --> http://localhost:PORT/projects/update/:id
- ##### Update A Project --> http://localhost:PORT/projects/delete/:id

##### Data Structure

- Data should in the form of multipart/formdata,
- All fields are required
- Keys that needs to use - title, description, project_image, name(by whom this data going to be created)

### Services

#### API for creating and updating the service

- ##### Create A Service --> http://localhost:{PORT}/services/create
- ##### Update A Service --> http://localhost:PORT/services/update/:id
- ##### Update A Service --> http://localhost:PORT/services/delete/:id

##### Data Structure

- Data should in the form of multipart/formdata,
- All fields are required
- Keys that needs to use - title, description, service_image, name(by whom this data going to be created)

### Clients

#### API for creating and updating the project

- ##### Create A Client --> http://localhost:{PORT}/clients/create
- ##### Update A Client --> http://localhost:PORT/clients/update/:id
- ##### Update A Client --> http://localhost:PORT/clients/delete/:id

##### Data Structure

- Data should in the form of multipart/formdata,
- All fields are required
- Keys that needs to use - title, client_image, name(by whom this data going to be created)

### Users

#### API for creating and updating the user

- ##### Create A User --> http://localhost:{PORT}/users/create
- ##### Update A User --> http://localhost:PORT/users/update/:id
- ##### Delete A User --> http://localhost:PORT/users/delete/:id

##### Data Structure

- Data should in json format
- All fields are required
- Keys that needs to use - name, email, password, createdBy(by whom this data going to be created, optional)

```
  {
    "name": "Nishal",
    "email": "n@gmail.com",
    "password": "your_secret_password",
    "createdBy: "Admin"
  }
```

### Messages

#### API for creating and updating the message/contactus

- ##### Create A Message --> http://localhost:{PORT}/messages/create
- ##### Update A Message --> http://localhost:PORT/messages/update/:id
- ##### Delete A Message --> http://localhost:PORT/messages/delete/:id

##### Data Structure

- Data should in json format
- All fields are required
- Keys that needs to use - name, email, phone, message

```
  {
    "name": "Nishal",
    "email": "n@gmail.com",
    "phone": "911111111",
    "message: "Your_Message"
  }
```
