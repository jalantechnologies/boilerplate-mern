variable "cluster_issuer_email" {
  description = "Email address used for ACME registration for Kubernetes CertManager service"
}

variable "do_cluster_name" {
  description = "Kubernetes cluster name on DigitalOcean"
}

variable "do_token" {
  description = "Access token for managing resources on DigitalOcean with write access"
}

variable "do_alert_email" {
  description = "Email address to be used for sending resource utilization alerts"
}

variable "docker_registry_host" {
  description = "URL via which registry can be accessed"
}

variable "kube_enable_load_balancer" {
  description = "Whether or not to use DO Load Balancer"
  type        = bool
  default     = true
}
