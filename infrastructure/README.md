# Ma-Ticko Infrastructure

Layered CloudFormation templates for deploying Ma-Ticko ticketing platform across three environments with zero-downtime production deployments.

## Architecture Overview

**Layered Infrastructure:**
- **Networking Layer**: VPC, subnets, security groups, NAT Gateway
- **Application Layer**: ALB, Auto Scaling Group, EC2 instances
- **Database Layer**: RDS PostgreSQL with automated backups

**Environment Mapping:**
- **Dev Environment**: `dev` branch → Development AWS environment
- **Test Environment**: `test` branch → Testing AWS environment  
- **Production Environment**: `main` branch → Production AWS environment

## Deployment Strategy

### Automatic CI/CD Deployment
Triggered on **PR merge** (not push):
- PR merge to `dev` → Deploys to development environment
- PR merge to `test` → Deploys to test environment
- PR merge to `main` → Deploys to production environment

### Zero-Downtime Production
- **Rolling updates** with minimum instances maintained
- **Health checks** ensure service availability
- **Blue-green deployment** pattern for seamless updates

## Infrastructure Layers

### 1. Networking Layer (`01-networking.yaml`)
- **VPC**: 10.0.0.0/16 with DNS support
- **Public Subnets**: 10.0.1.0/24, 10.0.2.0/24 (ALB)
- **Private Subnets**: 10.0.3.0/24, 10.0.4.0/24 (Application)
- **Database Subnets**: 10.0.5.0/24, 10.0.6.0/24 (RDS)
- **NAT Gateway**: Outbound internet for private instances
- **Security Groups**: Layered security model

### 2. Application Layer (`02-application.yaml`)
- **Application Load Balancer**: Internet-facing in public subnets
- **Auto Scaling Group**: EC2 instances in private subnets
- **Launch Template**: Django + React application setup
- **Rolling Updates**: Zero-downtime deployments

### 3. Database Layer (`03-database.yaml`)
- **RDS PostgreSQL**: Encrypted, automated backups
- **Multi-AZ**: Production high availability
- **Subnet Group**: Isolated database subnets

## Environment Specifications

| Environment | Instance Type | Min/Max Instances | Database | Deployment |
|-------------|---------------|-------------------|----------|------------|
| Dev         | t3.micro      | 1/2              | db.t3.micro | Brief downtime |
| Test        | t3.small      | 1/5              | db.t3.small | Brief downtime |
| Production  | t3.medium     | 2/10             | db.t3.medium (Multi-AZ) | Zero downtime |

## Prerequisites

1. **AWS CLI** configured with CloudFormation permissions
2. **GitHub Repository Secrets**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
3. **Branch Protection Rules** on main/test branches

## Manual Deployment

```bash
# Deploy all layers for development
cd infrastructure
./deploy-layered.sh dev

# Deploy all layers for production
./deploy-layered.sh prod

# Delete environment (reverse order)
./deploy-layered.sh dev delete
```

## Branch Strategy & CI/CD Flow

```
feature-branch → dev → test → main
      ↓          ↓      ↓      ↓
   PR only   Auto    Auto   Auto
            Deploy  Deploy Deploy
             (dev)  (test) (prod)
```

**Deployment Trigger**: PR merge (not push)
**Code Source**: Each environment pulls from its respective branch

## Security Architecture

- **Internet Gateway** → **ALB (Public)** → **EC2 (Private)** → **RDS (Database)**
- **NAT Gateway** for outbound internet access from private subnets
- **Security Groups**: Least privilege access model
- **No SSH access** to production instances
- **Database encryption** at rest and in transit

## Monitoring & Health Checks

- **ALB Health Checks**: HTTP endpoint monitoring
- **Auto Scaling**: CPU and request-based scaling
- **RDS Monitoring**: Automated backup and maintenance windows
- **CloudFormation Outputs**: Application URLs and endpoints

## Stack Dependencies

1. **Networking** (creates VPC, subnets, security groups)
2. **Application** (imports networking resources)
3. **Database** (imports networking resources)

**Note**: Application and Database layers can be deployed independently after Networking layer exists.