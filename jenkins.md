# The setup of Jenkins on the EC2 instance

## Steps made to make Jenkins work

### EC2 initiated
First, an EC2 instance was initiated with the script [provision-ec2.sh](provision-ec2.sh), which uses functions under [functions/funchtions.sh](functions/functions.sh). After the EC2 instance is initiated it then runs the script [bootstrap-jenkins.sh](bootstrap-jenkins.sh) which setsup the machine as such:
* uninstalls java-1.7.0-openjdk and replaces it with java-1.8.0
* installs docker and adds docker user ec2-user 
* installs git
* installs jenkins and add docker user jenkins, and then starts jenkins
* makes the file ec2-init-done.makerfile

### Get ssh-key for Github
To connect terminal to the EC2 instance the commane `ssh -i "ec2_instance/hgop2-Administrator.pem" ec2-user@ec2-52-30-173-36.eu-west-1.compute.amazonaws.com` was run from the root directory of the project. From there the following commands were run: 
~~~
sudo su -s /bin/bash jenkins
cd /var/lib/jenkins/
ssh-keygen
cat .ssh/id_rsa.pub
~~~
The ssh-key is then printed in the terminal, so it was copies and added to my GitHub account. 

### Make an account on Jenkins
Next the [Jenkins instance page]( ec2-52-30-173-36.eu-west-1.compute.amazonaws.com:8080) was opened, which had instructions on how to find the inital administrator password, which was found by running the command `cat /var/lib/jenkins/secrets/initialAdminPassword` from the Jenkins bash. 
The on-screen-commands were followed and an account made with username hgop. 

### Pipeline made on Jenkins
From the [Jenkins instance page]( ec2-52-30-173-36.eu-west-1.compute.amazonaws.com:8080), `create new job` was chosen. The job was made a `pipeline` and was given the name **TicTacToe-pipeline**. In the next step under the tab `Pipeline` the following options were made:
*  the Pipeline definition was set to `Pipeline script from SCM`
* SCM was set as `Git`
* Repository URL was set as `git@github.com:annakrih/HGOPweek2.git`
* A credential was added by choosing `Add` > `Jenkins` and filling the form as such:
    * Domain: `Global credentials (unrestricted)`
    * Kind: `SSH Username with private key`
    * Scope: `Global (Jenkins, nodes, items, all child items, etc)`
    * Username: `annakrih` (my GitHub username)
    * Private Key: `From the Jenkins master ~/.ssh
    * Passphrase, ID and descriptions left empty. 
    * `Add`
Now you can make the pipeline pull from the repository by clicking the pipeline and then `Build now`. 

### The rest
After this the pipeline was working, but work began on the Jenkinsfile. 


## The Jenkins instance 
username: hgop
URL: ec2-52-30-173-36.eu-west-1.compute.amazonaws.com:8080