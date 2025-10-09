#!/bin/bash

# Ma-Ticko Layered Infrastructure Deployment Script

set -e

# Configuration
REGION="us-east-1"
GITHUB_REPO="Bantu-art/Maticko"

# Function to display usage
usage() {
    echo "Usage: $0 <environment> [action]"
    echo "Environment: dev, test, prod"
    echo "Action: deploy (default), delete"
    echo ""
    echo "Examples:"
    echo "  $0 dev deploy"
    echo "  $0 prod delete"
    exit 1
}

# Function to deploy a stack
deploy_stack() {
    local stack_name=$1
    local template_file=$2
    local parameters=$3
    
    echo "Deploying stack: $stack_name"
    
    if aws cloudformation describe-stacks --stack-name "$stack_name" --region "$REGION" >/dev/null 2>&1; then
        echo "Stack $stack_name exists, updating..."
        if aws cloudformation update-stack \
            --stack-name "$stack_name" \
            --template-body "file://$template_file" \
            --parameters $parameters \
            --capabilities CAPABILITY_IAM \
            --region "$REGION" 2>&1 | grep -q "No updates are to be performed"; then
            echo "Stack $stack_name is already up to date, skipping..."
        else
            echo "Waiting for stack $stack_name update to complete..."
            aws cloudformation wait stack-update-complete --stack-name "$stack_name" --region "$REGION"
        fi
    else
        echo "Stack $stack_name does not exist, creating..."
        aws cloudformation create-stack \
            --stack-name "$stack_name" \
            --template-body "file://$template_file" \
            --parameters $parameters \
            --capabilities CAPABILITY_IAM \
            --region "$REGION"
        echo "Waiting for stack $stack_name creation to complete..."
        aws cloudformation wait stack-create-complete --stack-name "$stack_name" --region "$REGION"
    fi
    
    echo "Stack $stack_name deployed successfully!"
}

# Function to delete stacks in reverse order
delete_stacks() {
    local env=$1
    
    echo "Deleting stacks for environment: $env"
    
    # Delete in reverse order
    for layer in "application" "networking"; do
        stack_name="ma-ticko-$env-$layer"
        if aws cloudformation describe-stacks --stack-name "$stack_name" --region "$REGION" >/dev/null 2>&1; then
            echo "Deleting stack: $stack_name"
            aws cloudformation delete-stack --stack-name "$stack_name" --region "$REGION"
            echo "Waiting for stack $stack_name to be deleted..."
            aws cloudformation wait stack-delete-complete --stack-name "$stack_name" --region "$REGION"
            echo "Stack $stack_name deleted successfully!"
        else
            echo "Stack $stack_name does not exist, skipping..."
        fi
    done
}

# Validate inputs
if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    usage
fi

ENVIRONMENT=$1
ACTION=${2:-deploy}

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(dev|test|prod)$ ]]; then
    echo "Error: Environment must be dev, test, or prod"
    usage
fi

# Validate action
if [[ ! "$ACTION" =~ ^(deploy|delete)$ ]]; then
    echo "Error: Action must be deploy or delete"
    usage
fi

# Set branch based on environment
case $ENVIRONMENT in
    dev)
        BRANCH="dev"
        ;;
    test)
        BRANCH="test"
        ;;
    prod)
        BRANCH="main"
        ;;
esac

echo "Starting $ACTION for environment: $ENVIRONMENT"
echo "Using branch: $BRANCH"
echo "Region: $REGION"
echo ""

if [ "$ACTION" = "delete" ]; then
    delete_stacks "$ENVIRONMENT"
    echo "All stacks deleted successfully!"
    exit 0
fi

# Deploy stacks in order
echo "Deploying infrastructure layers..."

# 1. Networking Layer
echo ""
echo "=== DEPLOYING NETWORKING LAYER ==="
deploy_stack \
    "ma-ticko-$ENVIRONMENT-networking" \
    "cloudformation/01-networking.yaml" \
    "ParameterKey=Environment,ParameterValue=$ENVIRONMENT"

# 2. Application Layer
echo ""
echo "=== DEPLOYING APPLICATION LAYER ==="
deploy_stack \
    "ma-ticko-$ENVIRONMENT-application" \
    "cloudformation/02-application.yaml" \
    "ParameterKey=Environment,ParameterValue=$ENVIRONMENT ParameterKey=GitHubBranch,ParameterValue=$BRANCH ParameterKey=NetworkingStackName,ParameterValue=ma-ticko-$ENVIRONMENT-networking"



echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo "Environment: $ENVIRONMENT"
echo "All layers deployed successfully!"

# Get the load balancer URL
ALB_URL=$(aws cloudformation describe-stacks \
    --stack-name "ma-ticko-$ENVIRONMENT-application" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`LoadBalancerURL`].OutputValue' \
    --output text)

echo ""
echo "Application URL: $ALB_URL"