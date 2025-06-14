pipeline {
  agent any

  tools {
    nodejs 'Node 18' // Must match what you set up in Jenkins tools
  }

  stages {
    stage('Checkout') {
      steps {
        git credentialsId: 'github-token', url: 'https://github.com/anil-bhusal/node-graphql.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint || echo "Lint errors ignored for now"'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    // Optional: add build or deploy stages
  }

  post {
    failure {
      echo '❌ Build failed!'
    }
    success {
      echo '✅ Build successful!'
    }
  }
}
