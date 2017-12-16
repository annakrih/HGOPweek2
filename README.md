# Assignment - Week 3

### Jenkins instance 
 http://ec2-34-252-153-7.eu-west-1.compute.amazonaws.com:8080/ <\br>
login credentials submitted on Canvas.

### live TicTacToe instance
http://ec2-34-252-193-58.eu-west-1.compute.amazonaws.com:8000 

### Public Url to Datadog Dashboard
https://p.datadoghq.com/sb/fbeb1450b-59354fa899 

## List of things finished / did not finish (with comments):
* [x] **Completed the migrations needed for the application to work**
  * Under server/migrations two new files were added [20171211312401-add-cmd-log.js](/server/migrations/20171211312401-add-cmd-log.js) and [20171214135901-add-event-log.js](/server/migrations/20171214135901-add-event-log.js). In those files, in an export.up function a call to addColumn adds the column aggregate_id to the corresponding table in each file, and a method to remove the same column was defined in exmport.down with the removeColumn function. This allows the database to be migrated to a newer version, and defines a method to revert that change if that would be needed. 
* [x] **On Git push Jenkins pulls my code and the Tic Tac Toe application is deployed through a build pipeline, but only if all my tests are successful**
* [ ] **Filled out the `Assignments:` for the API and Load tests**
* [x] **The API and Load test run in my build pipeline on Jenkins and everything is cleaned up afterwards**
  * The setup before running the API and loadtests results in an error in every other turn. After a successfull build, the containers are cleared, which in turn breakes the next build. However after an unsuccessful build the containers are there and the build is able to finish. I have not been able to fix this bug. 
  * The loadtests run locally but not in the pipeline. I don't know if that is connected to the other problem, but I was not able to fix this either.  
* [x] **My test reports are published in Jenkins**
* [x] **My Tic Tac Toe game works, two people can play a game till the end and be notified who won.**
* [x] **My TicCell is tested**
* [x] **I've set up Datadog**
