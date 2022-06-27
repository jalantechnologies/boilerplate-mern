variable "kubernetes_host" {
  description = "The hostname (in form of URI) of the Kubernetes API"
}

variable "kubernetes_token" {
  description = "Token of your service account"
}

variable "kubernetes_client_certificate" {
  description = "PEM-encoded client certificate for TLS authentication"
}

variable "kubernetes_client_key" {
  description = "PEM-encoded client certificate key for TLS authentication"
}

variable "kubernetes_cluster_ca_certificate" {
  description = "PEM-encoded root certificates bundle for TLS authentication"
}

provider "kubernetes" {
  host                   = var.kubernetes_host
  token                  = var.kubernetes_token
  client_certificate     = var.kubernetes_client_certificate
  client_key             = var.kubernetes_client_key
  cluster_ca_certificate = var.kubernetes_cluster_ca_certificate
}

provider "helm" {
  kubernetes {
    host                   = var.kubernetes_host
    token                  = var.kubernetes_token
    client_certificate     = var.kubernetes_client_certificate
    client_key             = var.kubernetes_client_key
    cluster_ca_certificate = var.kubernetes_cluster_ca_certificate
  }
}

provider "kubectl" {
  host                   = var.kubernetes_host
  token                  = var.kubernetes_token
  client_certificate     = var.kubernetes_client_certificate
  client_key             = var.kubernetes_client_key
  cluster_ca_certificate = var.kubernetes_cluster_ca_certificate
  load_config_file       = false
}
