variable "do_token" {
  description = "Access token for managing resources on DigitalOcean with write access"
}

provider "digitalocean" {
  token = var.do_token
}
