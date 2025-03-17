variable "project_name" {
  description = "Project Name"
  type = string
  default = "demo"
}
variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "List of public subnet CIDRs"
  type        = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"] 
}

variable "private_subnet_cidrs" {
  description = "List of private subnet CIDRs"
  type        = list(string)
  default = ["10.0.4.0/24", "10.0.5.0/24"]
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway (true/false)"
  type        = bool
  default     = false
}

variable "nat_gateway_count" {
  description = "Number of NAT Gateways (0 = Disable, 1 = Single, N = One per private subnet)"
  type        = number
  default     = 1
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["ap-south-1a", "ap-south-1b",]
}
