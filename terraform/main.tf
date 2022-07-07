terraform {
  #  cloud {
  #    workspaces {
  #      name = "boilerplate-mern-production"
  #    }
  #  }
}

module "digital_ocean" {
  source          = "./modules/digital-ocean"
  do_cluster_name = var.do_cluster_name
  do_token        = var.do_token
}

module "kubernetes" {
  source                            = "./modules/kubernetes"
  cluster_issuer_email              = var.cluster_issuer_email
  cluster_issuer_name               = "letsencrypt-prod"
  docker_registry_host              = var.docker_registry_host
  kubernetes_client_certificate     = module.digital_ocean.do_cluster_client_certificate
  kubernetes_client_key             = module.digital_ocean.do_cluster_client_key
  kubernetes_cluster_ca_certificate = module.digital_ocean.do_cluster_ca_certificate
  kubernetes_host                   = module.digital_ocean.do_cluster_host
  kubernetes_token                  = module.digital_ocean.do_cluster_token
  enable_load_balancer              = var.kube_enable_load_balancer
}
