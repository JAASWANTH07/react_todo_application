pipeline {
    agent any

    environment {
        NODE_HOME = '/usr/local/bin/node' // adjust if node installed elsewhere
        PATH = "$NODE_HOME:$PATH"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/JAASWANTH07/react_todo_application.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Build App') {
            steps {
                echo 'Building the production files...'
                sh 'npm run build'
            }
        }

        stage('Deploy (Simulated)') {
            steps {
                echo 'Deploying to server (simulated)...'
                // Here you can copy build/ folder to S3 or a web server
                sh 'echo "Deploy step placeholder - e.g. upload build folder to S3"'
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed. Check logs.'
        }
    }
}
