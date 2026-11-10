pipeline {
    agent any

    tools {
        // This tells Jenkins to use the Node.js plugin we will configure later
        nodejs 'NodeJS'
    }

    stages {
        stage('Check Node and npm') {
            steps {
                // 'bat' is used instead of 'sh' because Jenkins will run on your Windows Dell laptop
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                // This downloads the packages from your package.json
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // This downloads the background browsers Playwright needs to run tests
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // This is the actual command that executes your test scripts
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            // This saves your test reports so you can view them on the Jenkins dashboard
            archiveArtifacts(
                artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }
    }
}