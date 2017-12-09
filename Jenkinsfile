node {
    checkout scm
    stage('Build') {
        echo 'Building......' 
        echo 'Installing dependencies'
        sh "./install-dependensies.sh"

        echo 'Runnig tests'

        sh "npm run startserver"
        sh "npm run tests"

        echo 'Building app'

        echo 'Building docker container'

        echo 'Pushing docker image'  

    }
    stage('Test') {
        echo 'Testing......'
    }
    stage('Deploy') {
        echo 'Deploying......'
    }
}
