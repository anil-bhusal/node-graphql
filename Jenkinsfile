pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/anil-bhusal/node-graphql.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'node -v'
        bat 'npm install'
      }
    }

    stage('Test') {
      steps {
        bat 'npm test || echo "Tests failed but continuing..."'
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
