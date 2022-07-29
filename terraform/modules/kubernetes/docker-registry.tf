variable "docker_registry_host" {
  description = "URL via which registry can be accessed"
}

variable "docker_registry_auth_user" {
  description = "Username for authenticating with the registry"
  default     = "docker_user"
}

# from https://github.com/hashicorp/terraform-provider-random/issues/102#issuecomment-698605852
# important - this generates a random password based on inputs provided here,
# null_resource.encrypted_admin_password will have to be tainted in order to rotate the password

resource "random_password" "admin_basic_auth" {
  length  = 64
  special = false
}

resource "null_resource" "encrypted_admin_password" {
  triggers = {
    pwd        = random_password.admin_basic_auth.result
    pwd_hashed = bcrypt(random_password.admin_basic_auth.result)
  }

  lifecycle {
    ignore_changes = [triggers]
  }
}

resource "helm_release" "docker_registry" {
  depends_on = [kubectl_manifest.cluster_issuer]
  name       = "docker-registry"
  repository = "https://helm.twun.io"
  chart      = "docker-registry"

  values = [
    templatefile("${path.module}/specs/docker-registry-chart-values.yaml", {
      cluster_issuer_name    = var.cluster_issuer_name
      docker_registry        = var.docker_registry_host
      docker_username        = var.docker_registry_auth_user
      docker_hashed_password = null_resource.encrypted_admin_password.triggers["pwd_hashed"]
    })
  ]
}

output "docker_registry_host" {
  value = var.docker_registry_host
}

output "docker_registry_auth_user" {
  value = var.docker_registry_auth_user
}

output "docker_registry_auth_password" {
  value     = null_resource.encrypted_admin_password.triggers["pwd"]
  sensitive = true
}
