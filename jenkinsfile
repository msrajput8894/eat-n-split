pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-access-token')
        NETLIFY_SITE_ID    = credentials('netlify-site-id')
        MAJOR = "1"
        MINOR = "0"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/msrajput8894/eat-n-split.git'
            }
        }

        stage('Generate Version') {
            steps {
                script {
                    def date = new Date()
                    def yy = date.format("yy")
                    def mm = date.format("MM")
                    def week = ((date.date - 1) / 7 + 1).toInteger()
                    def num = String.format("%05d", env.BUILD_NUMBER.toInteger())
                    env.APP_VERSION = "${MAJOR}.${MINOR}.${yy}.${mm}.${week}.${num}"
                    echo "Generated Version: ${env.APP_VERSION}"
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                sh '''
                    # Deploy to Netlify using npx (no global install needed)
                    npx netlify deploy \
                        --prod \
                        --dir=dist \
                        --site=$NETLIFY_SITE_ID \
                        --auth=$NETLIFY_AUTH_TOKEN
                '''
                echo 'Deployment completed to Netlify.'
            }
        }
    }

    post {
        success {
            echo "Build and Deployment Successful!"
        }
        failure {
            echo "Build or Deployment Failed!"
            echo "Check the logs for more details."
        }
    }
}
