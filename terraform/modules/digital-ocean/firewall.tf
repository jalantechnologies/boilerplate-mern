resource "digitalocean_firewall" "web" {
  depends_on = [digitalocean_kubernetes_cluster.do_cluster]
  name       = "web"
  tags       = ["k8:node:web"]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }
}
