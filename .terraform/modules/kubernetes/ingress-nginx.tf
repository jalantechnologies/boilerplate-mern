resource "helm_release" "ingress_nginx" {
  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"

  set {
    name  = "controller.publishService.enabled"
    value = "true"
  }
}

data "kubernetes_service" "ingress_nginx_service" {
  metadata {
    name = "nginx-ingress-ingress-nginx-controller"
  }
}

output "ingress_nginx_service_external_ip" {
  value = data.kubernetes_service.ingress_nginx_service.status.0.load_balancer.0.ingress.0.ip
}
