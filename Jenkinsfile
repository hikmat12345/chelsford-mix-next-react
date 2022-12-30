pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
               bat "npm install"
               bat "npm install env-cmd"
               bat "npm run build" 
            }
        }
        stage("Deploy") {
             environment {
        NAME = new Date().format("yyMMdd-HHmm", TimeZone.getTimeZone('UTC'))
    }
            steps {
   //           bat "del /q /S E:\\react-test"
       echo "$NAME"          
                 bat "REN E:\\webapps-preprod\\expert-preprod.findanexpert.net\\ClientApp\\build build_$NAME"
                 bat "mkdir E:\\webapps-preprod\\expert-preprod.findanexpert.net\\ClientApp\\build"
               bat "xcopy ${WORKSPACE}\\build E:\\webapps-preprod\\expert-preprod.findanexpert.net\\ClientApp\\build /e"
            }
        }
    }
}
