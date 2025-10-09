#!/bin/bash

# Build and push Docker image to ECR

set -e

# Configuration
REGION="us-east-1"
ENVIRONMENT=${1:-dev}
BRANCH=${2:-dev}

# Validate inputs
if [[ ! "$ENVIRONMENT" =~ ^(dev|test|prod)$ ]]; then
    echo "Error: Environment must be dev, test, or prod"
    exit 1
fi

echo "Building and pushing Docker image for environment: $ENVIRONMENT"
echo "Branch: $BRANCH"

# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPO="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/ma-ticko-$ENVIRONMENT"

echo "ECR Repository: $ECR_REPO"

# Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REPO

# Build Docker image
echo "Building Docker image..."
docker build -t ma-ticko-$ENVIRONMENT:$BRANCH .

# Tag image for ECR
docker tag ma-ticko-$ENVIRONMENT:$BRANCH $ECR_REPO:$BRANCH
docker tag ma-ticko-$ENVIRONMENT:$BRANCH $ECR_REPO:latest

# Push to ECR
echo "Pushing to ECR..."
docker push $ECR_REPO:$BRANCH
docker push $ECR_REPO:latest

echo "✅ Image pushed successfully!"
echo "Image URI: $ECR_REPO:$BRANCH"