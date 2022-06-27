output "do_cluster_id" {
  value = module.digital_ocean.do_cluster_id
}

output "docker_registry_host" {
  value = module.kubernetes.docker_registry_host
}

output "docker_registry_auth_user" {
  value = module.kubernetes.docker_registry_auth_user
}

output "docker_registry_auth_password" {
  value     = module.kubernetes.docker_registry_auth_password
  sensitive = true
}

output "ingress_nginx_service_external_ip" {
  value = module.kubernetes.ingress_nginx_service_external_ip
}
