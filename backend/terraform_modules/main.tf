module "vpc" {
  count = var.create_vpc_only?1:0
  source = "./vpc"
  vpc_cidr = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones = var.availability_zones
  project_name = var.project_name
}