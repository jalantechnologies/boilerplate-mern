variable "external_dns_provider" {
  description = "DNS provider to use which would be manually managed if not using LoadBalancer"
  type        = string
  default     = null
}

variable "external_dns_options" {
  description = "DNS options to be passed to configured provider if not using LoadBalancer"
  type        = map(any)
  default     = null
}

resource "helm_release" "external_dns" {
  // only install external dns when not using load balancer
  count = var.enable_load_balancer ? 0 : 1

  repository = "https://kubernetes-sigs.github.io/external-dns"
  chart      = "external-dns"
  name       = "external-dns"

  values = [
    templatefile("${path.module}/specs/external-dns-${var.external_dns_provider}.yaml", var.external_dns_options),
  ]
}
