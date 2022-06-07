resource "helm_release" "doppler_kubernetes_operator" {
  name       = "doppler-kubernetes-operator"
  repository = "https://helm.doppler.com"
  chart      = "doppler-kubernetes-operator"
}
