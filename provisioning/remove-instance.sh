#!/usr/bin/env bash

THISDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source ${THISDIR}/functions/functions.sh 

INSTANCE_ID=$(cat ./ec2_instance/instance-id.txt)
SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
USERNAME=$(aws iam get-user --query 'User.UserName' --output text)

. ${THISDIR}/functions/functions.sh 

echo Removing EC2 instance

if [ -e "./ec2_instance/instance-id.txt" ]; then
    aws ec2 terminate-instances --instance-ids ${INSTANCE_ID}

    aws ec2 wait --region eu-west-1 instance-terminated --instance-ids ${INSTANCE_ID}

    rm ./ec2_instance/instance-id.txt
    rm ./ec2_instance/instance-public-name.txt
fi


PEM_NAME=hgop2-${USERNAME}
JENKINS_SECURITY_GROUP=jenkins2-${USERNAME}

echo Removing security group
if [ ! -e ./ec2_instance/security-group-id.txt ]; then
    SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
else
    delete-security-group ${JENKINS_SECURITY_GROUP}
    rm ./ec2_instance/security-group-id.txt
fi

echo Removing key-pair
remove-key-pair $PEM_NAME
rm -f ./ec2_instance/${PEM_NAME}.pem

echo Removing ec2_instance folder recursivly
rm -rf ./ec2_instance


