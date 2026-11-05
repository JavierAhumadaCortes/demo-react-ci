pipeline {
  agent any
  options {
    disableConcurrentBuilds()
    skipDefaultCheckout(true)
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  triggers { pollSCM('H/2 * * * *') }
  environment {
    DEPLOY_HOST = 'IP_PRIVADA_FRONT'
    DEPLOY_USER = 'deploy'
    NODE_OPTIONS = '--max-old-space-size=384'
  }
  stages {
    stage('Obtener codigo') {
      steps { checkout scm }
    }
    stage('Instalar') {
      steps { sh 'npm ci' }
    }
    stage('Probar') {
      steps { sh 'npm test' }
    }
    stage('Construir') {
      steps {
        sh '''
          npm run build
          git rev-parse HEAD > dist/version.txt
        '''
      }
    }
    stage('Publicar') {
      steps {
        sshagent(credentials: ['demo-react-ssh']) {
            sh '''
                rsync -r --delete --chmod=D755,F644 \
                -e "ssh -o StrictHostKeyChecking=yes" \
                dist/ "$DEPLOY_USER@$DEPLOY_HOST:/var/www/demo-react/"
            '''
        }
      }
    }
    stage('Comprobar') {
      steps {
        sh '''
          curl --fail "http://$DEPLOY_HOST/" > /dev/null
          test "$(curl -fsS http://$DEPLOY_HOST/version.txt)" \
            = "$(git rev-parse HEAD)"
        '''
      }
    }
  }
}