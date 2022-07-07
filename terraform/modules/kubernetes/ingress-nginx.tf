resource "helm_release" "ingress_nginx_loaded" {
  count      = var.enable_load_balancer ? 1 : 0
  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"

  set {
    name  = "controller.publishService.enabled"
    value = "true"
  }
}

data "kubernetes_service" "ingress_nginx_service_loaded" {
  count      = var.enable_load_balancer ? 1 : 0
  depends_on = [helm_release.ingress_nginx_loaded]

  metadata {
    name = "nginx-ingress-ingress-nginx-controller"
  }
}

output "ingress_nginx_service_external_ip" {
  value = var.enable_load_balancer ? data.kubernetes_service.ingress_nginx_service_loaded[0].status.0.load_balancer.0.ingress.0.ip : null
}

resource "helm_release" "ingress_nginx_unloaded" {
  count      = var.enable_load_balancer ? 0 : 1
  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"

  values = [
    file("${path.module}/ingress-nginx-chart-values.yaml"),
  ]
}
