pipeline {
    agent any
    
    environment {
        // Define environment variables if needed
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build images using docker-compose
                    sh 'docker-compose build'
                }
            }
        }

        stage('Test') {
            steps {
                // Example: Run linting for client
                dir('client') {
                    sh 'npm install'
                    sh 'npm run lint'
                }
            }
        }
        
        // Add more stages as needed
    }
}
