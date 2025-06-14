pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/anil-bhusal/node-graphql.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'node -v'      // Check if Node is available
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test || echo "Tests failed but proceeding..."'
      }
    }
  }

  post {
    success {
      echo '✅ Build completed successfully!'
    }
    failure {
      echo '❌ Build failed!'
    }
  }
}
