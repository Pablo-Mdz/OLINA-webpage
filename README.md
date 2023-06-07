### We have incorporated Docker for use in the development environment.

To get it up and running, please follow the steps outlined below:

1. Ensure Docker is installed on your system. If it isn't, you can download it from this URL: https://docs.docker.com/get-docker/
(Please note, you may need to create an account on Docker.)

2. Update your .env file: Replace the existing MongoDB URL with the following:
```
MONGO_URI=mongodb://localhost:27017/oliinadb
```

3. To start the Docker container use the command:
```
docker-compose up -d
```
 
This will spin up a MongoDB instance that is accessible locally via mongodb://mongo:27017/oliinadb.

----
It would be great to adopt the following **commit message conventions**:

* feat: Short for "feature", this indicates that the commit introduces a new functionality or feature to the project.
* fix: Implies that the commit resolves a bug or issue in the code, improving its functionality or stability.
* docs: Refers to changes related to documentation, such as updating comments, README files, or other supporting materials.
* style: Denotes changes that do not affect the logic or functionality of the code but improve its style, formatting, or syntax (e.g., indentation, whitespace, or code conventions).
* refactor: Specifies that the commit alters the code's structure or organization without changing its external behavior or functionality.
* test: Indicates the addition, modification, or removal of tests in the project, which help ensure the code's quality and stability.
* chore: Refers to tasks that do not directly modify the code but are necessary for project maintenance, such as updating dependencies, build system adjustments, or other housekeeping tasks.

Remember, the goal is to adopt good habits that catch the attention of companies looking for developers. 🎯 
