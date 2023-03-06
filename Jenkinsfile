withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'MY_USERNAME', passwordVariable: 'MY_TOKEN')]) {
pipeline {
    agent any
    
     tools {
        nodejs "node"       
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'jenkins']], userRemoteConfigs: [[url: 'https://github.com/kevindarbydev/LaravelLivewire.git']]])
            }
        }
     stage('Install') {
          steps {             
              sh 'npm ci'   
            }
        }  

        stage('Build Assets') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                 // Push changes to deploy branch                
                sh "git push -u origin HEAD:deploy"
            }
        }
    }
}
}