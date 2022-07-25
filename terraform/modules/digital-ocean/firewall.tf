resource "digitalocean_firewall" "web" {
  depends_on = [digitalocean_kubernetes_cluster.do_cluster]
  name       = "${digitalocean_kubernetes_cluster.do_cluster.name}-web-access"
  tags       = digitalocean_kubernetes_cluster.do_cluster.node_pool[0].tags
  count      = var.enable_load_balancer ? 0 : 1

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
