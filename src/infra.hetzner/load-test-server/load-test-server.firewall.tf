resource "hcloud_firewall" "meblog_load_test_server_firewall" {
  labels = {
    "publish-stage" = var.publish_stage
  }
  name = var.publish_stage == "prod" ? "prod-meblog-load-test-server-firewall" : "dev-meblog-load-test-server-firewall"

  # Ingress:

  rule {
    direction = "in"
    port      = "22"
    protocol  = "tcp"
    source_ips = [
      var.restrict_to_public_ip
    ]
    description = "Allow SSH/SCP from your public IP"
  }

  # Egress:

  rule {
    direction = "out"
    port      = "80"
    protocol  = "tcp"
    destination_ips = [
      "0.0.0.0/0",
      "::/0"
    ]
    description = "Allow HTTP egress (for updates)"
  }

  rule {
    direction = "out"
    port      = "443"
    protocol  = "tcp"
    destination_ips = [
      "0.0.0.0/0",
      "::/0"
    ]
    description = "Allow HTTPS egress (for updates)"
  }

  rule {
    direction = "out"
    port      = "53"
    protocol  = "tcp"
    destination_ips = [
      "8.8.8.8/32",
      "1.1.1.1/32"
    ]
    description = "Allow DNS queries"
  }

  rule {
    direction = "out"
    port      = "53"
    protocol  = "udp"
    destination_ips = [
      "8.8.8.8/32",
      "1.1.1.1/32"
    ]
    description = "Allow DNS queries"
  }
}
