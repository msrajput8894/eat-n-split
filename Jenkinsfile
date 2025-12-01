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
                        --dir=build \
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
            mail to: 'msrajput8894@example.com',
                subject: "✅ Eat-N-Split Deployment SUCCESS - Build #${env.BUILD_NUMBER}",
                body: "The deployment to Netlify was successful.\n\nBuild Version: ${env.APP_VERSION}\nJob: ${env.JOB_NAME}\nBuild Number: ${env.BUILD_NUMBER}\nCheck console output at: ${env.BUILD_URL}"
        }
        failure {
            echo "Build or Deployment Failed!"
            echo "Check the logs for more details."
            mail to: 'msrajput8894@example.com',
                subject: "❌ Eat-N-Split Deployment FAILURE - Build #${env.BUILD_NUMBER}",
                body: "The deployment to Netlify has failed.\n\nBuild Version: ${env.APP_VERSION}\nJob: ${env.JOB_NAME}\nBuild Number: ${env.BUILD_NUMBER}\nCheck console output at: ${env.BUILD_URL}"
        }
    }

}
