variable "do_token" {
  description = "Access token for managing resources on DigitalOcean with write access"
}

variable "enable_load_balancer" {
  description = "Whether or not to use DO Load Balancer"
  type        = bool
  default     = true
}

provider "digitalocean" {
  token = var.do_token
}
