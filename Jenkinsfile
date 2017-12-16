node {    
    checkout scm
    stage('Clean') {
        // Clean files from last build.
        sh 'git clean -dfxq'
    }
    stage('Setup') {
        // Prefer yarn over npm.
        sh 'yarn install || npm install'
        dir('client')
        {
            sh 'yarn install || npm install'
        }
        dir('server')
        {
            sh 'yarn install || npm install'
        }
    }
    stage('Test') {
        sh 'npm run test:nowatch'
    }
    stage('API & loadtests') {
        sh 'npm run startpostgres && npm run startserver & npm run apitest:nowatch'
        sh 'npm run loadtest:nowatch && sleep 10 && kill %1'
        sh 'docker kill $(docker ps -q)'
        sh 'docker rm $(docker ps -aq)'
        junit '**/build/junit/*.xml'
    }
    stage('Deploy') {
        sh './dockerbuild.sh'
        dir('./provisioning')
        {
            sh "./provision-new-environment.sh"
        }
    }
}