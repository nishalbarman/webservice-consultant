# Webservice consultant

## API usage

### Projects

#### API for creating and updating the project

- ##### Create New Project --> http://localhost:{PORT}/projects/create
- ##### Update A Project --> http://localhost:PORT/projects/update/:id

##### Data Structure

- Data should in the form of multipart/formdata,
- All fields are required
- Keys that needs to use - title, description, project_image, name(by whom this data going to be created)

### Services

#### API for creating and updating the service

- ##### Create New Project --> http://localhost:{PORT}/services/create
- ##### Update A Project --> http://localhost:PORT/services/update/:id

##### Data Structure

- Data should in the form of multipart/formdata,
- All fields are required
- Keys that needs to use - title, description, service_image, name(by whom this data going to be created)

### Users

#### API for creating and updating the user

- ##### Create New Project --> http://localhost:{PORT}/users/create
- ##### Update A Project --> http://localhost:PORT/users/update/:id

##### Data Structure

- Data should in json format
- All fields are required
- Keys that needs to use - name, email, password, role(for normal user it should not given), createdBy(by whom this data going to be created, optional)

```{
    "name": "Nishal",
    "email": "n@gmail.com",
    "password": "your_secret_password",
    "createdBy: "Admin"
   }
```
