# Ma-Ticko - Event Ticketing Platform

A cloud-native event ticketing platform demonstrating modern AWS architecture patterns with containerized Django/React applications, Infrastructure as Code, and automated CI/CD pipelines.

## AWS Architecture Overview

### Infrastructure Components
- **VPC**: Multi-AZ deployment with public/private subnets
- **Application Load Balancer**: Layer 7 load balancing with health checks
- **Auto Scaling Group**: Horizontal scaling based on CPU utilization
- **EC2 Instances**: Container-optimized Amazon Linux 2 instances
- **RDS PostgreSQL**: Multi-AZ managed database with automated backups
- **NAT Gateway**: Secure outbound internet access for private subnets
- **Security Groups**: Least-privilege network access controls

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                        Internet Gateway                      │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────────────┐
│                Application Load Balancer                    │
│              (Target Groups + Health Checks)               │
└─────────────┬─────────────────────────────┬─────────────────┘
              │                             │
    ┌─────────┴──────────┐        ┌─────────┴──────────┐
    │   Public Subnet    │        │   Public Subnet    │
    │      AZ-1a         │        │      AZ-1b         │
    └─────────┬──────────┘        └─────────┬──────────┘
              │                             │
    ┌─────────┴──────────┐        ┌─────────┴──────────┐
    │  Private Subnet    │        │  Private Subnet    │
    │   EC2 (Docker)     │        │   EC2 (Docker)     │
    │      AZ-1a         │        │      AZ-1b         │
    └─────────┬──────────┘        └─────────┬──────────┘
              │                             │
              └─────────────┬───────────────┘
                            │
              ┌─────────────┴───────────────┐
              │      RDS PostgreSQL        │
              │     (Multi-AZ Setup)       │
              └─────────────────────────────┘
```

## Technology Stack

### Application Layer
- **Backend**: Django 4.x with Inertia.js for SPA-like experience
- **Frontend**: React 18 with Vite build system and Tailwind CSS
- **Database**: PostgreSQL 14+ with connection pooling
- **Containerization**: Docker multi-stage builds for optimized images

### AWS Services
- **Compute**: EC2 Auto Scaling Groups with Application Load Balancer
- **Database**: RDS PostgreSQL with Multi-AZ deployment
- **Networking**: VPC with public/private subnets across multiple AZs
- **Security**: Security Groups, NACLs, and IAM roles
- **Monitoring**: CloudWatch metrics and alarms
- **Deployment**: CloudFormation for Infrastructure as Code

### DevOps Pipeline
- **CI/CD**: GitHub Actions with Docker-based builds
- **Infrastructure**: Layered CloudFormation templates
- **Deployment**: Rolling updates with zero-downtime
- **Monitoring**: Application and infrastructure health checks

## Infrastructure as Code

### Layered CloudFormation Architecture

#### 1. Networking Layer (`01-networking.yaml`)
```yaml
# VPC with CIDR 10.0.0.0/16
# Public subnets: 10.0.1.0/24, 10.0.2.0/24
# Private subnets: 10.0.11.0/24, 10.0.12.0/24
# NAT Gateway for private subnet internet access
# Security groups for ALB and EC2 instances
```

#### 2. Application Layer (`02-application.yaml`)
```yaml
# Application Load Balancer with target groups
# Auto Scaling Group (min: 1, max: 10, desired: 2)
# Launch template with Docker-optimized AMI
# Rolling update policy for zero-downtime deployments
# CloudWatch alarms for scaling policies
```

#### 3. Database Layer (`03-database.yaml`)
```yaml
# RDS PostgreSQL Multi-AZ deployment
# DB subnet group across private subnets
# Automated backups and maintenance windows
# Security group allowing access from application tier
```

### Deployment Commands
```bash
# Deploy complete infrastructure
cd infrastructure
./deploy-layered.sh

# Deploy individual layers
aws cloudformation deploy --template-file cloudformation/01-networking.yaml --stack-name maticko-networking
aws cloudformation deploy --template-file cloudformation/02-application.yaml --stack-name maticko-application
aws cloudformation deploy --template-file cloudformation/03-database.yaml --stack-name maticko-database
```

## Container Strategy

### Multi-Stage Docker Build
```dockerfile
# Stage 1: Node.js build environment
FROM node:18-alpine AS frontend-builder
# Build React application with Vite

# Stage 2: Python runtime environment
FROM python:3.11-slim AS backend
# Copy built frontend assets and Django application
# Install Python dependencies and configure application
```

### Container Deployment
- **Base Image**: Python 3.11 slim for reduced attack surface
- **Asset Management**: Automated Vite manifest integration
- **Health Checks**: Django health endpoint for ALB monitoring
- **Environment**: 12-factor app configuration via environment variables

## Auto Scaling Configuration

### Scaling Policies
- **Scale Up**: CPU > 70% for 2 consecutive periods (300s)
- **Scale Down**: CPU < 30% for 5 consecutive periods (300s)
- **Cooldown**: 300 seconds between scaling activities
- **Health Checks**: ALB health checks with 30s interval

### Rolling Deployment Strategy
```yaml
UpdatePolicy:
  AutoScalingRollingUpdate:
    MinInstancesInService: 1
    MaxBatchSize: 1
    PauseTime: PT5M
    WaitOnResourceSignals: true
```

## Security Implementation

### Network Security
- **Security Groups**: Principle of least privilege
  - ALB: HTTP/HTTPS from 0.0.0.0/0
  - EC2: Port 8000 from ALB security group only
  - RDS: Port 5432 from EC2 security group only
- **Private Subnets**: Application and database tiers isolated
- **NAT Gateway**: Controlled outbound internet access

### Application Security
- **Django Settings**: Production-hardened configuration
- **Database**: Encrypted at rest and in transit
- **Secrets**: Environment variables for sensitive configuration
- **Container**: Non-root user execution

## Monitoring and Observability

### CloudWatch Metrics
- **Application**: Custom Django metrics via CloudWatch agent
- **Infrastructure**: EC2, ALB, and RDS standard metrics
- **Alarms**: CPU utilization, memory usage, database connections
- **Logs**: Application logs aggregated in CloudWatch Logs

### Health Checks
- **ALB Health Check**: `/health/` endpoint with 200 response
- **Application Health**: Database connectivity and Django status
- **Auto Scaling**: Instance replacement on failed health checks

## Cost Optimization

### Resource Sizing
- **EC2 Instances**: t3.micro for development, t3.small+ for production
- **RDS**: db.t3.micro with gp2 storage for cost efficiency
- **Auto Scaling**: Right-sizing based on actual usage patterns

### Reserved Instances
- Consider 1-year Reserved Instances for predictable workloads
- Savings Plans for flexible compute usage
- Spot Instances for non-critical development environments

## Disaster Recovery

### Backup Strategy
- **RDS**: Automated daily backups with 7-day retention
- **Application**: Stateless design enables quick recovery
- **Infrastructure**: CloudFormation templates as disaster recovery documentation

### Multi-AZ Deployment
- **Database**: RDS Multi-AZ for automatic failover
- **Application**: Auto Scaling across multiple Availability Zones
- **Load Balancer**: Cross-zone load balancing enabled

## Local Development

### Prerequisites
- AWS CLI configured with appropriate permissions
- Docker and Docker Compose
- Python 3.11+ and Node.js 18+

### Setup
```bash
# Clone repository
git clone <repository-url>
cd Maticko

# Docker development (recommended)
docker-compose up

# Traditional setup
cd dirt_stack && ./setup.sh
```

### AWS Development Environment
```bash
# Create development stack
aws cloudformation create-stack \
  --stack-name maticko-dev \
  --template-body file://infrastructure/cloudformation/01-networking.yaml \
  --parameters ParameterKey=Environment,ParameterValue=dev
```

## CI/CD Pipeline

### GitHub Actions Workflow
1. **Build**: Docker image creation with multi-stage build
2. **Test**: Container-based testing environment
3. **Security**: Container vulnerability scanning
4. **Deploy**: Rolling deployment to Auto Scaling Group
5. **Verify**: Health check validation post-deployment

### Deployment Automation
- **Trigger**: Push to main branch
- **Strategy**: Blue-green deployment capability
- **Rollback**: Automatic rollback on health check failures
- **Notifications**: Slack/SNS integration for deployment status

## Documentation

- [DEVELOPMENT.md](DEVELOPMENT.md) - Technical implementation details
- [infrastructure/README.md](infrastructure/README.md) - CloudFormation deployment guide
- [AWS Architecture Decision Records](infrastructure/docs/) - Infrastructure design decisions

## Contributing

1. Fork repository and create feature branch
2. Develop with local Docker environment
3. Test infrastructure changes in development AWS account
4. Submit pull request with CloudFormation validation
5. Deploy via CI/CD pipeline after approval

## License

MIT License - see LICENSE file for details.