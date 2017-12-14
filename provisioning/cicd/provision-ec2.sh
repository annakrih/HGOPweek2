#!/usr/bin/env bash

THISDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source ${THISDIR}/../ec2/functions.sh 

USERNAME=$(aws iam get-user --query 'User.UserName' --output text)

PEM_NAME=week3-${USERNAME}
JENKINS_SECURITY_GROUP=jenkins-${USERNAME}

if [ ! -d ec2_instance ]; then
    mkdir ec2_instance
fi

echo "Creating security group..." 
if [ ! -e ./ec2_instance/security-group-id.txt ]; then
    create-security-group ${JENKINS_SECURITY_GROUP}
else
    SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
fi

echo "Creating key pair..."
create-key-pair ${PEM_NAME}

echo "Creating EC2 instance..."
if [ ! -e ./ec2_instance/instance-id.txt ]; then
    create-ec2-instance ami-1a962263 ${SECURITY_GROUP_ID} /bootstrap-jenkins.sh ${PEM_NAME}
fi

echo "Authorizing access..."
authorize-access ${JENKINS_SECURITY_GROUP}

echo "Strict Host Key checking..."
set +e
scp -o StrictHostKeyChecking=no -i "./ec2_instance/${PEM_NAME}.pem" ec2-user@$(cat ./ec2_instance/instance-public-name.txt):/var/log/cloud-init-output.log ./ec2_instance/cloud-init-output.log
scp -o StrictHostKeyChecking=no -i "./ec2_instance/${PEM_NAME}.pem" ec2-user@$(cat ./ec2_instance/instance-public-name.txt):/var/log/user-data.log ./ec2_instance/user-data.log

echo "Associating IAM instance profile"
aws ec2 associate-iam-instance-profile --instance-id $(cat ./ec2_instance/instance-id.txt) --iam-instance-profile Name=CICDServer-Instance-Profile

