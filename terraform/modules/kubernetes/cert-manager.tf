variable "cluster_issuer_email" {
  description = "Email address used for ACME registration"
}

variable "cluster_issuer_name" {
  description = "Cluster issuer name which kubernetes resources can use to request certificates"
}

resource "helm_release" "cert_manager" {
  depends_on       = [data.kubernetes_service.ingress_nginx_service_loaded]
  name             = "cert-manager"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  namespace        = "cert-manager"
  create_namespace = true
  version          = "v1.8.0"

  set {
    name  = "installCRDs"
    value = "true"
  }
}

resource "kubectl_manifest" "cluster_issuer" {
  depends_on      = [helm_release.cert_manager]
  validate_schema = false
  yaml_body       = <<YAML
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: ${var.cluster_issuer_name}
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: ${var.cluster_issuer_email}
    privateKeySecretRef:
      name: ${var.cluster_issuer_name}-key
    solvers:
      - http01:
          ingress:
            class: nginx
YAML
}
